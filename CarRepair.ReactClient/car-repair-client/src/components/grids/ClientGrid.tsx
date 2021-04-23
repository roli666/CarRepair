import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Add, Cancel } from "@material-ui/icons";
import { ValidationError } from "api/models/ValidationError";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Client } from "../../api/models/Client";
import { ClientService } from "../../services/ClientService";
import { ValidationErrorElement } from "../ErrorHandler";
import { ConfirmationButton } from "../ConfirmationButton";
import { EmailValidation, PhoneNumberValidation } from "../../helpers/Regex";
import { PhoneContact } from "api/models/ContactInfo";

const useStyle = makeStyles({
  phoneNumberErrorList: {
    border: "1px solid #f44336",
  },
  redText: {
    color: "#f44336",
  },
});

class ClientGridProps {
  readOnly?: boolean = false;
}

async function Initialize(): Promise<Client[]> {
  const result = await ClientService.getAvailableClients();
  if (result?.length === 0) console.log("no available clients");
  return result ?? [];
}

export function ClientGrid(props: ClientGridProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    (async () => {
      setClients(await Initialize());
    })();
  }, []);

  const addClient = async (client: Client) => {
    const result = await ClientService.saveClient(client);
    if (result.ok) {
      const insertedClient = (await result.json()) as Client;
      setClients([...clients, insertedClient]);
    }
    if (result.status === 400) {
      const validationResult = ValidationError.fromJSON(ValidationError, await result.json());
      console.warn(validationResult.getErrors().join("\n"));
      setOpenAlert(true);
    }
  };

  const deleteClient = async (client: Client) => {
    if (client.Id) {
      const result = await ClientService.deleteClient(client.Id);
      if (result.ok) {
        clients.splice(clients.indexOf(client), 1);
        setClients([...clients]);
      }
    }
  };

  return (
    <>
      <ValidationErrorElement openAlert={openAlert} closeAlertCallback={() => setOpenAlert(false)} />
      <Table>
        <ClientGridHead />
        <ClientGridBody readonly={props.readOnly ?? false} data={clients} newClientCallback={addClient} deleteClientCallback={deleteClient} />
      </Table>
    </>
  );
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
  );
}

interface ClientGridBodyProps {
  data: Client[];
  readonly: boolean;
  newClientCallback: (client: Client) => void;
  deleteClientCallback: (client: Client) => void;
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
              {row.ContactInfo.PhoneContact.map((it, index) => (
                <ListItem key={index}>{it.PhoneNumber}</ListItem>
              ))}
            </List>
          </TableCell>
          <TableCell>{row.Lastname}</TableCell>
          <TableCell>{row.Firstname}</TableCell>
          <TableCell>
            <ConfirmationButton
              as={
                <IconButton>
                  <Cancel />
                </IconButton>
              }
              onConfirm={() => props.deleteClientCallback(row)}
            />
          </TableCell>
        </TableRow>
      ))}
      <AddNewClientRow existingClients={props.data} newClientCallback={props.newClientCallback} />
    </TableBody>
  );
}

interface AddNewClientRowProps {
  existingClients: Client[];
  newClientCallback: (client: Client) => void;
}
type IClientInput = {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumbers: PhoneContact[];
};
function AddNewClientRow(props: AddNewClientRowProps) {
  const classes = useStyle();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IClientInput>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumbers: [],
    },
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  useEffect(() => {
    if (!fields.length) setError("phoneNumbers", { message: "There must be at least one phone number per client." });
    else clearErrors("phoneNumbers");
  }, [clearErrors, fields, setError]);

  const onClientSubmit = async (data: IClientInput, event?: BaseSyntheticEvent) => {
    const client: Client = {
      ContactInfo: {
        Email: data.email,
        PhoneContact: data.phoneNumbers,
      },
      Firstname: data.firstname,
      Lastname: data.lastname,
    };
    reset({
      firstname: "",
      lastname: "",
      email: "",
      phoneNumbers: [],
    });
    props.newClientCallback(client);
  };

  return (
    <TableRow>
      <TableCell align={"left"}>
        <IconButton color="primary" type={"submit"} onClick={handleSubmit(onClientSubmit)} aria-label="Add new client">
          <Add></Add>
        </IconButton>
      </TableCell>
      <TableCell>
        <Controller
          name="email"
          control={control}
          render={({ fieldState, field }) => (
            <TextField
              type={"email"}
              required={true}
              placeholder={"ex.: john@domain.com"}
              onChange={(e) => field.onChange(e.target.value)}
              defaultValue={field.value}
              label={"E-mail address"}
              value={field.value}
              helperText={fieldState.error?.message ?? ""}
              error={fieldState.invalid}
            />
          )}
          rules={{
            required: "The e-mail field is required.",
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: EmailValidation,
              message: "The e-mail given is not a valid e-mail address",
            },
            validate: {
              isUnique: (value) =>
                !props.existingClients.map((client) => client.ContactInfo.Email).includes(value) || "The e-mail given must be unique.",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <List>
          <ListItem>
            <Button variant={"contained"} color={"primary"} onClick={() => append({ PhoneNumber: "" })} endIcon={<Add />}>
              Add phone number
            </Button>
          </ListItem>
          <ListItem hidden={Boolean(errors.phoneNumbers)}>
            <ErrorMessage errors={errors} name="phoneNumbers" as={<ListItemText className={classes.redText} />} />
          </ListItem>
          {fields.map((field, index) => (
            <ListItem key={field.id}>
              <Controller
                name={`phoneNumbers.${index}.PhoneNumber` as const}
                control={control}
                render={({ fieldState, field }) => (
                  <TextField
                    type={"tel"}
                    label={"Phone number"}
                    helperText={fieldState.error?.message ?? ""}
                    placeholder={"+36 59 425 967"}
                    error={fieldState.invalid}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    defaultValue={field.value}
                  />
                )}
                rules={{
                  required: "Cannot add an empty phone number.",
                  pattern: {
                    // eslint-disable-next-line no-useless-escape
                    value: PhoneNumberValidation,
                    message: "Cannot add an invalid phone number.",
                  },
                  validate: {
                    isDuplicatePhoneNumber: (value) => {
                      const numbers = fields.map((field) => field.PhoneNumber);
                      numbers.splice(index, 1);
                      if (numbers.includes(value)) return "This phone number already exists in the list.";
                    },
                  },
                }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => remove(index)}>
                  <Cancel />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </TableCell>
      <TableCell>
        <Controller
          name="lastname"
          control={control}
          render={({ fieldState, field }) => (
            <TextField
              required={true}
              type={"text"}
              label={"Lastname"}
              value={field.value}
              helperText={fieldState.error?.message ?? ""}
              error={fieldState.invalid}
              onChange={(e) => field.onChange(e.target.value)}
              defaultValue={field.value}
            />
          )}
          rules={{
            required: "The lastname field must not be empty.",
          }}
        />
      </TableCell>
      <TableCell>
        <Controller
          name="firstname"
          control={control}
          render={({ fieldState, field }) => (
            <TextField
              required={true}
              type={"text"}
              label={"Firstname"}
              value={field.value}
              helperText={fieldState.error?.message ?? ""}
              error={fieldState.invalid}
              onChange={(e) => field.onChange(e.target.value)}
              defaultValue={field.value}
            />
          )}
          rules={{
            required: "The firstname field must not be empty.",
          }}
        />
      </TableCell>
    </TableRow>
  );
}
