// import React, { useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoiYXJnaGFkaXAiLCJhIjoiY2xobHdoZmc3MTV1aTNqbnhmbDgydjU4eSJ9.dQeMUNENDkyWKH-Jwody_A';

// function MapComponent() {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     // Get user's current location
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation([longitude, latitude]);
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (userLocation) {
//       const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: userLocation,
//         zoom: 13
//       });

//     //   // Add navigation control
//     //   map.addControl(new mapboxgl.NavigationControl());

//     //   // Create a marker element
//     //   const marker = new mapboxgl.Marker()
//     //     .setLngLat(userLocation)
//     //     .addTo(map);
      
//       // Center the map on the user's location
//       map.flyTo({
//         center: userLocation,
//         zoom: 13
//       });

//       // Clean up the marker and map when component unmounts
//       return () => {
//         // marker.remove();
//         map.remove();
//       };
//     }
//   }, [userLocation]);

//   return <div id="map" style={{ height: '50vh', width:'100%' }}></div>;
// }

// export default MapComponent;



import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    if (window) {
      var container = L.DomUtil.get('map-container');
      if (container != null) {
        container._leaflet_id = null;
      }

      const map = L.map('map-container').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
      }).addTo(map);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const customIcon = L.icon({
            iconUrl: 'https://vectorified.com/images/google-maps-marker-icon-38.png',
            iconSize: [32, 32],
          });

          const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

          map.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );

      map.invalidateSize();
    }
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '55vh'}}></div>;
};

export default MapComponent;


