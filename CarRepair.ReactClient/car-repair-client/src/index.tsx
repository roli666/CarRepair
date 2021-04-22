import "./static/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "fontsource-roboto";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import { UserManagerSettings } from "oidc-client";
import { SignIn } from "SignIn";
import configuration from "./static/configuration.json";

const theme = createMuiTheme();
const clientConfig: UserManagerSettings = {
  authority: "https://localhost:55001",
  client_id: configuration.OIDC_ClientId,
  redirect_uri: "http://localhost:3000/sign-in",
  post_logout_redirect_uri: "http://localhost:3000/sign-out",
  silent_redirect_uri: "http://localhost:3000/sign-in",
  response_type: "code",
  scope: "api CarRepair.APIAPI openid profile",
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
