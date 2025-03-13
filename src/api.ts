import { WeatherData } from "./types";
import * as dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error('API_KEY is not defined in .env file');
}

export const getData = async (a: string): Promise<WeatherData | undefined> => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Houston we have a problem');
        }

        const res: WeatherData = await response.json();

        return res;
    } catch (err) {
        console.log(err);
        return undefined; // Return undefined in case of error
    }
}


