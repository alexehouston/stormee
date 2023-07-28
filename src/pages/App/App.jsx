import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Forecast from "../../components/Forecast/Forecast";
import "./App.css";

export default function App() {
  const [latitude, setLatitude] = useState(29.62);
  const [longitude, setLongitude] = useState(-95.635);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://www.meteoblue.com/en/server/search/query3?query=${query}&apikey=${apiKey}`
      );
      const data = await response.json();

      // Assuming the first result has the latitude and longitude you want
      if (data.results && data.results[0]) {
        setLatitude(data.results[0].lat);
        setLongitude(data.results[0].lon);
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return (
    <div className="container-fluid vh-100 p-4 m-0 text-white">
      <TopBar
        handleSearch={handleSearch}
        latitude={latitude}
        longitude={longitude}
      />
      <Forecast />
    </div>
  );
}
