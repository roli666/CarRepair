import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userManager } from "services/UserService";

export function SignIn() {
  const history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      const user = await userManager.signinRedirect();
      console.log(user);
    }
    signinAsync();
  }, [history]);
  return <div>Redirecting to login...</div>;
}
