import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faDroplet,
  faSun,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CurrentWeatherModel } from "@/models/CurrentWeatherModel";
import SmallCard from "./SmallCard";
import moment from "moment";
import global, { isObjectEmpty } from "../config";

function CityWeather(currentWeatherData: CurrentWeatherModel) {
  const iconColor = global.color;

  return (
    <>
      {isObjectEmpty(currentWeatherData) && (
        <>
          <h2 className="flex w-full     flex-col   p-4 md:p-6  text-white">
            Please set the default location
          </h2>
        </>
      )}

      {!isObjectEmpty(currentWeatherData) && (
        <>
          <Card className="bg-white bg-opacity-50 rounded-md border-gray-800 flex-1 mt-4 lg:mt-0 lg:ml-4 shadow-amber-700 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="font-bold  text-2xl text-primary">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="1x"
                  color={iconColor}
                />
                {"  "}
                {currentWeatherData.name}
              </CardTitle>
              <CardTitle className="flex font-bold text-2xl text-primary">
                {moment(currentWeatherData.dt).format("dddd")},
                <p>
                  {moment.unix(currentWeatherData.dt).format("MMM Do YYYY")}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-center items-center pb-2 space-y-0">
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  currentWeatherData?.weather[0]?.icon +
                  "@2x.png"
                }
                className="w-36 h-36 mt-4"
                alt="Weather illustration"
                height="200"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
                width="200"
              />

              <div className="flex flex-col">
                <div className="font-bold mt-4 text-3xl text-primary ">
                  <h5>{currentWeatherData?.weather[0]?.description}</h5>
                  <h2> {Math.round(currentWeatherData?.main.temp)}°C </h2>
                  <h4 className="text-lg  font-light ">
                    Feels Like {Math.round(currentWeatherData?.main.feels_like)}
                    °C
                  </h4>
                </div>
              </div>
            </CardContent>
            <CardContent className="h-full flex flex-col justify-end  items-end"></CardContent>
          </Card>

          <Card className="bg-white bg-opacity-50 rounded-md border-gray-800 flex-1 mt-4 lg:mt-0 lg:ml-4 shadow-amber-700 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold text-primary">
                Today's Highlight
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-center items-center flex-wrap gap-4">
              <SmallCard
                cssclass="w-50"
                textOne="Wind Status"
                textTwo={currentWeatherData.wind.speed + " km/h"}
                icon={
                  <FontAwesomeIcon icon={faWind} size="1x" color={iconColor} />
                }
              ></SmallCard>
              <SmallCard
                cssclass="w-50"
                textOne="Humidity"
                textTwo={currentWeatherData.main.humidity.toString() + "%"}
                icon={
                  <FontAwesomeIcon
                    icon={faDroplet}
                    size="1x"
                    color={iconColor}
                  />
                }
              ></SmallCard>
              <SmallCard
                cssclass="w-50"
                textOne="Sunrise"
                textTwo={moment
                  .unix(currentWeatherData.sys.sunrise)
                  .format("h:mm A")}
                icon={
                  <FontAwesomeIcon icon={faSun} size="1x" color={iconColor} />
                }
              ></SmallCard>
              <SmallCard
                cssclass="w-50"
                textOne="Sunset"
                textTwo={moment
                  .unix(currentWeatherData.sys.sunset)
                  .format("h:mm A")}
                icon={
                  <FontAwesomeIcon
                    icon={faCloudSun}
                    size="1x"
                    color={iconColor}
                  />
                }
              ></SmallCard>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

export default CityWeather;
