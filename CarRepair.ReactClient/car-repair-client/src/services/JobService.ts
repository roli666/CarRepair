import { ApiFetcher } from "../api/ApiFetcher";
import { Job, JobMessage } from "../api/models/Job";

export class JobService {
  public static async getAvailableJobs() {
    return await ApiFetcher.getData<Job[]>("/job");
  }
  public static async getJob(jobId: number) {
    return await ApiFetcher.getData<Job>(`/job/${jobId}`);
  }
  public static async deleteJob(jobId: number) {
    return await ApiFetcher.deleteData(`/job/${jobId}`);
  }
  public static async saveJob(job: JobMessage) {
    return await ApiFetcher.postData("/job", job);
  }
  public static async updateJob(job: Job) {
    return await ApiFetcher.putData("/job", new URLSearchParams({ id: job.Id?.toString() ?? "" }), job);
  }
  public static async startJob(jobId: number) {
    return await ApiFetcher.putData(`/job/start/${jobId}`);
  }
  public static async finishJob(jobId: number) {
    return await ApiFetcher.putData(`/job/finish/${jobId}`);
  }
}
