import React, { useState } from "react";

const CityContext = React.createContext({
  currentCity: "",
  setCurrentCity: () => {},
  latitude: "",
  setLatitude: () => {},
  longitude: "",
  setLongitude: () => {},
});

export const CityContextProvider = (props) => {
  const [currentCity, setCurrentCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  return (
    <CityContext.Provider
      value={{
        currentCity: currentCity,
        setCurrentCity,
        latitude: latitude,
        setLatitude,
        longitude: longitude,
        setLongitude,
      }}
    >
      {props.children}
    </CityContext.Provider>
  );
};
export default CityContext;
