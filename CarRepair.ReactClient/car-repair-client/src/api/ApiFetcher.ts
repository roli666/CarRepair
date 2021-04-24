import { User } from "oidc-client";
import configuration from "../static/configuration.json";

class ApiFetcher {
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
    const token = this.getToken();
    if (token) {
      const bearer = "Bearer " + token;
      requestInit = {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      };
    } else
      requestInit = {
        method: "GET",
      };
    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), requestInit);
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
    return null;
  }

  public static async postData(path = "", data = {}): Promise<Response> {
    try {
      let requestInit = {};
      const token = this.getToken();
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
    let requestInit = {};
    const token = this.getToken();
    if (token) {
      const bearer = "Bearer " + token;
      requestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(data),
      };
    } else
      requestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), requestInit);
    if (response.ok) {
      return response;
    }
    return response;
  }

  public static async deleteData(path = "", queryParams?: URLSearchParams): Promise<Response> {
    let requestInit = {};
    const token = this.getToken();
    if (token) {
      const bearer = "Bearer " + token;
      requestInit = {
        method: "DELETE",
        headers: {
          Authorization: bearer,
        },
      };
    } else
      requestInit = {
        method: "DELETE",
      };

    const response = await fetch(this.baseURL + path + (queryParams?.toString() ?? ""), requestInit);
    if (response.ok) {
      return response;
    }
    return response;
  }
}
export default ApiFetcher;
