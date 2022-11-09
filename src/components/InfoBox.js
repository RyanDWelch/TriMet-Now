import React from "react";
import busimage from "../images/mode-bus.png";
import maximage from "../images/mode-max.png";

const InfoBox = (props) => (
  <div className={"info-box"}>
    <div className="info-box-container">
      <h6>{props.selectedVehicleValues[9]}</h6>
      <div className="vehicle-type-image">
        <img
          src={props.selectedVehicleValues[7] == "bus" ? busimage : maximage}
        />
      </div>
      <div>
        {props.selectedVehicleValues[16] == true && (
          <span className="congestion-true">*In Congestion*</span>
        )}
      </div>
      <div>
        <span>{props.selectedVehicleKeys[21]}</span>{" "}
        {props.selectedVehicleValues[21]}
      </div>
      <div>
        <span>{props.selectedVehicleKeys[26]}</span>{" "}
        {props.selectedVehicleValues[26]}
      </div>
    </div>
  </div>
);

export default InfoBox;
