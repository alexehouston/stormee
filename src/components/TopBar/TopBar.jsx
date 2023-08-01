import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";

export default function TopBar({ handleSearch, location }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="TopBar col-12 d-flex justify-content-between align-items-center mb-5">
      <div className="d-flex align-items-center col-1 col-lg-3">
        <a href="/">
          <img src="/assets/favicon.ico" alt="icon" width="50" />
        </a>
        <div className="ps-5">
          <FontAwesomeIcon className="text-lavender" icon={faLocationDot} />
          <span className="ps-2">{location.city}, {location.country}</span>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <form onSubmit={handleSubmit}>
          <input
            className="search-bar rounded-pill text-white px-3 py-1 ms-2"
            type="text"
            placeholder="Enter location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="col-1 col-lg-3">
        <img
          className="rounded-pill float-end"
          src="/assets/poro.png"
          width="50"
          alt="cloud"
        />
      </div>
    </div>
  );
}

TopBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
