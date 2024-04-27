import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';


const Navigate = ({ data, map }) => {
  const [isRouting, setIsRouting] = useState(false);

  useEffect(() => {
    if (map && isRouting) {
      const { lat, lng } = data;
      const userLocation = map.getCenter();

      const waypoints = [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(lat, lng),
      ];

      const routingControl = L.Routing.control({
        waypoints,
        routeWhileDragging: true,
      }).addTo(map);

      return () => {
        routingControl.removeFrom(map);
      };
    }
  }, [data, map, isRouting]);

  return (
    <> 
      <button onClick={() => setIsRouting(!isRouting)}>
        {isRouting ? 'Hide Route' : 'Show Route'}
      </button>
      {isRouting && <div id="route-panel" className="route-panel" />}
    </>
  );
};

export default Navigate;

