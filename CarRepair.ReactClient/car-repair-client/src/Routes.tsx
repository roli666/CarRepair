import { CarEditor } from "components/CarEditor";
import { ClientEditor } from "components/ClientEditor";
import { JobEditor } from "components/JobEditor";
import { Home } from "Home";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { SignIn } from "SignIn";
import { SignOut } from "SignOut";

export enum UsedRoutes {
  Home = "/home",
  JobEditor = "/job-editor",
  CarEditor = "/car-editor",
  ClientEditor = "/client-editor",
}

export function Routes() {
  return (
    <>
      <Route exact path={"/"}>
        <Redirect to={"home"} />
      </Route>
      <Route path={UsedRoutes.JobEditor} component={JobEditor} />
      <Route path={UsedRoutes.CarEditor} component={CarEditor} />
      <Route path={UsedRoutes.ClientEditor} component={ClientEditor} />
      <Route path={UsedRoutes.Home} component={Home} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-out" component={SignOut} />
    </>
  );
}
