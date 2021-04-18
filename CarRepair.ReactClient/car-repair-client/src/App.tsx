import { BrowserRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Home } from "./Home";
import { JobEditor } from "./components/JobEditor";
import { ClientEditor } from "./components/ClientEditor";
import { CarEditor } from "./components/CarEditor";
import { SignIn } from "./SignIn";
import { Container, Grid } from "@material-ui/core";
import { Routes } from "RouteData";
import React, { useEffect } from "react";
import { userManager } from "./services/UserService";

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
const APIHealthStatus = {
  isAlive: false,
};

export const HealthStatus = React.createContext(APIHealthStatus);

function App() {
  return (
    <BrowserRouter>
      <Grid container direction={"column"}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Container component={"main"}>
            <Switch>
              <Route exact path={"/"}>
                {false ? <Redirect to={Routes.get("home")?.Path!} /> : <Redirect to={Routes.get("sign-in")?.Path!} />}
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
              <Route path="/sign-in">
                <SignIn />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
