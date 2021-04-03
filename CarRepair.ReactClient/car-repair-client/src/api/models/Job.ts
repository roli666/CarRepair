import { Car } from "./Car";

export interface Job {
    Id?: number,
    Car: Car,
    Registered: Date,
    Started?: Date,
    Finished?: Date,
    Status: JobStatus
}
export enum JobStatus {
    Awaiting,
    InProgress,
    Done
}
