import {
  FormGroup,
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
import { Controller, DeepMap, FieldError, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Client } from "../../api/models/Client";
import { ClientService } from "../../services/ClientService";
import { ValidationErrorElement } from "../ErrorHandler";
import { EmailValidation, PhoneNumberValidation } from "../../helpers/Regex";

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
            <IconButton onClick={() => props.deleteClientCallback(row)}>
              <Cancel />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      <AddNewClientRow newClientCallback={props.newClientCallback} />
    </TableBody>
  );
}

interface AddNewClientRowProps {
  newClientCallback: (client: Client) => void;
}
interface IClientInput {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumbers: string[];
}
interface IPhoneNumberInput {
  phoneNumber: string;
}
function AddNewClientRow(props: AddNewClientRowProps) {
  const classes = useStyle();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors: clientErrors },
    setValue,
    getValues,
  } = useForm<IClientInput>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumbers: [],
    },
    reValidateMode: "onChange",
  });

  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(getValues("phoneNumbers"));

  useEffect(() => {
    setValue("phoneNumbers",phoneNumbers)
  }, [phoneNumbers, setValue]);

  control.register("phoneNumbers", {
    validate: {
      mustNotBeEmpty: (value) => value.length !== 0 || "The new client must have at least 1 phone number.",
    },
  });

  const { handleSubmit: handlePhoneSubmit, reset: phoneReset, control: phoneControl } = useForm<IPhoneNumberInput>({
    defaultValues: {
      phoneNumber: "",
    },
    reValidateMode: "onChange",
  });

  const onClientSubmit = async (data: IClientInput, event?: BaseSyntheticEvent) => {
    const client: Client = {
      ContactInfo: {
        Email: data.email,
        PhoneContact: getValues("phoneNumbers").map((value) => {
          return { PhoneNumber: value };
        }),
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

  const onPhoneSubmit = (data: IPhoneNumberInput, event?: BaseSyntheticEvent) => {
    setPhoneNumbers([...getValues("phoneNumbers"), data.phoneNumber])
    setValue("phoneNumbers", [...getValues("phoneNumbers"), data.phoneNumber]);
    phoneReset({
      phoneNumber: "",
    });
  };

  const onClientError = async (errors: DeepMap<IClientInput, FieldError>, event?: BaseSyntheticEvent) => {
    console.log(clientErrors.phoneNumbers);
  };

  return (
    <TableRow>
      <TableCell>
        <IconButton color="primary" type={"submit"} onClick={handleSubmit(onClientSubmit, onClientError)} aria-label="Add new job">
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
          }}
        />
      </TableCell>
      <TableCell>
        <List className={""}>
          <ListItem>
            <Controller
              name="phoneNumber"
              control={phoneControl}
              render={({ fieldState, field }) => (
                <FormGroup row>
                  <TextField
                    type={"tel"}
                    label={"Phone number to add"}
                    helperText={fieldState.error?.message ?? ""}
                    placeholder={"+36 59 425 967"}
                    error={fieldState.invalid}
                    onChange={(e) => field.onChange(e.target.value)}
                    defaultValue={field.value}
                  />
                  <IconButton onClick={handlePhoneSubmit(onPhoneSubmit)}>
                    <Add />
                  </IconButton>
                </FormGroup>
              )}
              rules={{
                required: "Cannot add an empty phone number.",
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: PhoneNumberValidation,
                  message: "Cannot add an invalid phone number.",
                },
                validate: {
                  doesNotExistInNewPhoneNumbers: (value) =>
                    !getValues("phoneNumbers").includes(value) || "This phone number already exists in the list.",
                },
              }}
            />
          </ListItem>
          <ListItem>Phone numbers client will have: </ListItem>
          <ErrorMessage errors={clientErrors} name="phoneNumbers" as={<ListItem className={classes.redText} />} />
          {phoneNumbers.map((number, index) => (
            <ListItem key={index}>
              <ListItemText>{number}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    const numbers = getValues("phoneNumbers");
                    numbers.splice(index, 1);
                    console.log(numbers);
                    setPhoneNumbers([...numbers])
                  }}
                >
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
