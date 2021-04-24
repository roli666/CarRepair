import ApiFetcher from "../api/ApiFetcher";
import { CarRepairUser } from "../api/models/CarRepairUser";

class CarRepairUserService {
  public static async getAvailableUsers() {
    return await ApiFetcher.getData<CarRepairUser[]>("/carrepairuser");
  }
  public static async getUser(userId: string) {
    return await ApiFetcher.getData<CarRepairUser>(`/carrepairuser/${userId}`);
  }
}

export default CarRepairUserService;
