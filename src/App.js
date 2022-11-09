import React, { useState, useEffect } from "react";
import GoogleMap from "./components/GoogleMap";
import Marker from "./components/Marker";
import Stats from "./components/Stats";
import InfoBox from "./components/InfoBox";
import { mapStyles } from "./mapstyles";
import { sampledata } from "./sampledata";
import "./App.css";
// import { mapStyles } from './mapstyles-bw.js';

// const API_URL =
//   "https://developer.trimet.org/ws/v2/vehicles/appID/" +
//   process.env.REACT_APP_TRIMET_API_KEY;
//
// CURRENTLY NOT USING THE TRIMET API!!!
//

const defaultCenter = [45.519526, -122.67704];

/////////////////////////////////////
/////////// MAP FUNCTIONS ///////////
/////////////////////////////////////
// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  places.forEach((place) => {
    bounds.extend(new maps.LatLng(place.latitude, place.longitude));
  });
  return bounds;
};
// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};
// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};
/////////////////////////////////////
//////// END MAP FUNCTIONS //////////
/////////////////////////////////////

const App = () => {
  const [loaded, setIsLoaded] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleValues, setSelectedVehicleValues] = useState([]);
  const [selectedVehicleKeys, setSelectedVehicleKeys] = useState([]);

  useEffect(() => {
    setIsLoaded(true);
    setVehicles(sampledata.resultSet.vehicle);
  }, []);

  const handleClick = (vehicleID) => {
    const selectedVehicleData = vehicles.find((i) => i.vehicleID === vehicleID);
    const vehicleValues = Object.values(selectedVehicleData);
    const vehicleKeys = Object.keys(selectedVehicleData);

    setSelectedVehicleValues(vehicleValues);
    setSelectedVehicleKeys(vehicleKeys);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="container">
        <GoogleMap
          defaultZoom={12}
          defaultCenter={defaultCenter}
          options={{
            styles: mapStyles,
          }}
          yesIWantToUseGoogleMapApiInternals
          disableDefaultUI
          onGoogleApiLoaded={({ map, maps }) =>
            apiIsLoaded(map, maps, vehicles)
          }
        >
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.vehicleID}
              text={vehicle.signMessageLong}
              type={vehicle.type}
              lat={vehicle.latitude}
              lng={vehicle.longitude}
              data={vehicle}
              onClick={handleClick}
            />
          ))}
        </GoogleMap>
        <InfoBox
          selectedVehicleKeys={selectedVehicleKeys}
          selectedVehicleValues={selectedVehicleValues}
        />
        <Stats data={vehicles} />
      </div>
    );
  }
};

export default App;
