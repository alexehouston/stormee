import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";

export default function TopBar({ handleSearch }) {
  return (
    <div className="TopBar col-12 d-flex justify-content-between align-items-center mb-5">
      <div className="d-flex align-items-center col-2">
        <img
          src="https://www.gstatic.com/images/icons/material/apps/weather/2x/mostly_cloudy_night_dark_color_96dp.png"
          alt="icon"
          width="50"
        />
        <div className="ps-5">
          <FontAwesomeIcon className="text-lavender" icon={faLocationDot} />
          <span className="ps-2">Sugar Land, Texas, USA</span>
        </div>
      </div>
      <div>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="search-bar rounded-pill text-white px-3 py-1 ms-2"
          type="text"
          placeholder="Enter location"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="col-2">
        <img
          className="rounded-pill float-end"
          src="https://media.istockphoto.com/id/1262330568/vector/white-cloud-icon-smiling-face-tongue-fluffy-clouds-cute-cartoon-kawaii-cloudscape-love-card.jpg?s=612x612&w=0&k=20&c=Etu8PWriPPaGSE7FFV8mrwLEPVySq37bYBVrstj8O-s="
          width="50"
          alt="cloud"
        />
      </div>
    </div>
  );
}

TopBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
  };
