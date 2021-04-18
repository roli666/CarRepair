import { UserManager } from "oidc-client";

const config = {
  // the URL of our identity server
  authority: "http://localhost:55000",
  // this ID maps to the client ID in the identity client configuration
  client_id: "react-client",
  // URL to redirect to after login
  redirect_uri: "http://localhost:3000",
  response_type: "id_token token",
  // the scopes or resources we would like access to
  scope: "openid profile api",
  // URL to redirect to after logout
  post_logout_redirect_uri: "http://localhost:3000/sign-in",
};

// initialise!
export const userManager = new UserManager(config);
