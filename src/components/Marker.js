import React from "react";

const Marker = (props) => {
  return (
    <div
      alt={props.text}
      key={props.vehicleID}
      className={
        props.type +
        " " +
        props.type +
        props.data.routeNumber +
        " vehicle" +
        " " +
        "marker2"
      }
      onClick={(e) => props.onClick(props.data.vehicleID)}
    >
      <div className="routeNumber">{props.data.routeNumber}</div>
      <div className="vehicle-infobox">
        <div>{props.data.signMessageLong}</div>
        <div>{props.data.vehicleID}</div>
      </div>
    </div>
  );
};

export default Marker;
