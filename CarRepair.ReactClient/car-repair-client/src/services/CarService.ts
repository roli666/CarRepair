import { ApiFetcher } from "../api/ApiFetcher";
import { Car, CarMessage } from "../api/models/Car";

export class CarService {
  public static async getAvailableCars() {
    return await ApiFetcher.getData<Car[]>("/car");
  }
  public static async getCar(carId: number) {
    return await ApiFetcher.getData<Car[]>(`/car/${carId}`);
  }
  public static async deleteCar(carId: number) {
    return await ApiFetcher.deleteData(`/car/${carId}`);
  }
  public static async saveCar(car: CarMessage) {
    return await ApiFetcher.postData("/car", car);
  }
  public static async updateCar(car: CarMessage) {
    return await ApiFetcher.putData("/car", new URLSearchParams({ id: car.Id?.toString() ?? "" }), car);
  }
}
