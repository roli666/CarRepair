import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Home } from "./Home"
import { JobEditor } from './components/JobEditor';
import { ClientEditor } from './components/ClientEditor';
import { CarEditor } from './components/CarEditor';
import { Container, Grid } from '@material-ui/core';
import { Routes } from 'RouteData';
import React from "react";

//import configuration from './static/configuration.json'

// const identityHost = `${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}`

// const oidcConfig: AuthProviderProps = {
//   onSignIn: async () => {
//     // Redirect?
//   },
//   authority: identityHost,
//   clientId: "react-client",
//   redirectUri: identityHost + "/authentication/login-callback",
//   postLogoutRedirectUri: identityHost + "/authentication/logout-callback",
//   scope: "openid profile api",
//   responseType:'token id_token'
// };

function App() {
  return (
    <BrowserRouter>
      <Grid container direction={"row"}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Container>
            <Switch>
              <Route exact path={Routes.get("home")?.Path}>
                <Home />
              </Route>
              <Route path={Routes.get("jobEditor")?.Path}>
                <JobEditor />
              </Route>
              <Route path={Routes.get("carEditor")?.Path}>
                <CarEditor />
              </Route>
              <Route path={Routes.get("clientEditor")?.Path}>
                <ClientEditor />
              </Route>
            </Switch>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
