import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import RideSelector from './RideSelector';
import ChatSonicChat from './writesonic'; // Import your ChatSonic component
import './Map.css'
import Chatbot from './writesonic';

const Map = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [taxiMarker, setTaxiMarker] = useState(null);
  const [locationAccessed, setLocationAccessed] = useState(false); // Track whether location has been accessed
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const container = L.DomUtil.get('map');
      if (container != null) {
        container._leaflet_id = null;
      }

      const newMap = L.map('map', {
        center: [22.5626, 88.3630],
        zoom: 11,
        dragging: true,
        scrollWheelZoom: true,
      });

      const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; ' + mapLink + ', contribution',
        maxZoom: 18,
      }).addTo(newMap);

      setMap(newMap);
    };

    initializeMap();
  }, []);

  useEffect(() => {
    // Retrieve the current location from localStorage when the component mounts
    const storedLocation = localStorage.getItem('currentLocation');
    if (storedLocation) {
      setCurrentLocation(JSON.parse(storedLocation));
    }
  }, []);

  const handleLocationAccess = () => {
    if (!map) return;
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
  
        const currentLatLng = L.latLng(latitude, longitude);
        localStorage.setItem('currentLocation', JSON.stringify(currentLatLng));
  
        setPickup('Current Location');
        setLocationAccessed(true);
        setCurrentLocation(currentLatLng); // Update the current location state
  
        if (dropoff.trim() !== '') {
          calculateRoute(currentLatLng);
        }
  
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
  };
  
  
  
  const calculateRoute = (pickupLatLng) => {
    const geocoder = L.Control.Geocoder.nominatim();

    geocoder.geocode(dropoff, (dropoffResults) => {
      if (dropoffResults && dropoffResults.length > 0) {
        const dropoffLatLng = dropoffResults[0].center;

        const newRoutingControl = L.Routing.control({
          waypoints: [
            pickupLatLng,
            L.latLng(dropoffLatLng.lat, dropoffLatLng.lng)
          ]
        }).addTo(map);

        newRoutingControl.on('routesfound', (e) => {
          const routes = e.routes;
          const distance = routes[0].summary.totalDistance / 1000; // Convert distance to kilometers
          setDistance(distance.toFixed(2)); // Set distance with 2 decimal places

          const pickupIcon = L.icon({
            iconUrl: 'https://vectorified.com/images/google-maps-marker-icon-38.png',
            iconSize: [50, 50]
          });

          const dropoffIcon = L.icon({
            iconUrl: 'https://icons-for-free.com/download-icon-marker-131994967950423839_512.png',
            iconSize: [50, 50]
          });

          const taxiIcon = L.icon({
            iconUrl: 'https://cdn4.iconfinder.com/data/icons/transport-and-vehicles-filled-outline/64/ambulance-512.png',
            iconSize: [70, 70]
          });

          const pickupMarker = L.marker(pickupLatLng, { icon: pickupIcon }).addTo(map);
          const dropoffMarker = L.marker(dropoffLatLng, { icon: dropoffIcon }).addTo(map);
          const taxiMarker = L.marker(pickupLatLng, { icon: taxiIcon }).addTo(map);

          setPickupMarker(pickupMarker);
          setDropoffMarker(dropoffMarker);
          setTaxiMarker(taxiMarker);

          const coordinates = e.routes[0].coordinates;
          const totalSteps = coordinates.length;

          let step = 0;
          const animateMarker = () => {
            if (step === totalSteps) return;

            const coord = coordinates[step];
            const latLng = L.latLng(coord.lat, coord.lng);

            taxiMarker.setLatLng(latLng);

            step++;
            setTimeout(animateMarker, 100); // Adjust the delay here for smoother animation
          };

          animateMarker();
        });

        // Remove previous routing control, if it exists
        if (routingControl) {
          map.removeControl(routingControl);
        }
        setRoutingControl(newRoutingControl);
      }
    });
  };
  
  const handleSearch = () => {
    if (!pickup || !dropoff || !map) return;
    if (pickup === 'Current Location') {
      handleLocationAccess();
    } else {
      const geocoder = L.Control.Geocoder.nominatim();
      geocoder.geocode(pickup, (pickupResults) => {
        if (pickupResults && pickupResults.length > 0) {
          const pickupLatLng = pickupResults[0].center;
          calculateRoute(pickupLatLng);
        }
      });
    }
  };

  
  
  return (
    <div className="background">
    <div id="map" className="map"></div>
    <div className="distance">
      <h3>Distance Traveled:</h3>
      <h4>{distance} km</h4>
    </div>
    <div className="input-container">
      <input
        type="text"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        placeholder="Enter pickup location or use Location Access"
        className="input-field"
      />
      <br />
      <input
        type="text"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
        placeholder="Enter drop-off location"
        className="input-field"
      />
      <br />
      <button onClick={handleLocationAccess} className="button">
        Location Access
      </button>

      {locationAccessed && (
        <p className="location-message">Location has been accessed!</p>
      )}
      <br />
      <button onClick={handleSearch} className="button">
        Search
      </button>
      <br />
{/* 
      <div>
        <Chatbot />
      </div> */}
    </div>
    <RideSelector distance={distance} />
  </div>
  );
};

export default Map;
