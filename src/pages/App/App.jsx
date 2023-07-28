import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Forecast from "../../components/Forecast/Forecast";
import MeteoblueMap from "../../components/MeteoblueMap/MeteoblueMap";
import "./App.css";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

export default function App() {
  const [latitude, setLatitude] = useState(29.62);
  const [longitude, setLongitude] = useState(-95.635);
  const [location, setLocation] = useState({
    city: "Sugar Land",
  });

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://www.meteoblue.com/en/server/search/query3?query=${query}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        setLocation({
          city: data.results[0].name,
        });
        setLatitude(data.results[0].lat);
        setLongitude(data.results[0].lon);
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return (
    <div className="container-fluid vh-100 p-4 m-0 text-white">
      <TopBar handleSearch={handleSearch} location={location} />
      <Forecast latitude={latitude} longitude={longitude} apiKey={apiKey} />
      <MeteoblueMap latitude={latitude} longitude={longitude} apiKey={apiKey} />
    </div>
  );
}
