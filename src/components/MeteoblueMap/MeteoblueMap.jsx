/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import mapboxgl from "mapbox-gl";
import "./MeteoblueMap.css";

const apiKey = import.meta.env.VITE_METEOBLUE_API_KEY;

const inventoryUrl =
  "https://maps-api.meteoblue.com/v1/map/inventory/filter?lang=en&apikey=" +
  apiKey +
  "&maps=windAnimation,satellite,radar,cloudsAndPrecipitation,temperature,warningsAndRisk,precipitationDaily,precipitation&temperatureUnit=FAHRENHEIT&velocityUnit=MILE_PER_HOUR&lengthUnit=metric&overlays=pressure2mOverlay,graticuleOverlay";

export default function MeteoblueMap({ latitude, longitude }) {
  useEffect(() => {
    const mapboxMap = new window.mapboxgl.Map({
      container: "mapContainer",
      center: [longitude, latitude],
      zoom: 7,
      minZoom: 0,
      maxZoom: 24,
      hash: false,
      attributionControl: false,
      keyboard: false,
    });

    const loadPlugin = () => {
      if (window.meteoblueMapsPlugin) {
        new window.meteoblueMapsPlugin({
          mapboxMap: mapboxMap,
          inventory: inventoryUrl,
          apiKey: apiKey,
          canUseRestricted: true,
        });
      } else {
        setTimeout(loadPlugin, 100); // Wait and try again after 100 milliseconds
      }
    };

    if (window.mapboxgl) {
      loadPlugin();
    } else {
      window.addEventListener("mapboxgl-loaded", loadPlugin);
    }
  }, [latitude, longitude]);

  return (
    <div className="col-12 col-lg-8 mt-5 pt-md-5" style={{ height: "25rem" }}>
      <Helmet>
        <script
          src="https://static.meteoblue.com/cdn/mapbox-gl-js/v1.11.1/mapbox-gl.js"
          integrity="sha512-v5PfWsWi47/AZBVL7WMNqdbM1OMggp9Ce408yX/X9wg87Kjzb1xqpO2Ul0Oue8Vl9kKOcwPM2MWWkTbUjRxZOg=="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://static.meteoblue.com/cdn/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          integrity="sha512-xY1TAM00L9X8Su9zNuJ8nBZsGQ8IklX703iq4gWnsw6xCg+McrHXEwbBkNaWFHSqmf6e7BpxD6aJQLKAcsGSdA=="
          crossOrigin="anonymous"
        />
        <script src="https://static.meteoblue.com/lib/maps-plugin/v0.x/maps-plugin.js" />
      </Helmet>
      <div className="map-container rounded h-100 w-100" id="mapContainer" />
    </div>
  );
}

MeteoblueMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};
