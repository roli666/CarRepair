import { Car } from "./Car";

export interface Job {
  Id?: number;
  Car: Car;
  Description: string;
  Registered: Date;
  Started?: Date;
  Finished?: Date;
  Status: JobStatus;
}

export interface JobMessage {
  Id?: number;
  CarId: number;
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
