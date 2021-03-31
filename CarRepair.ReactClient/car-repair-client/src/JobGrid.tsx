import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { JobService } from "./api/JobService";
import { Job } from "./api/models/Job";

export function JobGrid() {
    const [jobs, setJobs] = useState<Job[]>([])

    //initialization
    useEffect(() => {
        (async () => {
            const result = await JobService.getAvailableJobs()
            if (result)
                setJobs(result);
            else
                console.log("no data")
        })();
    }, []);

    return (
        <Table>
            <JobGridHead></JobGridHead>
            <JobGridBody data={jobs}></JobGridBody>
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
    data: Job[]
}

function JobGridBody(props: JobGridBodyProps) {
    return (
        <TableBody>
            {props.data.map((row) => (
                <TableRow key={row.Id}>
                    <TableCell>{row.Id}</TableCell>
                    <TableCell align="right">{row.Car.LicencePlate}</TableCell>
                    <TableCell align="right">{row.Registered}</TableCell>
                    <TableCell align="right">{row.Started}</TableCell>
                    <TableCell align="right">{row.Finished}</TableCell>
                    <TableCell align="right">{row.Status}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}