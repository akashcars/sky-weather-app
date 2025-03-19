import { Card, CardContent } from "./ui/card";
import { List } from "@/models/WeatherModel";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import global, { isObjectEmpty } from "../config";

function VerticalCard(DayWiseDetails: List) {
  return (
    <>
      {!isObjectEmpty(DayWiseDetails) && (
        <div>
          <Card
            className="bg-white bg-opacity-50 w-50 rounded-md border-gray-800 flex-none mt-4 lg:mt-0  lg:ml-4 shadow-amber-700 shadow-md
         bg-gradient-to-b from-primary-400 via-primary-200 to-white "
          >
            <CardContent className="flex flex-col items-center ">
              <div className="flex flex-col items-center border-b-1 border-b-black  pb-2">
                <div className="font-large font-semibold ">
                  {moment(DayWiseDetails.dt_txt).format("MMM Do , hh:mm A")}
                </div>
                <div className="font-large font-semibold ">
                  {moment(DayWiseDetails.dt_txt).format("dddd")}
                </div>
              </div>

              <h2 className="text-xl text-amber-700 mt-2">
                {DayWiseDetails.weather[0].description}
              </h2>
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  DayWiseDetails.weather[0].icon +
                  "@2x.png"
                }
                alt={DayWiseDetails.weather[0].icon}
                className="w-24 h-24"
                height="200"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
                width="200"
              />

              <div className="text-2xl font-bold mt-1 text-gray-800">
                {Math.round(DayWiseDetails.main.temp)}°C
              </div>
              <div className="text-lg font-medium text-black">
                Feels like {Math.round(DayWiseDetails.main.feels_like)}°C
              </div>
              <h4 className="text-md text-gray-700">
                <FontAwesomeIcon icon={faDroplet} color={global.color} />{" "}
                {DayWiseDetails.main.humidity} %
              </h4>
              <h4 className="text-md text-gray-700">
                <FontAwesomeIcon icon={faWind} color={global.color} />{" "}
                {DayWiseDetails.wind.speed} km/h
              </h4>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default VerticalCard;
