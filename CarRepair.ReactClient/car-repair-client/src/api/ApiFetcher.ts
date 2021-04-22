import { User } from "oidc-client";
import configuration from "../static/configuration.json";

export class ApiFetcher {
  private static readonly baseURL = `${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}`;
  private static getToken(): string | undefined {
    const user = sessionStorage.getItem(`oidc.user:${this.baseURL}:${configuration.OIDC_ClientId}`);
    if (user) {
      return (JSON.parse(user) as User).access_token;
    }
    return undefined;
  }

  public static async getData<T>(path = "", queryParams?: URLSearchParams): Promise<T | null> {
    let requestInit = {};
      const token = this.getToken()
      console.log(token)
      if (token) {
        const bearer = "Bearer " + token;
        requestInit = {
          method: "GET",
          headers: {
            Authorization: bearer,
          }
        };
      } else
        requestInit = {
          method: "GET"
        };
    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""),requestInit);
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
    return null;
  }

  public static async postData(path = "", data = {}): Promise<Response> {
    try {
      let requestInit = {};
      const token = this.getToken()
      console.log(token)
      if (token) {
        const bearer = "Bearer " + token;
        requestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify(data),
        };
      } else
        requestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

      const response = await fetch(this.baseURL + path, requestInit);
      if (response.ok) {
        return response;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
    return Response.error();
  }

  public static async putData(path = "", queryParams?: URLSearchParams, data = {}): Promise<Response> {
    // Default options are marked with *
    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response;
    }
    return response;
  }

  public static async deleteData(path = "", queryParams?: URLSearchParams): Promise<Response> {
    // Default options are marked with *
    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), {
      method: "DELETE",
    });
    if (response.ok) {
      return response;
    }
    return response;
  }
}
