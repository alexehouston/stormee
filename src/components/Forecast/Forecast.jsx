import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faWind,
  faSun,
  faArrowUpLong,
  faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";
import "./Forecast.css";

const weatherIcons = {
  1: "sun",
  2: "cloud-sun",
  3: "cloud-sun",
  4: "cloud",
  5: "cloud",
  6: "cloud-rain",
  7: "cloud-showers-heavy",
  8: "cloud-bolt",
  9: "snowflake",
  10: "snowflake",
  11: "snowflake",
  12: "cloud-rain",
  13: "snowflake",
  14: "cloud-showers-heavy",
  15: "snowflake",
  16: "cloud-rain",
  17: "snowflake",
};

const Forecast = ({ latitude, longitude, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://my.meteoblue.com/packages/basic-1h_basic-day?lat=${latitude}&lon=${longitude}&temperature=F&apikey=${apiKey}`
      );
      const data = await response.json();
      setForecastData(data);
      console.log("Forecast Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [latitude, longitude, apiKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    return `${month}/${day}`;
  };

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const positiveDegrees = (degrees + 360) % 360;
    const index = Math.round(positiveDegrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="col-8 d-flex">
      <div className="col-lg-12">
        {forecastData && (
          <div className="d-flex justify-content-between text-center">
            {forecastData.data_day.time.slice(1).map((timeEntry, index) => (
              <div
                className={`forecast-card d-flex flex-column justify-content-around ${
                  index === selectedCardIndex ? "todays-forecast-card" : ""
                }`}
                key={index}
                onClick={() => setSelectedCardIndex(index)}
              >
                <div className="forecast-date fw-bold">
                  <span>{getDayOfWeek(timeEntry)}</span>
                  {index === selectedCardIndex && (
                    <span>{getFormattedDate(timeEntry)}</span>
                  )}
                </div>
                <hr />
                {forecastData.data_day.pictocode[index + 1] && (
                  <FontAwesomeIcon
                    className="forecast-icon py-3 fs-1"
                    icon={
                      weatherIcons[forecastData.data_day.pictocode[index + 1]]
                    }
                  />
                )}
                <div className="d-flex">
                  <p className="forecast-temp m-0 fs-1">
                    {Math.round(forecastData.data_day.temperature_mean[index])}°
                  </p>
                </div>
                {index === selectedCardIndex && (
                  <div className="todays-forecast-data text-start">
                    <FontAwesomeIcon icon={faArrowUpLong} />{" "}
                    {Math.round(forecastData.data_day.temperature_max[index])}°{" "}
                    <br />
                    <FontAwesomeIcon icon={faArrowDownLong} />{" "}
                    {Math.round(forecastData.data_day.temperature_min[index])}°{" "}
                    <br />
                    <FontAwesomeIcon icon={faSun} />{" "}
                    {forecastData.data_day.uvindex[index]}{" "}
                    <small>(UV Index)</small> <br />
                    Humidity:{" "}
                    {forecastData.data_day.relativehumidity_mean[index]}% <br />
                    <FontAwesomeIcon icon={faWind} />{" "}
                    {getWindDirection(
                      forecastData.data_day.winddirection[index + 1]
                    )}{" "}
                    / {Math.round(forecastData.data_day.windspeed_mean[index])}{" "}
                    mph <br />
                    <FontAwesomeIcon icon={faDroplet} />{" "}
                    {forecastData.data_day.precipitation_probability[index]}% /{" "}
                    {forecastData.data_day.precipitation[index]} in
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default Forecast;
