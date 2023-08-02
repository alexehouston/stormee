import PropTypes from "prop-types";
import "./Precipitation.css";

export default function Precipitation({ forecastData }) {
  if (
    !forecastData ||
    !forecastData.data_day ||
    !forecastData.data_day.precipitation_probability
  ) {
    return null;
  }

  const precipitationData = forecastData.data_day.precipitation_probability;
  const dates = forecastData.data_day.time;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const maxPrecipitation = Math.max(...precipitationData);

  return (
    <div className="Precipitation col-4 ps-5 pe-2">
      <p>Precipitation</p>
      <div className="chart-container pt-5">
        {precipitationData.map((value, index) => (
          <div
            key={index}
            className="bar rounded-pill position-relative"
            style={{ height: `${(value / maxPrecipitation) * 100}%` }}
          >
            <p className="inches text-center position-absolute py-1 px-2 rounded-pill fw-bold">{value}%</p>
          </div>
        ))}
      </div>
      <div className="labels">
        {dates.map((date, index) => {
          const utcDate = new Date(
            Date.UTC(
              new Date(date).getUTCFullYear(),
              new Date(date).getUTCMonth(),
              new Date(date).getUTCDate()
            )
          );
          const dayIndex = utcDate.getUTCDay();
          return (
            <div key={index} className="day-label">
              {days[dayIndex]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Precipitation.propTypes = {
  forecastData: PropTypes.shape({
    data_day: PropTypes.shape({
      precipitation_probability: PropTypes.arrayOf(PropTypes.number),
      time: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};
