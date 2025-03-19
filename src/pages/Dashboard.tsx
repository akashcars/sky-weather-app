import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GetCurrentWeather,
  GetFiveDayWeatherForecast,
} from "../services/skyWeatherService";
import { List, WeatherModel } from "../models/WeatherModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import reactLogo from "../assets/sky-weather.png";
// import wdata from "@/data/FiveDayData.json";
//import currentWeatherData from "@/data/CurrentWeatherData.json";
import VerticalCard from "@/components/VerticalCard";
import CityWeather from "@/components/CityWeather";
import { CurrentWeatherModel } from "@/models/CurrentWeatherModel";
import DefaultLocationComponent from "@/components/DefaultLocationComponent";
import LocationContext from "@/context/LocationContext";
import { toast } from "react-toastify";

function Dashboard() {
  const [wdata, setWdata] = useState({} as WeatherModel);
  const [currentWeatherData, setCurrentWeatherData] = useState(
    {} as CurrentWeatherModel
  );

  const [loading, setLoading] = useState(true);

  const defaultLoc = useContext(LocationContext);
  console.log("defaultLoc  useContext in Dashboard.tsx", defaultLoc.location);

  const [city, setCity] = useState<string>("");

  const inputref = useRef<any>(null);

  useEffect(() => {
    const cityfromLocal = localStorage.getItem("defaultLocation"); // defaultLoc.location as string; //

    if (defaultLoc.location != "" && defaultLoc.location != "-") {
      GetWeatherData(defaultLoc.location as string);
    } else if (cityfromLocal != "" && cityfromLocal != "-") {
      GetWeatherData(cityfromLocal as string);
      setCity(cityfromLocal as string);
    } else {
      //setCity("London");
      GetWeatherData(city as string);
    }
  }, []);

  async function GetWeatherData(city: string) {
    let cc = city;
    if (inputref.current.value != "") {
      cc = inputref.current.value;
    }

    setLoading(true);
    await GetFiveDayWeatherForecast(cc).then((data: WeatherModel) => {
      setWdata(data);
      setLoading(false);
    });

    await GetCurrentWeather(cc).then((data: CurrentWeatherModel) => {
      setCurrentWeatherData(data);
      setLoading(false);
    });

    setCity("");
    inputref.current.value = "";
  }

  const SearchWeather = async (e: any) => {
    if (inputref.current.value == "") {
      toast.error("Please enter city name");
      inputref.current.focus();
    }
    e.preventDefault();
    await GetWeatherData(inputref.current.value);
  };

  return (
    <div className="">
      <div className=" flex flex-col w-full min-h-screen p-4 md:p-6 bg-black bg-opacity-50  ">
        <header className="flex items-center h-16 px-4 border-b border-gray-200 bg-opacity-50 bg-primary rounded-md shrink-0 md:px-6">
          <div className="flex items-center">
            <img
              alt="Logo"
              className="w-80 h-12"
              height="50"
              src={reactLogo}
              style={{ aspectRatio: "50/50", objectFit: "cover" }}
              width="50"
            />

            {/* <div className="ml-4">
              <p className="text-lg font-bold text-gray-800"> Search Weather</p>
            </div> */}
          </div>

          {/* w-full  */}
          <div className=" ml-auto flex items-right gap-2 justify-end ">
            <Input
              ref={inputref}
              className="border-gray-300 rounded-md px-4 py-2 flex-1"
              placeholder="Enter city"
              type="text"
              // onChange={(event) => {
              //   setCity(event.target.value);
              // }}
              //value={city}
            />
            <Button
              className="bg-gray-800 text-white rounded-md px-4 py-2"
              onClick={(e) => SearchWeather(e)}
            >
              Search
            </Button>
          </div>

          {/* <div className=" ml-auto flex items-right gap-2 justify-end ">
            <div className="ml-4">
              <p className="text-lg font-bold text-white">
                Location : {defaultLocation}{" "}
              </p>
            </div>
          </div> */}

          <DefaultLocationComponent />
        </header>

        {loading && <div>loading...</div>}

        <main className="flex flex-1 flex-col gap-2 p-4 md:gap-4 md:p-6 lg:flex-row">
          <CityWeather {...currentWeatherData}></CityWeather>
        </main>

        {wdata && wdata?.list?.length > 0 && (
          <section className="text-white font-bold text-2xl">
            5 Day - Hourly Forecast
          </section>
        )}

        <section className="flex overflow-x-scroll gap-2 p-4 md:gap-4 md:p-6 ">
          {wdata?.list?.map((item: List, index: number) => (
            <VerticalCard
              main={item.main}
              dt={item.dt}
              dt_txt={item.dt_txt}
              weather={item.weather}
              wind={item.wind}
              clouds={item.clouds}
              visibility={item.visibility}
              pop={item.pop}
              sys={item.sys}
              rain={item.rain}
              key={index}
            ></VerticalCard>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

{
  /* <pre>{JSON.stringify(wdata, null, 2)}</pre> */
}
{
  /* <Input type="email" placeholder="Email" />
      <div className="flex">
        <Button>Click me</Button>
      </div> */
}
{
  /* 
      <div>
        <div>
          <h5>{currentWeatherData.name}</h5>

          <h5>{currentWeatherData.weather[0].icon}</h5>
          <h5>{currentWeatherData.weather[0].main}</h5>
          <h5>{currentWeatherData.weather[0].description}</h5>

          <h5>{currentWeatherData.main.feels_like}</h5>
          <h5>{currentWeatherData.main.temp_min}</h5>
          <h5>{currentWeatherData.main.temp_max}</h5>
          <h5>{currentWeatherData.main.humidity}</h5>
          <h5>{currentWeatherData.wind.speed}</h5>
          <h5>{currentWeatherData.rain}</h5>

          <h5>{currentWeatherData.clouds.all}</h5>

          <h5>{currentWeatherData.sys.sunrise}</h5>
          <h5>{currentWeatherData.sys.sunset}</h5>

          <h5>{currentWeatherData.name}</h5>
        </div>
        <div>
          <h1>{wdata && wdata?.city?.name}</h1>
          {wdata &&
            wdata?.list?.map((weather, index) => {
              return (
                <div>
                  <span key={"d" + index}>{weather.dt_txt}</span>
                  <span>{weather.clouds.all}</span>
                  <span>{weather.main.feels_like}</span>
                  <span>{weather.main.humidity}</span>
                  <span>{weather.main.temp}</span>
                  <span>{weather.main.temp_min}</span>
                  <span>{weather.main.temp_max}</span>

                  <span>{weather.weather[0].main}</span>
                  <span>{weather.weather[0].description}</span>
                  <span>{weather.weather[0].icon}</span>
                  <span>{weather.clouds.all}</span>

                  <span>{weather.wind.speed}</span>
                  <span>{weather.sys.pod}</span>

                  <img
                    src={
                      "https://openweathermap.org/img/wn/" +
                      weather.weather[0].icon +
                      ".png"
                    }
                    alt={weather.weather[0].icon}
                  />
                </div>
              );
            })}
        </div>
      </div> */
}

{
  /* <div>
        {wdata &&
          wdata.map((item: WeatherModel) => {
            return (
              <div key={item.cnt}>
                <h1>{item.city.name}</h1>
                {item.list.map((weather, index) => {
                  return (
                    <div>
                      <span key={index}>{weather.dt_txt}</span>
                      <span key={index}>{weather.clouds.all}</span>
                      <img
                        src={
                          "https://openweathermap.org/img/wn/" +
                          weather.weather[0].icon
                        }
                        alt="recipe image"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div> */
}
