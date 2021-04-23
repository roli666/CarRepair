import { Switch } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Container, Grid } from "@material-ui/core";
import React from "react";
import { Routes } from "Routes";

const APIHealthStatus = {
  isAlive: false,
};

export const HealthStatus = React.createContext(APIHealthStatus);

function App() {
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container component={"main"}>
          <Switch>
            <Routes />
          </Switch>
        </Container>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;
