import { ApiFetcher } from "./ApiFetcher"
import { Job } from "./models/Job"

export class JobService {
    public static async getAvailableJobs(){
        return await ApiFetcher.getData<Job[]>("job")
    }
}