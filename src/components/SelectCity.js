import React, { useContext, useEffect, useState } from "react";
import classes from "./SelectCity.module.css";
import CityContext from "../context/city-context";

const SelectCity = () => {
  const [cities, setCities] = useState([]);

  const ctx = useContext(CityContext);

  const getCityData = async () => {
    const res = await fetch(
      "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json"
    );
    const data = await res.json();
    setCities(data);
  };

  useEffect(() => {
    getCityData();
  }, []);

  const cityChangeHandler = (event) => {
    ctx.setCurrentCity(event.target.value);
    if (cities.find((city) => city.name === event.target.value)) {
      ctx.setLatitude(
        cities.find((city) => city.name === event.target.value).latitude
      );
      ctx.setLongitude(
        cities.find((city) => city.name === event.target.value).longitude
      );
    }
  };

  return (
    <div className={classes["select-city"]}>
      <select onChange={cityChangeHandler}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCity;
