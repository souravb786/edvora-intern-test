import React from "react";
import "../Styles/Ride.css";

// this component is for showing the ride details
function Ride({ item }) {
  return (
    <div className="Ride">
      {/* image of the ride */}
      <img
        className="ride__image"
        alt="ride image"
        src={item.map_url}
        style={{ objectFit: "cover", width: 296, height: 148 }}
      />
      {/* this section contains the details of the ride */}
      <section className="info__section">
        <div className="sub__info">
          <span className="state">{item.state}</span>
          <span className="city">{item.city}</span>
        </div>
        <span>
          Ride Id : <span>{item.id}</span>
        </span>
        <span>
          Origin Station : <span>{item.origin_station_code}</span>
        </span>
        <span>
          station_path : <span>{item.path}</span>
        </span>
        <span>
          Date : <span>{item.dateDisplay}</span>
        </span>
        <span>
          Distance : <span>{item.distance}</span>
        </span>
      </section>
    </div>
  );
}

export default Ride;
