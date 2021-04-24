import { Car } from "./Car";
import { CarRepairUser } from "./CarRepairUser";

export interface Job {
  Id?: number;
  Car: Car;
  AssignedTo?: CarRepairUser;
  Description: string;
  Registered: Date;
  Started?: Date;
  Finished?: Date;
  Status: JobStatus;
}

export interface JobMessage {
  Id?: number;
  CarId: number;
  AssignedToId?: string;
  Description: string;
  Registered?: Date;
  Started?: Date;
  Finished?: Date;
  Status?: JobStatus;
}

export enum JobStatus {
  Awaiting,
  InProgress,
  Done,
}
