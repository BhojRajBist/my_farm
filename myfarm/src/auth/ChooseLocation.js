import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const ChooseLocation = ({ setLocation }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const marker = new L.Marker([0, 0], {
      draggable: true,
    }).addTo(map);

    marker.on("dragend", () => {
      setLocation(marker.getLatLng());
    });

    return () => {
      map.removeLayer(marker);
    };
  }, [map, setLocation]);

  useEffect(() => {
    if (!map) return;

    const bounds = L.latLngBounds([
      [90, 180],
      [-90, -180],
    ]);

    map.fitBounds(bounds);
  }, [map]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      style={{ height: "400px" }}
      whenCreated={setMap}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default ChooseLocation;