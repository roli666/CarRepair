import { IconButton, Input, List, ListItem, ListItemSecondaryAction, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Client } from "../../api/models/Client";
import { ClientService } from "../../services/ClientService";

class ClientGridProps {
    readOnly?: boolean = false
}

async function Initialize(): Promise<Client[]> {
    const result = await ClientService.getAvailableClients()
    if (result?.length === 0)
        console.log("no available clients")
    return result ?? []
}

export function ClientGrid(props: ClientGridProps) {
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        (async () => {
            setClients(await Initialize());
        })()
    }, []);

    const addClient = async (client: Client) => {
        const result = await ClientService.saveClient(client)
        if (result.ok) {
            const insertedClient = await result.json() as Client
            setClients([...clients, insertedClient])
        }
    }

    const deleteClient = async (client: Client) => {
        if (client.Id) {
            const result = await ClientService.deleteClient(client.Id)
            if (result.ok) {
                clients.splice(clients.indexOf(client), 1)
                setClients([...clients])
            }
        }
    }

    return (
        <Table>
            <ClientGridHead />
            <ClientGridBody
                readonly={props.readOnly ?? false}
                data={clients}
                newClientCallback={addClient}
                deleteClientCallback={deleteClient} />
        </Table>
    )
}

function ClientGridHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Client Id</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Phone numbers</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Firstname</TableCell>
            </TableRow>
        </TableHead>
    )
}

interface ClientGridBodyProps {
    data: Client[],
    readonly: boolean,
    newClientCallback: (client: Client) => void,
    deleteClientCallback: (client: Client) => void
}

function ClientGridBody(props: ClientGridBodyProps) {
    return (
        <TableBody>
            {props.data.map((row) => (
                <TableRow key={row.Id}>
                    <TableCell>{row.Id}</TableCell>
                    <TableCell>{row.ContactInfo.Email}</TableCell>
                    <TableCell>
                        <List>
                            {row.ContactInfo.PhoneContact.map((it, index) =>
                                <ListItem key={index}>
                                    {it.PhoneNumber}
                                </ListItem>
                            )}
                        </List>
                    </TableCell>
                    <TableCell>{row.Lastname}</TableCell>
                    <TableCell>{row.Firstname}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => props.deleteClientCallback(row)}>
                            <Cancel />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
            <AddNewClientRow newClientCallback={props.newClientCallback} />
        </TableBody>
    )
}

interface AddNewClientRowProps {
    newClientCallback: (client: Client) => void
}

function AddNewClientRow(props: AddNewClientRowProps) {
    const [newClientFirstName, setNewClientFirstName] = useState<string>("")
    const [newClientLastName, setNewClientLastName] = useState<string>("")
    const [newClientEmail, setNewClientEmail] = useState<string>("")
    const [newPhoneNumbers, setNewPhoneNumbers] = useState<string[]>([])
    const [phoneNumberInputValue, setPhoneNumberInputValue] = useState<string>("")

    const resetState = () => {
        setNewClientFirstName("")
        setNewClientLastName("")
        setNewClientEmail("")
        setNewPhoneNumbers([])
        setPhoneNumberInputValue("")
    }

    const saveClient = async () => {
        const client: Client = {
            ContactInfo: {
                Email: newClientEmail,
                PhoneContact: newPhoneNumbers.map((value) => { return { PhoneNumber: value } })
            },
            Firstname: newClientFirstName,
            Lastname: newClientLastName
        }
        resetState()
        props.newClientCallback(client)
    }

    return (
        <TableRow>
            <TableCell>
                <IconButton color="primary" aria-label="Add new job" onClick={() => saveClient()}>
                    <Add></Add>
                </IconButton>
            </TableCell>
            <TableCell>
                <Input
                    type={"text"}
                    onChange={(event) => { setNewClientEmail(event.target.value) }}
                    value={newClientEmail} />
            </TableCell>
            <TableCell>
                <List>
                    {newPhoneNumbers.map(
                        (number, index) =>
                            <ListItem key={index}>
                                <ListItemText>{number}</ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => {
                                        newPhoneNumbers.splice(index, 1)
                                        setNewPhoneNumbers([...newPhoneNumbers])
                                    }}>
                                        <Cancel />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                    )
                    }
                    <ListItem>
                        <Input
                            type={"text"}
                            onChange={(event) => setPhoneNumberInputValue(event.target.value)}
                            value={phoneNumberInputValue} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {
                                phoneNumberInputValue.length !== 0 && newPhoneNumbers.push(phoneNumberInputValue)
                                setNewPhoneNumbers([...newPhoneNumbers])
                            }}>
                                <Add />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </TableCell>
            <TableCell>
                <Input
                    type={"text"}
                    onChange={(event) => { setNewClientLastName(event.target.value) }}
                    value={newClientLastName} />
            </TableCell>
            <TableCell>
                <Input
                    type={"text"}
                    onChange={(event) => { setNewClientFirstName(event.target.value) }}
                    value={newClientFirstName} />
            </TableCell>
        </TableRow>
    )
}