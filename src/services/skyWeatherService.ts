import { CurrentWeatherModel } from "@/models/CurrentWeatherModel";
import { AxiosReq } from "../Axios.Provider";
import { WeatherModel } from "../models/WeatherModel";

export const GetFiveDayWeatherForecast = async (city: string) => {

    const response = await AxiosReq.get(`/WeatherForecast/GetFiveDayWeatherByCity?city=${city}`);
    const data = await response.data as WeatherModel; 
    return data; 
}  

export const GetCurrentWeather = async (city: string) => {
    
    const response = await AxiosReq.get(`/WeatherForecast/GetWeatherByCity?city=${city}`);
    const data = await response.data as CurrentWeatherModel; 
    return data;  
}      

export const SetDefaultCityLocation = async (city: string) => {

  const submissionToSave = {
    UserId: "1",
    Location: city
  };

    const response = await AxiosReq.post("/WeatherForecast/SetDefaultLocation", submissionToSave) 
    localStorage.setItem("defaultLocation", response.data);
    return response.data;
   
};     

 