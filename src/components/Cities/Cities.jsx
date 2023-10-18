import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowUpLong,
  faArrowDownLong,
  faSun,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import "./Cities.css";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

export default function Cities({
  forecastData,
  defaultCities,
  showDefaultCities,
}) {
  const [nearbyCities, setNearbyCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!showDefaultCities && forecastData) {
          const queryParam = `${forecastData.metadata.latitude.toFixed(
            4
          )} ${forecastData.metadata.longitude.toFixed(4)}`;
          const response = await fetch(
            `https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(
              queryParam
            )}&apikey=${apiKey}`
          );
          const data = await response.json();
          setNearbyCities(data.results);
          console.log("Nearby Cities:", data.results);
        } else {
          setNearbyCities([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [forecastData, showDefaultCities]);

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const positiveDegrees = (degrees + 360) % 360;
    const index = Math.round(positiveDegrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="Cities col-12 col-lg-4 mt-5 pe-0 ps-5" style={{ height: "25rem" }}>
      <p>Nearby Areas</p>
      <div
        className="d-flex flex-wrap justify-content-between"
        style={{ height: "20rem" }}
      >
        {showDefaultCities &&
          defaultCities.map((city, index) => (
            <div className="city p-3 ps-4 mb-3 mt-2" key={index}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-lavender pe-1"
              />{" "}
              <span className="position-absolute">{city.name}</span>
              {forecastData && forecastData.data_day && (
                <div className="city-weather position-relative">
                  <div className="city-temps d-flex justify-content-between align-items-center">
                    <p className="fs-1 mb-0 pe-2">
                      {Math.round(
                        forecastData.data_day.temperature_mean[index]
                      )}
                      °
                    </p>
                    <div className="d-inline">
                      <FontAwesomeIcon
                        className="text-sky-blue"
                        icon={faArrowUpLong}
                      />{" "}
                      {Math.round(forecastData.data_day.temperature_max[index])}
                      ° <br />
                      <FontAwesomeIcon
                        className="text-sky-blue"
                        icon={faArrowDownLong}
                      />{" "}
                      {Math.round(forecastData.data_day.temperature_min[index])}
                      °{" "}
                    </div>
                  </div>
                  <div className="pt-5 pe-2">
                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faDroplet}
                        />{" "}
                        {forecastData.data_day.precipitation_probability[index]}
                        % / {forecastData.data_day.precipitation[index]} in
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faSun}
                        />{" "}
                        {forecastData.data_day.uvindex[index]}{" "}
                        <small>(UV Index)</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        Humidity:{" "}
                        {forecastData.data_day.relativehumidity_mean[index]}%
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faWind}
                        />{" "}
                        {getWindDirection(
                          forecastData.data_day.winddirection[index + 1]
                        )}{" "}
                        /{" "}
                        {Math.round(
                          forecastData.data_day.windspeed_mean[index]
                        )}{" "}
                        mph
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        {!showDefaultCities &&
          nearbyCities.slice(1, 5).map((city, index) => (
            <div className="city p-3 ps-4 mb-3 mt-2" key={index}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-lavender pe-1"
              />{" "}
              <span className="position-absolute">{city.name}</span>
              {forecastData && forecastData.data_day && (
                <div className="city-weather position-relative">
                  <div className="city-temps d-flex justify-content-between align-items-center">
                    <p className="fs-1 mb-0 pe-2">
                      {Math.round(
                        forecastData.data_day.temperature_mean[index]
                      )}
                      °
                    </p>
                    <div className="d-inline">
                      <FontAwesomeIcon
                        className="text-sky-blue"
                        icon={faArrowUpLong}
                      />{" "}
                      {Math.round(forecastData.data_day.temperature_max[index])}
                      ° <br />
                      <FontAwesomeIcon
                        className="text-sky-blue"
                        icon={faArrowDownLong}
                      />{" "}
                      {Math.round(forecastData.data_day.temperature_min[index])}
                      °{" "}
                    </div>
                  </div>
                  <div className="pt-5 pe-2">
                    <div className="d-flex justify-content-between align-items-center pt-2">
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faDroplet}
                        />{" "}
                        {forecastData.data_day.precipitation_probability[index]}
                        % / {forecastData.data_day.precipitation[index]} in
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faSun}
                        />{" "}
                        {forecastData.data_day.uvindex[index]}{" "}
                        <small>(UV Index)</small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        Humidity:{" "}
                        {forecastData.data_day.relativehumidity_mean[index]}%
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className="text-sky-blue"
                          icon={faWind}
                        />{" "}
                        {getWindDirection(
                          forecastData.data_day.winddirection[index + 1]
                        )}{" "}
                        /{" "}
                        {Math.round(
                          forecastData.data_day.windspeed_mean[index]
                        )}{" "}
                        mph
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

Cities.propTypes = {
  forecastData: PropTypes.object,
  defaultCities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  showDefaultCities: PropTypes.bool.isRequired,
};
