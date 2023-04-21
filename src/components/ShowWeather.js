import React, { useContext, useEffect, useState } from "react";
import CityContext from "../context/city-context";
import { API_KEY } from "../config";
import classes from "./ShowWeather.module.css";
const ShowWeather = () => {
  const [weatherData, setWeatherData] = useState();

  const ctx = useContext(CityContext);

  const getWeatherData = async (currentCity) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.latitude}&lon=${currentCity.longitude}&appid=${API_KEY}&mode=json&units=metric`
    );
    const data = await res.json();

    setWeatherData(data);
  };
  useEffect(() => {
    if (ctx.currentCity.length > 0) {
      getWeatherData(ctx);
    }
  }, [ctx]);
  if (ctx.currentCity.length === 0) return <div>Please select a City</div>;

  return (
    <div className={classes.weather}>
      {weatherData &&
        weatherData.list.map((item, i) => {
          if (i % 8 === 0) {
            return (
              <div
                key={item["dt_txt"]}
                className={
                  new Intl.DateTimeFormat("en-US", { weekday: "short" })
                    .format(new Date())
                    .toUpperCase() ===
                  new Intl.DateTimeFormat("en-US", { weekday: "short" })
                    .format(new Date(item["dt_txt"]))
                    .toUpperCase()
                    ? classes.today
                    : ""
                }
              >
                <p className={classes.day}>
                  {new Intl.DateTimeFormat("en-US", { weekday: "short" })
                    .format(new Date(item["dt_txt"]))
                    .toUpperCase()}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                <div className={classes.temps}>
                  <p className={classes.min}>{`${Number(
                    item.main["temp_min"]
                  ).toFixed(1)} °C`}</p>
                  <p>{`${Number(item.main["temp_max"]).toFixed(1)} °C`}</p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default ShowWeather;
