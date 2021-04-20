import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

export function SignIn() {
  const { events } = useReactOidc();
  const history = useHistory();
  events.addUserLoaded(() => history.push("/"));
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
