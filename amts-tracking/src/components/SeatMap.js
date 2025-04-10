import React, { useState } from 'react';
import './SeatMap.css';

const SeatMap = () => {
  const [seats, setSeats] = useState(new Array(20).fill(false));
  const totalSeats = seats.length;
  const occupiedSeats = seats.filter(seat => seat).length;
  const availableSeats = totalSeats - occupiedSeats;
  const isBusFull = (occupiedSeats / totalSeats) >= 0.8;

  const toggleSeat = (index) => {
    const updated = [...seats];
    updated[index] = !updated[index];
    setSeats(updated);
  };

  return (
    <div className="seat-map-container">
      <div className="occupancy-summary">
        <h3>Bus Occupancy</h3>
        <p>Total Seats: {totalSeats}</p>
        <p>Occupied: {occupiedSeats}</p>
        <p>Available: {availableSeats}</p>
        {isBusFull && <div className="alert alert-warning">Bus is almost full!</div>}
      </div>
      
      <div className="seat-grid">
        {seats.map((isOccupied, index) => (
          <div
            key={index}
            className={`seat ${isOccupied ? 'occupied' : 'available'}`}
            onClick={() => toggleSeat(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap; 