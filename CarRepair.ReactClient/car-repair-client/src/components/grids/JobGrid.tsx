import {
  Button,
  createStyles,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { JobService } from "../../services/JobService";
import { Job, JobMessage, JobStatus } from "../../api/models/Job";
import { CarService } from "services/CarService";
import { Car } from "api/models/Car";
import { Controller, useForm } from "react-hook-form";
import { ValidationError } from "api/models/ValidationError";
import { ValidationErrorElement } from "components/ErrorHandler";
import { Routes } from "RouteData";
import { Link } from "react-router-dom";

class JobGridProps {
  readOnly?: boolean = false;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
    buttonLinkText: {
      textDecoration: "none",
    },
  })
);

async function Initialize(): Promise<Job[]> {
  const result = await JobService.getAvailableJobs();

  if (result?.length === 0) console.log("no available jobs");
  return result ?? [];
}

export function JobGrid(props: JobGridProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  const addJob = async (job: JobMessage) => {
    const result = await JobService.saveJob(job);
    if (result.ok) {
      const insertedJob = (await result.json()) as Job;
      setJobs([...jobs, insertedJob]);
    }
    if (result.status === 400) {
      const validationResult = ValidationError.fromJSON(ValidationError, await result.json());
      console.warn(validationResult.getErrors().join("\n"));
      setOpenAlert(true);
    }
  };

  const deleteJob = async (job: Job) => {
    if (job.Id) {
      const result = await JobService.deleteJob(job.Id);
      if (result.ok) {
        jobs.splice(jobs.indexOf(job), 1);
        setJobs([...jobs]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setJobs(await Initialize());
    })();
  }, []);

  return (
    <>
      <ValidationErrorElement openAlert={openAlert} closeAlertCallback={() => setOpenAlert(false)} />
      <Table>
        <JobGridHead></JobGridHead>
        <JobGridBody readonly={props.readOnly ?? false} newJobCallback={addJob} deleteJobCallback={deleteJob} data={jobs}></JobGridBody>
      </Table>
    </>
  );
}

function JobGridHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Job Id</TableCell>
        <TableCell>Car</TableCell>
        <TableCell>Registered on</TableCell>
        <TableCell>Started on</TableCell>
        <TableCell>Finished on</TableCell>
        <TableCell>Current status</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface JobGridBodyProps {
  data: Job[];
  readonly: boolean;
  newJobCallback: (job: JobMessage) => void;
  deleteJobCallback: (job: Job) => void;
}

function JobGridBody(props: JobGridBodyProps) {
  return (
    <TableBody>
      {props.data.map((row) => (
        <TableRow key={row.Id}>
          <TableCell>{row.Id}</TableCell>
          <TableCell>{row.Car.LicencePlate}</TableCell>
          <TableCell>{new Date(row.Registered).toLocaleDateString("hu-hu")}</TableCell>
          <TableCell>{row.Started ? new Date(row.Started)?.toLocaleDateString("hu-hu") : "Not started yet"}</TableCell>
          <TableCell>{row.Finished ? new Date(row.Finished)?.toLocaleDateString("hu-hu") : "Not finished yet"}</TableCell>
          <TableCell>{JobStatus[row.Status]}</TableCell>
        </TableRow>
      ))}
      {!props.readonly && <AddNewJobRow newJobCallback={props.newJobCallback} />}
    </TableBody>
  );
}

interface AddNewJobRowProps {
  newJobCallback: (job: JobMessage) => void;
}
type IJobInput = {
  carId: number;
};
function AddNewJobRow(props: AddNewJobRowProps) {
  const classes = useStyles();
  const [availableCars, setAvailableCars] = useState<Car[]>([]);

  useEffect(() => {
    (async () => {
      const cars = await CarService.getAvailableCars();
      if (cars) setAvailableCars(cars);
    })();
  }, []);

  const { handleSubmit, reset, control } = useForm<IJobInput>({
    defaultValues: {
      carId: 0,
    },
    reValidateMode: "onChange",
  });

  const onJobSubmit = async (data: IJobInput, event?: BaseSyntheticEvent) => {
    const job: JobMessage = {
      CarId: data.carId,
    };
    console.log(job);
    reset({
      carId: 0,
    });
    props.newJobCallback(job);
  };

  return (
    <TableRow>
      <TableCell>
        <IconButton color="primary" type={"submit"} onClick={handleSubmit(onJobSubmit)} aria-label="Add new job">
          <Add></Add>
        </IconButton>
      </TableCell>
      <TableCell>
        <Controller
          name="carId"
          control={control}
          render={({ fieldState, field }) => (
            <FormControl className={classes.formControl}>
              <InputLabel>Owner</InputLabel>
              <Select
                required={true}
                type={"select"}
                label={"Owner"}
                error={fieldState.invalid}
                onChange={(e) => field.onChange(e.target.value)}
                defaultValue={""}
              >
                <MenuItem>
                  <Link to={Routes.get("carEditor")!.Path} className={classes.buttonLinkText}>
                    <Button variant={"contained"} color={"primary"} endIcon={<Add />}>
                      Add new car
                    </Button>
                  </Link>
                </MenuItem>
                {availableCars.map((car, index) => (
                  <MenuItem key={index} value={car.Id}>
                    {`${car.LicencePlate} ${car.Type}`}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText hidden={!fieldState.invalid} error={true}>
                {fieldState.error?.message}
              </FormHelperText>
            </FormControl>
          )}
          rules={{
            validate: {
              mustNotBeEmpty: (value) => value !== "" || "Every job must have a car.",
            },
          }}
        />
      </TableCell>
      <TableCell>{new Date().toLocaleDateString("hu-hu")}</TableCell>
      <TableCell>Not started yet</TableCell>
      <TableCell>Not finished yet</TableCell>
      <TableCell>{JobStatus[0]}</TableCell>
    </TableRow>
  );
}
