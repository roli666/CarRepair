import './static/css/App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Home } from "./Home"
import { Admin } from './Admin';
import { Container } from '@material-ui/core';
import { Routes } from 'RouteData';

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
      <Header />
      <Container>
        <Switch>
          <Route exact path={Routes.get("home")?.Path}>
            <Home />
          </Route>
          <Route path={Routes.get("admin")?.Path}>
            <Admin />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
