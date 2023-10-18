import { useState, useEffect, useCallback } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Forecast from "../../components/Forecast/Forecast";
import MeteoblueMap from "../../components/MeteoblueMap/MeteoblueMap";
import Precipitation from "../../components/Precipitation/Precipitation";
import Cities from "../../components/Cities/Cities";
import "./App.css";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

export default function App() {
  const [forecastData, setForecastData] = useState(null);
  const [latitude, setLatitude] = useState(29.62);
  const [longitude, setLongitude] = useState(-95.635);
  const [location, setLocation] = useState({
    city: "Sugar Land",
    state: "Texas",
    country: "United States",
  });
  const [showDefaultCities, setShowDefaultCities] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://my.meteoblue.com/packages/basic-1h_basic-day?lat=${latitude}&lon=${longitude}&temperature=F&precipitationamount=inch&forecast_days=7&apikey=${apiKey}`
      );
      const data = await response.json();
      setForecastData(data);
      // console.log("Forecast Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://www.meteoblue.com/en/server/search/query3?query=${query}&apikey=${apiKey}`
      );
      const data = await response.json();
      console.log("Search Data:", data);

      if (data.results && data.results[0]) {
        setLocation({
          city: data.results[0].name,
          state: data.results[0].admin1,
          country: data.results[0].country,
        });
        setLatitude(data.results[0].lat);
        setLongitude(data.results[0].lon);
        setShowDefaultCities(false); // Hide default cities after searching
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  // Default cities data
  const defaultCities = [
    { name: "Houston" },
    { name: "Dallas" },
    { name: "Austin" },
    { name: "San Antonio" },
  ];

  return (
    <div className="App container-fluid vh-100 p-4 m-0 text-white">
      <TopBar handleSearch={handleSearch} location={location} />
      <div className="forecast-precipitation row col-12">
        <Forecast forecastData={forecastData} latitude={latitude} longitude={longitude} apiKey={apiKey} />
        <Precipitation forecastData={forecastData} />
      </div>
      <div className="map-cities row col-12">
        <MeteoblueMap
          latitude={latitude}
          longitude={longitude}
          apiKey={apiKey}
        />
        <Cities forecastData={forecastData} latitude={latitude} longitude={longitude} defaultCities={defaultCities} showDefaultCities={showDefaultCities} />
      </div>
    </div>
  );
}
