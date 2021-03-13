import { ApiFetcher } from "./ApiFetcher"
import { WeatherForecast } from "./models/WeatherForecast"

export class WeatherService {
    private apiFetcher: ApiFetcher

    constructor(apiFetcher: ApiFetcher) {
        this.apiFetcher = apiFetcher
    }

    public async getWeather(){
        return await this.apiFetcher.getData<WeatherForecast[]>("weatherforecast")
    }
}