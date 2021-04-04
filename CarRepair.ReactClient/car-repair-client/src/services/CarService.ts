import { ApiFetcher } from "../api/ApiFetcher"
import { Car } from "../api/models/Car"

export class CarService {
    public static async getAvailableCars(){
        return await ApiFetcher.getData<Car[]>("car")
    }
}