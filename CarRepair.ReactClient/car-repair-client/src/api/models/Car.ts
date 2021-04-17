import { Client } from "./Client";

export interface Car {
  Id?: number;
  Type: string;
  LicencePlate: string;
  Owner: Client;
}

export interface CarMessage {
  Id?: number;
  Type: string;
  LicencePlate: string;
  OwnerId: number;
}
