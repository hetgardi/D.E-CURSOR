/**
 * AMTS Bus Tracker - Backend Server
 * 
 * This server handles:
 * 1. Serial communication with Arduino sensors
 * 2. REST API for seat status
 * 3. Fallback simulation mode when hardware is unavailable
 * 
 * Hardware Setup:
 * - Arduino Uno with HC-SR04 ultrasonic sensor
 * - Trig Pin: 9, Echo Pin: 10
 * - Update COM port below to match your Arduino connection
 */

const express = require('express');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;
// List available ports for debugging
SerialPort.list().then(ports => {
    console.log('Available ports:');
    ports.forEach(port => {
        console.log(` - ${port.path} (${port.manufacturer || 'Unknown manufacturer'})`);
    });
});

// Configuration: Update this COM port to match your Arduino connection
// Check Device Manager > Ports (COM & LPT) to find the correct port
const serialPath = 'COM5'; 

let sensorStatus = 'free';
let sp = null;
let parser = null;

const serialPortConfig = {
    path: serialPath,
    baudRate: 9600,
    autoOpen: false
};

function initializeSerialPort() {
    console.log(`Attempting to connect to ${serialPath}...`);
    
    sp = new SerialPort(serialPortConfig.path, {
        baudRate: serialPortConfig.baudRate,
        autoOpen: false
    });

    parser = sp.pipe(new Readline({ delimiter: '\r\n' }));

    sp.on('open', () => {
        console.log(`Successfully connected to ${serialPath}`);
    });

    sp.on('error', (err) => {
        console.error('Serial port error:', err.message);
    });

    parser.on('data', line => {
        line = line.trim().toLowerCase();
        console.log('Received data:', line); // Debug received data
        if (line === 'occupied' || line === 'free') {
            sensorStatus = line;
            console.log('Seat 1 is:', line);
        }
    });

    sp.open((err) => {
        if (err) {
            console.error(`Failed to open ${serialPath}:`, err.message);
            console.log('Starting in simulation mode...');
            startSimulationMode();
        }
    });
}

// Fallback simulation mode when Arduino is not connected
function startSimulationMode() {
    console.log('🎯 Running in SIMULATION mode - seat status will alternate automatically');
    setInterval(() => {
        sensorStatus = sensorStatus === 'free' ? 'occupied' : 'free';
        console.log('Simulated - Seat 1 is:', sensorStatus);
    }, 3000); // Change status every 3 seconds
}

// API endpoints
app.get('/api/seat-status', (req, res) => {
    res.json({ 
        status: sensorStatus,
        mode: sp && sp.isOpen ? 'sensor' : 'simulation'
    });
});

// Initialize serial port
initializeSerialPort();

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Cleanup on exit
process.on('SIGINT', () => {
    if (sp && sp.isOpen) {
        sp.close(() => {
            console.log('\nSerial port closed');
            process.exit();
        });
    } else {
        process.exit();
    }
});