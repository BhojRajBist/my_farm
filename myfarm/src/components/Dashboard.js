// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { NavigationControl, ScaleControl, FullscreenControl  } from 'maplibre-gl';

// import delhiData from '../wmslayers/delhi.json';
// import mumbaiData from '../wmslayers/mumbai.json';

// function Dashboard() {
//   const [map, setMap] = useState(null);
//   const [selectedLayers, setSelectedLayers] = useState([]);
//   const [selectedAerodrome, setSelectedAerodrome] = useState(null);
//   const location = useLocation(); // Access location object
  
//   useEffect(() => {
//     const aerodrome = location.state?.selectedAerodrome || 'New Delhi';
//     const aerodromeData = aerodrome === 'New Delhi' ? delhiData : mumbaiData;
//     if(!map){
//     const initializedmap = new maplibregl.Map({
//       container: 'map-panel',
//       style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=Otbh9YhFMbwux7HyoffB',
//       center: aerodromeData.center,
//       zoom: 12,
//     });
//     console.log("hello")

//     initializedmap.addControl(new ScaleControl(), 'bottom-left');
//     initializedmap.addControl(new NavigationControl(), 'top-right');
//     initializedmap.addControl(new FullscreenControl(), 'bottom-right'); // Add FullscreenControl
    
//     setMap( initializedmap);
//   }
//     setSelectedAerodrome(aerodrome);
//     setSelectedLayers(aerodromeData.wmslayers);

  
//   }, [location.state, map]);

//   const handleSelectClick = (e) => {
//     const value = e.target.value;
//     const aerodromeData = value === 'New Delhi' ? delhiData : mumbaiData;
//     const coordinates = aerodromeData.center;

//     setSelectedAerodrome(value);
//     setSelectedLayers(aerodromeData.wmslayers);

//     if (map) {
//       map.setCenter(coordinates);
//     }
//   };

//   const handleMapClick = (e) => {
//     // Your existing map click handling code
//   };

//   const handleLayerChange = (e) => {
//     const value = e.target.value;
//     if (e.target.checked) {
//       addWmsLayer(value);
//     } else {
//       removeWmsLayer(value);
//     }
//   };

//   const addWmsLayer = (layer) => {
//     const [aerodrome] = layer.split(':'); // Splitting the layer value at the colon
//     map.addLayer({
//       'id': `${layer}`,
//       'type': 'raster',
//       'source': {
//         'type': 'raster',
//         'tiles': [`http://localhost:8080/geoserver/${aerodrome}/wms?service=WMS&version=1.1.0&request=GetMap&layers=${layer}&bbox={bbox-epsg-3857}&transparent=true&width=256&height=256&srs=EPSG%3A3857&format=image/png`],
//         'tileSize': 256
//       },
//       'paint': {}
//     });
//   };

//   const removeWmsLayer = (layer) => {
//     map.removeLayer(`${layer}`);
//   };

//   return (
//     <div className='dashboard'>
//       <div className='layer-panel'>
//         <div className='aerodrome'>
//           <h5>Aerodrome *</h5>
//           <select className='select-box' value={selectedAerodrome} onChange={handleSelectClick}>
//             <option>New Delhi</option>
//             <option>Mumbai</option>
//           </select>
//         </div>
//         <div className='layers'>
//           <h5>Layers *</h5>
//           <div className="scrollable-panel">
//             {selectedLayers.map((layer, index) => (
//               <label key={index} className="layer-option">
//                 <input type="checkbox" name="layer" value={layer} onChange={handleLayerChange} />
//                 <span className="radio-custom"></span> {layer}
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div id='map-panel' className='map-panel' onClick={handleMapClick}></div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import FarmerProduct from './FarmerProduct'
// import 'leaflet/dist/leaflet.css';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     // Your initialization logic for the map (if needed) goes here
//   }, []);

//   const handleMapClick = (e) => {
//     // Your existing map click handling code
//   };

//   const handleMarkerClick = (event, data) => {
//     if (map) {
//       map.flyTo(event.latlng, 13); // Fly to the marker location with a specific zoom level
//     }
//   };

//   const renderPopupContent = (data) => {
//     return (
//       <div>
//         <img src={data.image} alt={data.title} style={{ maxWidth: '100%', height: 'auto' }} />
//         <h3>{data.title}</h3>
//         <p>Farm: {data.farmName}</p>
//         <p>Quantity: {data.quantity}</p>
//         <p>Price: {data.price}</p>
//       </div>
//     );
//   };

//   const createMarker = (data) => {
//     const customIcon = new L.Icon({
//       iconUrl: '/path/to/custom-marker-icon.png', // Replace with the path to your custom marker icon
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       shadowSize: [41, 41],
//     });

//     return (
//       <Marker
//         key={data.id}
//         position={[data.lat, data.lng]}
//         icon={customIcon}
//         eventHandlers={{ click: (event) => handleMarkerClick(event, data) }}
//       >
//         <Popup>{renderPopupContent(data)}</Popup>
//       </Marker>
//     );
//   };

//   const markerData = [
//     {
//       id: 1,
//       lat: 28.2096,
//       lng: 83.9856,
//       image: '/path/to/image1.jpg',
//       title: 'Tomato',
//       farmName: 'Example Farm 1',
//       quantity: '10 kg',
//       price: '$2.50',
//     },
//     // Add more marker data as needed
//   ];

//   return (

   
//     <div className="dashboard">
//       <div className='layer-panel'>
//         <FarmerProduct/>
//       </div>
      
      
//       <div id='map-panel' className='map-panel' onClick={handleMapClick}>
//         <MapContainer
//           center={[28.2096, 83.9856]}
//           zoom={13}
//           style={{ height: '100%', width: '100%' }}
//           onClick={handleMapClick}
//           whenCreated={setMap}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {markerData.map((marker) => createMarker(marker))}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine';
// import 'leaflet-control-geocoder';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [map, setMap] = useState(null);
//   const [routingControl, setRoutingControl] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [showRoutingOptions, setShowRoutingOptions] = useState(false);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setUserLocation([position.coords.latitude, position.coords.longitude]);
//       });
//     }
//   }, []);

//   const handleMapClick = (e) => {
//     if (!showRoutingOptions) {
//       // Your existing map click handling code
//     }
//   };

//   const handleGetDirections = (data) => {
//     if (!userLocation) {
//       console.error('User location not available.');
//       return;
//     }

//     setRoutingControl(
//       L.Routing.control({
//         waypoints: [
//           L.latLng(userLocation[0], userLocation[1]), // User location
//           L.latLng(data.lat, data.lng), // Product location
//         ],
//         routeWhileDragging: true,
//       }).addTo(map)
//     );

//     setShowRoutingOptions(true);
//   };

//   const handleRoutingOption = (mode) => {
//     if (routingControl) {
//       routingControl.getRouter().options.routingOptions = {
//         profile: mode,
//       };
//       routingControl.route();
//     }
//   };

//   const renderPopupContent = (data) => {
//     return (
//       <div>
//         <img src={data.image} alt={data.title} style={{ maxWidth: '100%', height: 'auto' }} />
//         <h3>{data.title}</h3>
//         <p>Farm: {data.farmName}</p>
//         <p>Quantity: {data.quantity}</p>
//         <p>Price: {data.price}</p>
//         <button onClick={() => handleGetDirections(data)}>Get Directions</button>
//       </div>
//     );
//   };

//   const createMarker = (data) => {
//     const customIcon = new L.Icon({
//       iconUrl: '/path/to/custom-marker-icon.png', // Replace with the path to your custom marker icon
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       shadowSize: [41, 41],
//     });

//     return (
//       <Marker
//         key={data.id}
//         position={[data.lat, data.lng]}
//         icon={customIcon}
//       >
//         <Popup>{renderPopupContent(data)}</Popup>
//       </Marker>
//     );
//   };

//   const markerData = [
//     {
//       id: 1,
//       lat: 28.2096,
//       lng: 83.9856,
//       image: '/path/to/image1.jpg',
//       title: 'Tomato',
//       farmName: 'Example Farm 1',
//       quantity: '10 kg',
//       price: '$2.50',
//     },
//     // Add more marker data as needed
//   ];

//   return (
//     <div className="dashboard">
//       <div id="map-panel" className="map-panel" onClick={handleMapClick}>
//         <MapContainer
//           center={[28.2096, 83.9856]}
//           zoom={13}
//           style={{ height: '100%', width: '100%' }}
//           onClick={handleMapClick}
//           whenCreated={setMap}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           {markerData.map((marker) => createMarker(marker))}
//         </MapContainer>
//       </div>

//       {showRoutingOptions && (
//         <div className="routing-options">
//           <button onClick={() => handleRoutingOption('car')}>Car</button>
//           <button onClick={() => handleRoutingOption('bike')}>Bike</button>
//           <button onClick={() => handleRoutingOption('walk')}>Walk</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';
import Navigate from './Navigate';
import FarmerProduct from './FarmerProduct';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';
import cab from '../images/cauli.jpg'

const Dashboard = () => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // Your initialization logic for the map (if needed) goes here
  }, []);

  const handleMapClick = (e) => {
    // Your existing map click handling code
  };

  const handleMarkerClick = (event, data) => {
    if (map) {
      map.flyTo(event.latlng, 13);
      setSelectedMarker(data);
    }
  };

  const renderPopupContent = (data) => {
    return (
      <div>
        <img src={data.image} alt={data.title} style={{ maxWidth: '100%', height: 'auto' }} />
        <h3>{data.title}</h3>
        <p>Farm: {data.farmName}</p>
        <p>Quantity: {data.quantity}</p>
        <p>Price: {data.price}</p>
        {selectedMarker && (
          <Navigate data={selectedMarker} map={map} />
        )}
      </div>
    );
  };

  const createMarker = (data) => {
    const customIcon = new L.Icon({
      iconUrl: '/path/to/custom-marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    return (
      <Marker
        key={data.id}
        position={[data.lat, data.lng]}
        icon={customIcon}
        eventHandlers={{ click: (event) => handleMarkerClick(event, data) }}
      >
        <Popup>{renderPopupContent(data)}</Popup>
      </Marker>
    );
  };

  const markerData = [
    {
      id: 1,
      lat: 28.2096,
      lng: 83.9856,
      image: cab,
      title: 'Cauli',
      farmName: 'Example Farm 1',
      quantity: '10 kg',
      price: '$2.50',
    },
    // Add more marker data as needed
  ];

  return (
    <div className="dashboard">
      <div className="layer-panel">
        <FarmerProduct />
      </div>
      <div id="map-panel" className="map-panel" onClick={handleMapClick}>
        <MapContainer
          center={[28.2096, 83.9856]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          onClick={handleMapClick}
          whenCreated={setMap}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Maps">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          {markerData.map((marker) => createMarker(marker))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
