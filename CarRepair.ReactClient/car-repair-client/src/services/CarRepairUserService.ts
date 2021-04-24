import ApiFetcher from "../api/ApiFetcher";
import { CarRepairUser } from "../api/models/CarRepairUser";

class CarRepairUserService {
  public static async getAvailableJobs() {
    return await ApiFetcher.getData<CarRepairUser[]>("/carrepairuser");
  }
  public static async getJob(userId: string) {
    return await ApiFetcher.getData<CarRepairUser>(`/carrepairuser/${userId}`);
  }
}

export default CarRepairUserService;
