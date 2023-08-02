import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./Cities.css";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

export default function Cities({ latitude, longitude, defaultCities, showDefaultCities }) {
  const [nearbyCities, setNearbyCities] = useState([]);

  useEffect(() => {
    const fetchNearbyCities = async () => {
      try {
        const queryParam = `${latitude.toFixed(4)} ${longitude.toFixed(4)}`;
        const response = await fetch(
          `https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(queryParam)}&apikey=${apiKey}`
        );
        const data = await response.json();
        setNearbyCities(data.results);
        console.log("Nearby Cities:", data.results);
      } catch (error) {
        console.error("Error fetching nearby cities:", error);
      }
    };

    if (!showDefaultCities) {
      fetchNearbyCities();
    } else {
      setNearbyCities([]);
    }
  }, [latitude, longitude, showDefaultCities]);

  return (
    <div className="col-4 mt-5 pe-0 ps-5" style={{ height: "25rem" }}>
      <p>Nearby Areas</p>
      <div className="d-flex flex-wrap justify-content-between" style={{ height: "25rem" }}>
        {showDefaultCities && defaultCities.map((city, index) => (
          <div className="city p-3 ps-4" key={index}>
            <FontAwesomeIcon icon={faLocationDot} className="text-lavender pe-1" /> {city.name}
          </div>
        ))}
        {!showDefaultCities && nearbyCities.slice(1, 5).map((city, index) => (
          <div className="city p-3 ps-4" key={index}>
            <FontAwesomeIcon icon={faLocationDot} className="text-lavender pe-1" /> {city.name}
          </div>
        ))}
      </div>
    </div>
  );
}

Cities.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  defaultCities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  showDefaultCities: PropTypes.bool.isRequired,
};
