import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SeatMap from './components/SeatMap';
import BusTracker from './components/BusTracker';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <a className="navbar-brand" href="/">AMTS Bus Tracker</a>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={
              <div className="row">
                <div className="col-md-6">
                  <SeatMap />
                </div>
                <div className="col-md-6">
                  <BusTracker />
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer className="footer mt-5 py-3 bg-light">
          <div className="container text-center">
            <span className="text-muted">© 2024 AMTS Bus Tracking System</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 