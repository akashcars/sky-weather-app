import { useContext, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SetDefaultCityLocation } from "@/services/skyWeatherService";
import LocationContext from "@/context/LocationContext";

function DefaultLocationComponent() {
  const [defaultLocation, setDefaultLocation] = useState("");

  const { location, setLocation } = useContext(LocationContext);

  useEffect(() => {
    GetDefaultLocation();
  }, []);

  function GetDefaultLocation() {
    const location = localStorage.getItem("defaultLocation");
    setDefaultLocation(location as string);
  }

  async function SetDefaultLocationHandler(event: any) {
    event.preventDefault();
    await SetDefaultCityLocation(defaultLocation)
      .then((data: string) => {
        // console.log(data);
        setLocation(data);
      })
      .catch((error) => {
        console.log("SetDefaultCityLocation error", error.toJSON());
      });
  }

  return (
    <div className=" ml-auto flex items-right gap-2 justify-end ">
      <p className="text-white m-2">Location {location}</p>
      <Input
        className="border-gray-300 rounded-md px-4 py-2 flex-1"
        placeholder="Enter default location"
        type="text"
        onChange={(event) => {
          setDefaultLocation(event.target.value);
        }}
        value={defaultLocation}
      />
      <Button
        className="bg-gray-800 text-white rounded-md px-4 py-2"
        onClick={(event) => SetDefaultLocationHandler(event)}
      >
        Set
      </Button>
    </div>
  );
}

export default DefaultLocationComponent;
