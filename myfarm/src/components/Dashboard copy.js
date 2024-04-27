import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import maplibregl from 'maplibre-gl';

function Dashboard() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map-panel',
      style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=Otbh9YhFMbwux7HyoffB',
      center: [77.08482552155341,   28.5565735471228], // Center coordinates [longitude, latitude]
      zoom: 12, // Initial zoom level
    });

    // Add WMS layer
    map.on('load', () => {
      map.addLayer({
        'id': 'wms-layer',
        'type': 'raster',
        'source': {
          'type': 'raster',
          'tiles': ['http://localhost:8080/geoserver/Surma/wms?service=WMS&version=1.1.0&request=GetMap&layers=Surma%3Apublic&bbox={bbox-epsg-3857}&transparent=true&width=256&height=256&srs=EPSG%3A3857&format=image/png'],
          'tileSize': 256
        },
        'paint': {}
      });
    });

    // Add any additional map configurations or layers here

    setMap(map);

    // Cleanup function to remove map on unmount
    return () => map.remove();
  }, []);

  const [selectClicked, setSelectClicked] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState([]);

  const handleSelectClick = () => {
    setSelectClicked(true);
  };

  const handleLayerChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedLayers([...selectedLayers, value]);
    } else {
      setSelectedLayers(selectedLayers.filter(layer => layer !== value));
    }
  };

  const handleMapClick = (e) => {
    console.log(e)
    if (map) {
      const coordinates = map.unproject([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
      const point = { lng: coordinates.lng, lat: coordinates.lat };
      console.log(point)

      fetchFeatureInfo(point, e);
    }
  };
  
  function fetchFeatureInfo(point, e) {
    const url = formatFeatureInfoUrl(point, e); // Construct URL using dynamic values
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the retrieved feature information (e.g., display in a popup, console log)
        console.log(data); // Example: log features to console
      })
      .catch(error => {
        console.error("Error fetching feature information:", error);
      });
  }
  
  function formatFeatureInfoUrl(point, e) {
    // Assuming map is available in the scope
    if (map) {
        const lngLatBounds = map.getBounds();
        console.log(e)

        // Format the bounding box coordinates directly in EPSG:4326
        const bbox = `${lngLatBounds._sw.lng},${lngLatBounds._sw.lat},${lngLatBounds._ne.lng},${lngLatBounds._ne.lat}`;
       
        const {pageX, pageY} = e
        const {screenX, screenY} = e
        console.log("screens")
        console.log(screenX)
        console.log(screenY)
         
         console.log("pages")
         console.log(pageX)
         console.log(pageY)
         console.log("clients")
         
        const layers = 'Surma:public'; // Your layer name
        const url = `http://localhost:8080/geoserver/Surma/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=${layers}&STYLES&LAYERS=${layers}&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=${bbox}`;

        return url;
    }
}

  return (
    <div className='dashboard'>
      <div className='layer-panel'>
        <div className='aerodrome'>
          <h5>Aerodrome *</h5>
          <select className={selectClicked ? 'select-box clicked' : 'select-box'} onClick={handleSelectClick}>
            <option>Mumbai</option>
            <option>New Delhi</option>
          </select>
        </div>
        <div className='layers'>
          <h5>Layers *</h5>
          <div className="scrollable-panel">
            <label className="layer-option">
              <input type="checkbox" name="layer" value="DSM" onChange={handleLayerChange} />
              <span className="radio-custom"></span> DSM
            </label>
            <label className="layer-option">
              <input type="checkbox" name="layer" value="Satellite Image" onChange={handleLayerChange} />
              <span className="radio-custom"></span> Satellite Image
            </label>
            <label className="layer-option">
              <input type="checkbox" name="layer" value="Obstacles" onChange={handleLayerChange} />
              <span className="radio-custom"></span> Obstacles
            </label>
          </div>
        </div>
      </div>
      <div id='map-panel' className='map-panel' onClick={handleMapClick}></div>
    </div>
  );
}

export default Dashboard;
