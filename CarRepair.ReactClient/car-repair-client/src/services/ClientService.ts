import { ApiFetcher } from "../api/ApiFetcher";
import { Client } from "../api/models/Client";

export class ClientService {
  public static async getAvailableClients() {
    return await ApiFetcher.getData<Client[]>("client");
  }
  public static async getClient(clientId: number) {
    return await ApiFetcher.getData<Client>(`client/${clientId}`);
  }
  public static async deleteClient(clientId: number) {
    return await ApiFetcher.deleteData(`client/${clientId}`);
  }
  public static async saveClient(client: Client) {
    return await ApiFetcher.postData("client", client);
  }
  public static async updateClient(client: Client) {
    return await ApiFetcher.putData("client", new URLSearchParams({ id: client.Id?.toString() ?? "" }), client);
  }
}
