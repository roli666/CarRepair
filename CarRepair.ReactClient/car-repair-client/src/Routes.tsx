import CarEditor from "./CarEditor";
import ClientEditor from "./ClientEditor";
import JobEditor from "./JobEditor";
import { Home } from "Home";
import { AvailableJobs } from "AvailableJobs";
import { Redirect, Route } from "react-router-dom";
import { SignIn } from "SignIn";
import { SignOut } from "SignOut";

export enum UsedRoutes {
  Home = "/home",
  JobEditor = "/job-editor",
  CarEditor = "/car-editor",
  ClientEditor = "/client-editor",
  AvailableJobs = "/available-jobs",
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
      <Route path={UsedRoutes.AvailableJobs} component={AvailableJobs} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-out" component={SignOut} />
    </>
  );
}
