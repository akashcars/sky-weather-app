import { useState } from "react";
import LocationContext from "./LocationContext";

const LocationContextProvider = ({ children }: any) => {
  const [location, setLocation] = useState("-");

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
