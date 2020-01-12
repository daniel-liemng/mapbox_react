import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./data/skateboard-parks.json";

import "./App.css";

function App() {
  // state
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });
  const [selectedPark, setSelectedPark] = useState(null);

  // useEffect
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);
    // clean up
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiaGxpZW0iLCJhIjoiY2s1YmdxeXFpMHg2bDNtbjNjNnZxMzV1cSJ9.kGELjIKwKDsQy5g_X1fMlA"
        mapStyle="mapbox://styles/hliem/ck5bid78b0s4a1cp263szl2ph"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="download.svg" alt="Park Icon" />
            </button>
          </Marker>
        ))}
        {/* Show Popup */}
        {selectedPark && (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => setSelectedPark(null)}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
