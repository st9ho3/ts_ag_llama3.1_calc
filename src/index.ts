import PromptSync from "prompt-sync";
import { getWeather } from "./api";
import {  WeatherData } from "./types";


const prompt = PromptSync()

const city: string = prompt("Which city you're interrested in?")

const cityWeather = async (a: string): Promise<void> => {
    const data: WeatherData | undefined = await getWeather(a);
    
    if (data) {
        const condition: string  = data.weather[0].main
        console.log(condition)
        console.log(`In the city of ${a} temperature today will be ${data.main.temp} but it will feels like ${data.main.feels_like}`)

    } else {
        console.log('No data found.');
    }
};

cityWeather(city)



