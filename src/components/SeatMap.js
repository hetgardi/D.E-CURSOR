import React, { useState } from 'react';
import './SeatMap.css';

const SeatMap = () => {
  const [seats, setSeats] = useState(new Array(20).fill(false));
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [showPassengerForm, setShowPassengerForm] = useState(false);

  const totalSeats = seats.length;
  const occupiedSeats = seats.filter(seat => seat).length;
  const availableSeats = totalSeats - occupiedSeats;
  const isBusFull = (occupiedSeats / totalSeats) >= 0.8;

  const toggleSeat = (index) => {
    if (!seats[index]) {
      setSelectedSeat(index);
      setShowPassengerForm(true);
    } else {
      const updated = [...seats];
      updated[index] = false;
      setSeats(updated);
    }
  };

  const handlePassengerSubmit = (e) => {
    e.preventDefault();
    if (selectedSeat !== null && passengerName.trim()) {
      const updated = [...seats];
      updated[selectedSeat] = {
        occupied: true,
        passengerName: passengerName.trim()
      };
      setSeats(updated);
      setPassengerName('');
      setShowPassengerForm(false);
      setSelectedSeat(null);
    }
  };

  const getSeatStatus = (seat) => {
    if (!seat) return 'available';
    return seat.occupied ? 'occupied' : 'available';
  };

  const getSeatLabel = (seat, index) => {
    if (!seat) return index + 1;
    return seat.occupied ? seat.passengerName : index + 1;
  };

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
        {isBusFull && <div className="alert alert-warning">Bus is almost full!</div>}
      </div>
      
      <div className="seat-grid">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`seat ${getSeatStatus(seat)}`}
            onClick={() => toggleSeat(index)}
          >
            <span className="seat-number">{index + 1}</span>
            {seat && seat.occupied && (
              <span className="passenger-name">{seat.passengerName}</span>
            )}
          </div>
        ))}
      </div>

      {showPassengerForm && (
        <div className="passenger-form-overlay">
          <div className="passenger-form">
            <h4>Book Seat {selectedSeat + 1}</h4>
            <form onSubmit={handlePassengerSubmit}>
              <div className="form-group">
                <label htmlFor="passengerName">Passenger Name</label>
                <input
                  type="text"
                  id="passengerName"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="form-control"
                  placeholder="Enter passenger name"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Book Seat</button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPassengerForm(false);
                    setSelectedSeat(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap; 