import { IconButton, Input, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Car } from "../../api/models/Car";
import { CarService } from "../../services/CarService";

class CarGridProps {
    readOnly?: boolean = false
}

const emptyCar: Car = {
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
}

async function Initialize(): Promise<Car[]> {
    const result = await CarService.getAvailableCars()
    if (result?.length === 0)
        console.log("no available cars")
    return result ?? []
}

export function CarGrid(props: CarGridProps) {
    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        (async () => {
            setCars(await Initialize());
        })()
    }, []);

    return (
        <Table>
            <CarGridHead></CarGridHead>
            <CarGridBody readonly={props.readOnly ?? false} data={cars}></CarGridBody>
        </Table>
    )
}

function CarGridHead() {
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

interface CarGridBodyProps {
    data: Car[],
    readonly: boolean
}

function CarGridBody(props: CarGridBodyProps) {
    return (
        <TableBody>
            {props.data.map((row) => (
                <TableRow key={row.Id}>
                    <TableCell>{row.Id}</TableCell>
                    <TableCell align="right">{row.LicencePlate}</TableCell>
                    <TableCell align="right">{row.Owner.Lastname + row.Owner.Firstname}</TableCell>
                    <TableCell align="right">{row.Type}</TableCell>
                </TableRow>
            ))}
            <TableRow>
                <TableCell align="right">
                    <IconButton color="primary" aria-label="Add new job">
                        <Add></Add>
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                    <Input type={"text"}></Input>
                </TableCell>
                <TableCell align="right">
                    <Input type={"text"}></Input>
                </TableCell>
                <TableCell align="right">
                    <Input type={"text"}></Input>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}