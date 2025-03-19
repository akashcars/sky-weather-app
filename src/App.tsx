import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
// import the library
import { library } from "@fortawesome/fontawesome-svg-core";
// import your icons
import { fas } from "@fortawesome/free-solid-svg-icons";

import LocationContext from "./context/LocationContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //const [location, setLocation] = useState("LONDON");
  const [location, setLocation] = useState("-");

  return (
    <>
      <ToastContainer />
      <LocationContext.Provider value={{ location, setLocation }}>
        <Dashboard />
      </LocationContext.Provider>
    </>
  );
}

export default App;
library.add(fas);
