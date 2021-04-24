import "./static/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "fontsource-roboto";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import { UserManagerSettings } from "oidc-client";
import { SignIn } from "SignIn";
import configuration from "./static/configuration.json";

const theme = createMuiTheme();
const clientConfig: UserManagerSettings = {
  authority: configuration.OIDC_Authority,
  client_id: configuration.OIDC_ClientId,
  redirect_uri: configuration.OIDC_RedirectURI,
  post_logout_redirect_uri: configuration.OIDC_PostLogoutRedirectURI,
  silent_redirect_uri: configuration.OIDC_SilentRedirectURI,
  response_type: configuration.OIDC_ResponseType,
  scope: configuration.OIDC_Scope,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthenticationProvider configuration={clientConfig} callbackComponentOverride={SignIn} loggerLevel={oidcLog.DEBUG}>
          <App />
        </AuthenticationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
