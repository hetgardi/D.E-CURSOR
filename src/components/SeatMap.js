import React, { useState, useEffect } from 'react';
import './SeatMap.css';

const SeatMap = () => {
  const [sensorSeatStatus, setSensorSeatStatus] = useState('free');
  const [loading, setLoading] = useState(true);

  // Static seats data (except seat 1)
  const staticSeats = new Array(20).fill('free');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/seat-status');
        const data = await response.json();
        setSensorSeatStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seat status:', error);
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSeatStatus = (index) => {
    // Only seat 1 (index 0) is sensor-controlled
    return index === 0 ? sensorSeatStatus : staticSeats[index];
  };

  if (loading) {
    return <div className="loading">Loading seat status...</div>;
  }

  const totalSeats = 20;
  const occupiedSeats = staticSeats.filter((_, i) => 
    i === 0 ? sensorSeatStatus === 'occupied' : false
  ).length;
  const availableSeats = totalSeats - occupiedSeats;

  return (
    <div className="seat-map-container">
      <div className="occupancy-summary">
        <h3>Bus Occupancy</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Seats</span>
            <span className="stat-value">{totalSeats}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Occupied</span>
            <span className="stat-value">{occupiedSeats}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Available</span>
            <span className="stat-value">{availableSeats}</span>
          </div>
        </div>
      </div>
      
      <div className="seat-grid">
        {staticSeats.map((_, index) => (
          <div
            key={index}
            className={`seat ${getSeatStatus(index) === 'occupied' ? 'occupied' : 'available'}`}
          >
            <span className="seat-number">{index + 1}</span>
            {index === 0 && <span className="sensor-badge">📡</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;