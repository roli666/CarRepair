import { ApiFetcher } from "../api/ApiFetcher"
import { Job } from "../api/models/Job"

export class JobService {
    public static async getAvailableJobs(){
        return await ApiFetcher.getData<Job[]>("job")
    }
}