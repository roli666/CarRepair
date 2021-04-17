import { ApiFetcher } from "../api/ApiFetcher";
import { Job } from "../api/models/Job";

export class JobService {
  public static async getAvailableJobs() {
    return await ApiFetcher.getData<Job[]>("job");
  }
  public static async getJob(jobId: number) {
    return await ApiFetcher.getData<Job>(`job/${jobId}`);
  }
  public static async deleteJob(jobId: number) {
    return await ApiFetcher.deleteData(`job/${jobId}`);
  }
  public static async saveJob(job: Job) {
    return await ApiFetcher.postData("job", job);
  }
  public static async updateJob(job: Job) {
    return await ApiFetcher.putData("job", new URLSearchParams({ id: job.Id?.toString() ?? "" }), job);
  }
}
