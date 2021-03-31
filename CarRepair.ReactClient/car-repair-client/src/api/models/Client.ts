import { ContactInfo } from "./ContactInfo";

export interface Client {
    Id: number,
    ContactInfo: ContactInfo,
    Firstname: string,
    Lastname: Client,
}
