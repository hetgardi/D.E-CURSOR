import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './BusTracker.css';

const BusTracker = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 23.0225,
    lng: 72.5714
  });

  // Dummy route points for simulation
  const routePoints = [
    { lat: 23.0225, lng: 72.5714 },
    { lat: 23.0235, lng: 72.5724 },
    { lat: 23.0245, lng: 72.5734 },
    { lat: 23.0255, lng: 72.5744 },
    { lat: 23.0265, lng: 72.5754 }
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setCurrentPosition(routePoints[currentIndex]);
      currentIndex = (currentIndex + 1) % routePoints.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: 23.0225,
    lng: 72.5714
  };

  return (
    <div className="bus-tracker-container">
      <h3>Live Bus Tracking</h3>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
        >
          <Marker
            position={currentPosition}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/bus.png",
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default BusTracker; 