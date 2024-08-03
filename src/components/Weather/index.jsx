"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";

import { getWeatherData } from "@/utils/weather-api";
import { getAllCities } from "@/utils/countries-api";
import { useCity } from "@/contexts/CityContext";
import Text from "../Text";
import WeatherImg from "@/assets/images/weather.png";
import styles from "./styles.module.scss";


const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [countries, setCountries] = useState(null);

  const { city } = useCity();

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData(city);
      setWeather(data);
    };

    fetchWeather();
  }, [city]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCities();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  return (
    <div className={styles["weather"]}>
      {weather ? (
        <div className={styles["weather-container"]}>
          <div className={styles["title"]}>
            <Text
              text={`${weather.name}, ${weather.sys.country}`}
              fontSize="small"
            />
            <Text text={moment().format("HH:mm")} fontSize="extra-small" />
          </div>
          <div className={styles["img-and-text"]}>
            <Image src={WeatherImg} width={250} height={250} />
            <div className={styles["text"]}>
              <h1 className={styles["temperature"]}>{weather.main.temp}°C</h1>
              <p>Condition: {weather.weather[0].main}</p>
              <p>Feels Like: {weather.main.feels_like} °C</p>
              <p>Description: {weather.weather[0].description}</p>
              <p>Cloudiness: {weather.clouds.all}%</p>
              <p>Visibility: {weather.visibility} meters</p>
            </div>
          </div>
          <div className={styles["min-max-temperature"]}>
            <div>
              <p>Min Temperature: {weather.main.temp_min} °C</p>
              <p>
                Sunrise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Pressure: {weather.main.pressure} hPa</p>
            </div>
            <div>
              <p>Max Temperature: {weather.main.temp_max} °C</p>
              <p>
                Sunset:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </p>
              <p>Wind Direction: {weather.wind.deg} degrees</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      ) : (
        <span>Search above for weather.</span>
      )}
    </div>
  );
};

export default Weather;
