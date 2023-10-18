import PropTypes from "prop-types";
import { useState } from "react";
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
  1: "../../../assets/weather-icons/1.png",
  2: "../../../assets/weather-icons/1.png",
  3: "../../../assets/weather-icons/3.png",
  4: "../../../assets/weather-icons/4.png",
  5: "../../../assets/weather-icons/5.png",
  6: "../../../assets/weather-icons/6.png",
  7: "../../../assets/weather-icons/7.png",
  8: "../../../assets/weather-icons/8.png",
  9: "../../../assets/weather-icons/9.png",
  10: "../../../assets/weather-icons/10.png",
  11: "../../../assets/weather-icons/11.png",
  12: "../../../assets/weather-icons/12.png",
  13: "../../../assets/weather-icons/13.png",
  14: "../../../assets/weather-icons/7.png",
  15: "../../../assets/weather-icons/10.png",
  16: "../../../assets/weather-icons/16.png",
  17: "../../../assets/weather-icons/17.png",
};

const Forecast = ({ forecastData }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getUTCDay();
    return daysOfWeek[dayOfWeekIndex];
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;
    return `${month}/${day}`;
  };

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const positiveDegrees = (degrees + 360) % 360;
    const index = Math.round(positiveDegrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="col-12 col-lg-8 d-flex">
      <div className="col-12">
        <p className="ms-2">7-Day Forecast</p>
        {forecastData && (
          <div className="forecast-card-container d-flex justify-content-between text-center">
            {forecastData.data_day.time.map((timeEntry, index) => (
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
                {forecastData.data_day.pictocode[index] && (
                  <img
                    className="forecast-icon py-3"
                    src={weatherIcons[forecastData.data_day.pictocode[index]]}
                    alt="Weather Icon"
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
  forecastData: PropTypes.object,
};

export default Forecast;
