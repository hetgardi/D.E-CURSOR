import React, { useState, useEffect } from 'react';
import './BusTracker.css';

const BusTracker = () => {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [currentView, setCurrentView] = useState('home');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AMTS routes from GTU
  const routes = [
    {
      name: "Route 1: GTU to ISKCON Temple",
      number: "101",
      stops: [
        { name: "GTU Bus Stop", arrival: "06:00", departure: "06:05" },
        { name: "S.G. Highway", arrival: "06:20", departure: "06:25" },
        { name: "Prahladnagar", arrival: "06:40", departure: "06:45" },
        { name: "ISKCON Temple", arrival: "07:00", departure: "07:05" }
      ],
      schedule: {
        firstBus: "06:00",
        lastBus: "22:00",
        frequency: "15 minutes",
        timings: [
          "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45",
          "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45",
          "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
          "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
          "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
          "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
          "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
          "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45",
          "22:00"
        ]
      },
      fare: {
        "GTU to S.G. Highway": "₹10",
        "S.G. Highway to Prahladnagar": "₹15",
        "Prahladnagar to ISKCON": "₹20",
        "Full Route": "₹30"
      }
    },
    {
      name: "Route 2: GTU to Science City",
      number: "102",
      stops: [
        { name: "GTU Bus Stop", arrival: "06:30", departure: "06:35" },
        { name: "Sola Road", arrival: "06:50", departure: "06:55" },
        { name: "Science City", arrival: "07:10", departure: "07:15" }
      ],
      schedule: {
        firstBus: "06:30",
        lastBus: "21:30",
        frequency: "20 minutes",
        timings: [
          "06:30", "06:50", "07:10", "07:30", "07:50", "08:10", "08:30", "08:50",
          "09:10", "09:30", "09:50", "10:10", "10:30", "10:50", "11:10", "11:30",
          "11:50", "12:10", "12:30", "12:50", "13:10", "13:30", "13:50", "14:10",
          "14:30", "14:50", "15:10", "15:30", "15:50", "16:10", "16:30", "16:50",
          "17:10", "17:30", "17:50", "18:10", "18:30", "18:50", "19:10", "19:30",
          "19:50", "20:10", "20:30", "20:50", "21:10", "21:30"
        ]
      },
      fare: {
        "GTU to Sola Road": "₹10",
        "Sola Road to Science City": "₹15",
        "Full Route": "₹20"
      }
    },
    {
      name: "Route 3: GTU to Law Garden",
      number: "103",
      stops: [
        { name: "GTU Bus Stop", arrival: "07:00", departure: "07:05" },
        { name: "Vastrapur", arrival: "07:25", departure: "07:30" },
        { name: "Law Garden", arrival: "07:50", departure: "07:55" }
      ],
      schedule: {
        firstBus: "07:00",
        lastBus: "21:00",
        frequency: "25 minutes",
        timings: [
          "07:00", "07:25", "07:50", "08:15", "08:40", "09:05", "09:30", "09:55",
          "10:20", "10:45", "11:10", "11:35", "12:00", "12:25", "12:50", "13:15",
          "13:40", "14:05", "14:30", "14:55", "15:20", "15:45", "16:10", "16:35",
          "17:00", "17:25", "17:50", "18:15", "18:40", "19:05", "19:30", "19:55",
          "20:20", "20:45", "21:00"
        ]
      },
      fare: {
        "GTU to Vastrapur": "₹10",
        "Vastrapur to Law Garden": "₹15",
        "Full Route": "₹20"
      }
    }
  ];

  const getNextBusTime = (route) => {
    if (!route || !route.schedule || !route.schedule.timings) return '';
    const nextBus = route.schedule.timings.find(time => time > currentTime);
    return nextBus || route.schedule.timings[0];
  };

  const currentRoute = routes[selectedRoute];

  const renderHomeView = () => (
    <div className="route-details">
      <div className="route-header">
        <h2>{currentRoute.number} - {currentRoute.name}</h2>
        <div className="schedule-info">
          <p>First Bus: {currentRoute.schedule.firstBus}</p>
          <p>Last Bus: {currentRoute.schedule.lastBus}</p>
          <p>Frequency: Every {currentRoute.schedule.frequency}</p>
          <p>Next Bus: {getNextBusTime(currentRoute)}</p>
        </div>
      </div>

      <div className="stops-timeline">
        <h3>Stops and Timings</h3>
        <div className="timeline">
          {currentRoute.stops.map((stop, index) => (
            <div key={index} className="timeline-item">
              <div className="stop-info">
                <h4>{stop.name}</h4>
                <p>Arrival: {stop.arrival}</p>
                <p>Departure: {stop.departure}</p>
              </div>
              {index < currentRoute.stops.length - 1 && (
                <div className="timeline-connector">
                  <div className="travel-time">
                    {Math.abs(
                      parseInt(stop.departure.split(':')[0]) * 60 + 
                      parseInt(stop.departure.split(':')[1]) -
                      (parseInt(currentRoute.stops[index + 1].arrival.split(':')[0]) * 60 + 
                       parseInt(currentRoute.stops[index + 1].arrival.split(':')[1]))
                    )} minutes
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoutesView = () => (
    <div className="route-details">
      <h2>Available Routes</h2>
      <div className="routes-grid">
        {routes.map((route, index) => (
          <div key={index} className="route-card" onClick={() => setSelectedRoute(index)}>
            <h3>{route.number} - {route.name}</h3>
            <p>First Bus: {route.schedule.firstBus}</p>
            <p>Last Bus: {route.schedule.lastBus}</p>
            <p>Frequency: {route.schedule.frequency}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleView = () => (
    <div className="route-details">
      <h2>Bus Schedule</h2>
      <div className="schedule-table">
        <div className="schedule-header">
          <span>Time</span>
          <span>Route</span>
          <span>From</span>
          <span>To</span>
        </div>
        {routes.map((route, index) => (
          route.schedule.timings.map((time, timeIndex) => (
            <div key={`${index}-${timeIndex}`} className="schedule-row">
              <span>{time}</span>
              <span>{route.number}</span>
              <span>{route.stops[0].name}</span>
              <span>{route.stops[route.stops.length - 1].name}</span>
            </div>
          ))
        ))}
      </div>
    </div>
  );

  const renderFaresView = () => (
    <div className="route-details">
      <h2>Fare Details</h2>
      <div className="fare-table">
        {routes.map((route, index) => (
          <div key={index} className="fare-section">
            <h3>{route.number} - {route.name}</h3>
            {Object.entries(route.fare).map(([segment, amount], fareIndex) => (
              <div key={fareIndex} className="fare-row">
                <span className="route-name">{segment}</span>
                <span className="fare-amount">{amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactView = () => (
    <div className="route-details">
      <h2>Contact Information</h2>
      <div className="contact-info">
        <div className="contact-card">
          <h3>AMTS Head Office</h3>
          <p>Address: AMTS Head Office, Lal Darwaja, Ahmedabad</p>
          <p>Phone: +91 79 2539 1234</p>
          <p>Email: info@amts.co.in</p>
        </div>
        <div className="contact-card">
          <h3>Customer Care</h3>
          <p>Phone: 1800 123 4567</p>
          <p>Email: support@amts.co.in</p>
          <p>Timings: 8:00 AM - 8:00 PM</p>
        </div>
        <div className="contact-card">
          <h3>GTU Bus Stop</h3>
          <p>Address: Gujarat Technological University, Chandkheda</p>
          <p>Phone: +91 79 2326 7521</p>
          <p>Timings: 6:00 AM - 10:00 PM</p>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return renderHomeView();
      case 'routes':
        return renderRoutesView();
      case 'schedule':
        return renderScheduleView();
      case 'fares':
        return renderFaresView();
      case 'contact':
        return renderContactView();
      default:
        return renderHomeView();
    }
  };

  return (
    <div className="bus-tracker-container">
      <nav className="navbar">
        <div className="nav-brand">AMTS Bus Tracker</div>
        <div className="nav-links">
          <button 
            className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button 
            className={`nav-button ${currentView === 'routes' ? 'active' : ''}`}
            onClick={() => setCurrentView('routes')}
          >
            Routes
          </button>
          <button 
            className={`nav-button ${currentView === 'schedule' ? 'active' : ''}`}
            onClick={() => setCurrentView('schedule')}
          >
            Schedule
          </button>
          <button 
            className={`nav-button ${currentView === 'fares' ? 'active' : ''}`}
            onClick={() => setCurrentView('fares')}
          >
            Fares
          </button>
          <button 
            className={`nav-button ${currentView === 'contact' ? 'active' : ''}`}
            onClick={() => setCurrentView('contact')}
          >
            Contact
          </button>
        </div>
      </nav>

      {currentView === 'home' && (
        <div className="route-selector">
          <select 
            value={selectedRoute} 
            onChange={(e) => setSelectedRoute(Number(e.target.value))}
            className="form-select"
          >
            {routes.map((route, index) => (
              <option key={index} value={index}>
                {route.number} - {route.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {renderCurrentView()}

      <div className="future-features">
        <h3>Coming Soon</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Live Tracking</h4>
            <p>Real-time bus location tracking</p>
          </div>
          <div className="feature-card">
            <h4>Digital Tickets</h4>
            <p>Book and pay for tickets online</p>
          </div>
          <div className="feature-card">
            <h4>Route Alerts</h4>
            <p>Get notified about delays and changes</p>
          </div>
          <div className="feature-card">
            <h4>Smart Cards</h4>
            <p>Use smart cards for easy payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTracker; 