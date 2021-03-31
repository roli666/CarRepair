import { Car } from "./Car";

export interface Job {
    Id: number,
    Car: Car,
    Registered: Date,
    Started: Date | undefined,
    Finished: Date | undefined,
    Status: JobStatus
}
export enum JobStatus {
    Awaiting,
    Started,
    InProgress,
    Done
}
