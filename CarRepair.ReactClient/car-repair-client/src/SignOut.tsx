import { Redirect } from "react-router-dom";
import { UsedRoutes } from "Routes";

export function SignOut() {
  return <Redirect to={UsedRoutes.Home} />;
}
