import { ApiFetcher } from "./ApiFetcher"
import { WeatherForecast } from "./models/WeatherForecast"

export class WeatherService {
    public static async getWeather(){
        return await ApiFetcher.getData<WeatherForecast[]>("weatherforecast")
    }
}