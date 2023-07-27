import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

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
  17: "snowflake"

};

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://my.meteoblue.com/packages/basic-1h_basic-day?lat=47.558&lon=7.573&temperature=F&apikey=${apiKey}`
      );
      const data = await response.json();
      setForecastData(data);
      console.log("Forecast Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  return (
    <div className="container-fluid">
      {forecastData && (
        <div className="d-flex justify-content-around text-center rounded bg-light shadow-lg">
          {forecastData.data_day.time.slice(1).map((timeEntry, index) => (
            <div className="p-5" key={index}>
              <div className="fw-bold">{getDayOfWeek(timeEntry)}</div>
              <div className="fw-bold">{getFormattedDate(timeEntry)}</div>
              {forecastData.data_day.pictocode[index + 1] && (
                <FontAwesomeIcon className="py-3 fs-3"
                  icon={
                    weatherIcons[forecastData.data_day.pictocode[index + 1]]
                  }
                />
              )}
              <div className="bg-danger rounded-pill px-2 text-white fw-bold">
                {Math.round(forecastData.data_day.temperature_max[index])} °F
              </div>
              <div className="bg-warning rounded-pill px-2 mt-2 text-white fw-bold">
                {Math.round(forecastData.data_day.temperature_min[index])} °F
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
