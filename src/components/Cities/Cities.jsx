import "./Cities.css";

export default function Cities() {
  return (
    <div className="col-4 mt-5 pe-0 ps-5" style={{ height: "25rem" }}>
      <p>Nearby Cities</p>
      <div className="d-flex flex-wrap justify-content-between" style={{ height: "25rem" }}>
        <div className="city"></div>
        <div className="city"></div>
        <div className="city"></div>
        <div className="city"></div>
      </div>
    </div>
  );
}
