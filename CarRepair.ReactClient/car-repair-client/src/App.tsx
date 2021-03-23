import React from 'react';
import './static/css/App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Home } from "./Home"
import { Weather } from './WeatherComponent';
import { Container } from '@material-ui/core';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
