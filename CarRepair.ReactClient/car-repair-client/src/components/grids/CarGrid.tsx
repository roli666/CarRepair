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
  TextField,
  Theme,
} from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import { Client } from "api/models/Client";
import { ValidationError } from "api/models/ValidationError";
import { ConfirmationButton } from "components/ConfirmationButton";
import { ValidationErrorElement } from "components/ErrorHandler";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UsedRoutes } from "Routes";
import { ClientService } from "services/ClientService";
import { Car, CarMessage } from "../../api/models/Car";
import { CarService } from "../../services/CarService";

class CarGridProps {
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

async function Initialize(): Promise<Car[]> {
  const result = await CarService.getAvailableCars();
  if (result?.length === 0) console.log("no available cars");
  return result ?? [];
}

export function CarGrid(props: CarGridProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    (async () => {
      setCars(await Initialize());
    })();
  }, []);

  const addCar = async (car: CarMessage) => {
    const result = await CarService.saveCar(car);
    if (result.ok) {
      const insertedCar = (await result.json()) as Car;
      setCars([...cars, insertedCar]);
    }
    if (result.status === 400) {
      const validationResult = ValidationError.fromJSON(ValidationError, await result.json());
      console.warn(validationResult.getErrors().join("\n"));
      setOpenAlert(true);
    }
  };

  const deleteCar = async (car: Car) => {
    if (car.Id) {
      const result = await CarService.deleteCar(car.Id);
      if (result.ok) {
        cars.splice(cars.indexOf(car), 1);
        setCars([...cars]);
      }
    }
  };

  return (
    <>
      <ValidationErrorElement openAlert={openAlert} closeAlertCallback={() => setOpenAlert(false)} />
      <Table>
        <CarGridHead></CarGridHead>
        <CarGridBody readonly={props.readOnly ?? false} data={cars} newCarCallback={addCar} deleteCarCallback={deleteCar}></CarGridBody>
      </Table>
    </>
  );
}

function CarGridHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Car Id</TableCell>
        <TableCell>Licence Plate</TableCell>
        <TableCell>Owner</TableCell>
        <TableCell>Type</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface CarGridBodyProps {
  data: Car[];
  readonly: boolean;
  newCarCallback: (client: CarMessage) => void;
  deleteCarCallback: (client: Car) => void;
}

function CarGridBody(props: CarGridBodyProps) {
  return (
    <TableBody>
      {props.data.map((row) => (
        <TableRow key={row.Id}>
          <TableCell>{row.Id}</TableCell>
          <TableCell>{row.LicencePlate}</TableCell>
          <TableCell>{row.Owner.Lastname + row.Owner.Firstname}</TableCell>
          <TableCell>{row.Type}</TableCell>
          <TableCell>
            <ConfirmationButton
              as={
                <IconButton>
                  <Cancel />
                </IconButton>
              }
              onConfirm={() => props.deleteCarCallback(row)}
            />
          </TableCell>
        </TableRow>
      ))}
      <AddNewCarRow newCarCallback={props.newCarCallback} />
    </TableBody>
  );
}

interface AddNewCarRowProps {
  newCarCallback: (client: CarMessage) => void;
}
type ICarInput = {
  licencePlate: string;
  type: string;
  ownerId: number;
};
function AddNewCarRow(props: AddNewCarRowProps) {
  const classes = useStyles();
  const [availableClients, setAvailableClients] = useState<Client[]>([]);

  useEffect(() => {
    (async () => {
      const clients = await ClientService.getAvailableClients();
      if (clients) setAvailableClients(clients);
    })();
  }, []);

  const { handleSubmit, reset, control } = useForm<ICarInput>({
    defaultValues: {
      licencePlate: "",
      type: "",
      ownerId: 0,
    },
    reValidateMode: "onChange",
  });

  const onCarSubmit = async (data: ICarInput, event?: BaseSyntheticEvent) => {
    const car: CarMessage = {
      LicencePlate: data.licencePlate,
      OwnerId: data.ownerId,
      Type: data.type,
    };
    reset({
      licencePlate: "",
      type: "",
      ownerId: 0,
    });
    props.newCarCallback(car);
  };

  return (
    <TableRow>
      <TableCell align={"left"}>
        <IconButton color="primary" type={"submit"} onClick={handleSubmit(onCarSubmit)} aria-label="Add new car">
          <Add></Add>
        </IconButton>
      </TableCell>
      <TableCell>
        <Controller
          name="licencePlate"
          control={control}
          render={({ fieldState, field }) => (
            <TextField
              type={"text"}
              required={true}
              placeholder={"ABC-123"}
              onChange={(e) => field.onChange(e.target.value)}
              defaultValue={field.value}
              value={field.value}
              label={"Licence plate"}
              helperText={fieldState.error?.message ?? ""}
              error={fieldState.invalid}
            />
          )}
          rules={{
            required: "The licence plate field is required.",
          }}
        />
      </TableCell>
      <TableCell>
        <Controller
          name="ownerId"
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
                value={field.value}
              >
                <MenuItem>
                  <Link to={UsedRoutes.ClientEditor} className={classes.buttonLinkText}>
                    <Button variant={"contained"} color={"primary"} endIcon={<Add />}>
                      Add new owner
                    </Button>
                  </Link>
                </MenuItem>
                {availableClients.map((client, index) => (
                  <MenuItem key={index} value={client.Id}>
                    {`${client.Lastname} ${client.Firstname}`}
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
              mustNotBeEmpty: (value) => value !== "" || "Every car must have an owner.",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Controller
          name="type"
          control={control}
          render={({ fieldState, field }) => (
            <TextField
              required={true}
              type={"text"}
              label={"Car type"}
              placeholder={"ex.: Dacia, Opel"}
              helperText={fieldState.error?.message ?? ""}
              error={fieldState.invalid}
              onChange={(e) => field.onChange(e.target.value)}
              defaultValue={field.value}
              value={field.value}
            />
          )}
          rules={{
            required: "The car type field must not be empty.",
          }}
        />
      </TableCell>
    </TableRow>
  );
}
