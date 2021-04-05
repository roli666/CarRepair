import { IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { JobService } from "../../services/JobService";
import { Job, JobStatus } from "../../api/models/Job";

class JobGridProps {
    readOnly?: boolean = false
}

const emptyJob: Job = {
    Car: {
        LicencePlate: "",
        Owner: {
            ContactInfo: {
                Email: "",
                PhoneContact: []
            },
            Firstname: "",
            Lastname: ""
        },
        Type: ""
    },
    Registered: new Date(),
    Status: JobStatus.Awaiting
}

async function Initialize(): Promise<Job[]> {
    const result = await JobService.getAvailableJobs()
    if (result?.length === 0)
        console.log("no available jobs")
    return result ?? []
}

export function JobGrid(props: JobGridProps) {
    const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        (async () => {
            setJobs(await Initialize());
        })()
    }, []);

    return (
        <Table>
            <JobGridHead></JobGridHead>
            <JobGridBody readonly={props.readOnly ?? false} data={jobs}></JobGridBody>
        </Table>
    )
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
    )
}

interface JobGridBodyProps {
    data: Job[],
    readonly: boolean
}

function JobGridBody(props: JobGridBodyProps) {
    const [newJobStatus, setNewJobStatus] = useState<JobStatus>(JobStatus.Awaiting)

    return (
        <TableBody>
            {props.data.map((row) => (
                <TableRow key={row.Id ?? -1}>
                    <TableCell>{row.Id}</TableCell>
                    <TableCell align="right">{row.Car.LicencePlate}</TableCell>
                    <TableCell align="right">{row.Registered.toString()}</TableCell>
                    <TableCell align="right">{row.Started?.toString()}</TableCell>
                    <TableCell align="right">{row.Finished?.toString()}</TableCell>
                    <TableCell align="right">{JobStatus[row.Status]}</TableCell>
                </TableRow>
            ))}
            {!props.readonly &&
                <TableRow>
                    <TableCell align="right">
                        <IconButton color="primary" aria-label="Add new job">
                            <Add></Add>
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        <Select value={newJobStatus} onChange={(event) => setNewJobStatus(event.target.value as number)}>
                            <MenuItem selected={true} value={JobStatus.Awaiting}>{JobStatus[JobStatus.Awaiting]}</MenuItem>
                            <MenuItem value={JobStatus.InProgress}>{JobStatus[JobStatus.InProgress]}</MenuItem>
                            <MenuItem value={JobStatus.Done}>{JobStatus[JobStatus.Done]}</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell align="right">
                        <Input type={"date"}></Input>
                    </TableCell>
                    <TableCell align="right">
                        <Input type={"date"}></Input>
                    </TableCell>
                    <TableCell align="right">
                        <Input type={"date"}></Input>
                    </TableCell>
                    <TableCell align="right">
                        <Select value={newJobStatus} onChange={(event) => setNewJobStatus(event.target.value as number)}>
                            <MenuItem selected={true} value={JobStatus.Awaiting}>{JobStatus[JobStatus.Awaiting]}</MenuItem>
                            <MenuItem value={JobStatus.InProgress}>{JobStatus[JobStatus.InProgress]}</MenuItem>
                            <MenuItem value={JobStatus.Done}>{JobStatus[JobStatus.Done]}</MenuItem>
                        </Select>
                    </TableCell>
                </TableRow>
            }
        </TableBody>
    )
}