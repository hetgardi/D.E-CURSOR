# AMTS Bus Tracker with Real-Time Seat Monitoring

A comprehensive web application for the Ahmedabad Municipal Transport Service (AMTS) that combines bus route information with real-time seat occupancy monitoring using Arduino sensors. This system provides commuters with detailed bus schedules, routes, fares, and live seat availability data.

## 🚌 Features

### Bus Information System
- **Detailed Route Information**: Complete bus routes with stops and timings
- **Real-time Schedules**: Current bus timings and frequency
- **Fare Calculator**: Accurate fare information for different route segments
- **Contact Information**: AMTS office details and support

### Real-Time Seat Monitoring
- **Live Seat Status**: Real-time occupancy monitoring using ultrasonic sensors
- **Visual Seat Map**: Interactive bus seat layout with availability indicators
- **Arduino Integration**: Hardware sensor integration for accurate seat detection
- **Simulation Mode**: Fallback mode when hardware is not connected

### Technical Features
- **Responsive Design**: Works seamlessly on all devices
- **RESTful API**: Clean backend API for seat status
- **Real-time Updates**: Live data refreshing every second
- **Error Handling**: Graceful fallback to simulation mode

## 🛠️ Technologies Used

- **Frontend**: React.js, Bootstrap 5, CSS3
- **Backend**: Node.js, Express.js
- **Hardware**: Arduino Uno, Ultrasonic Sensor (HC-SR04)
- **Communication**: Serial Port Communication, REST API
- **Tools**: CORS for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Arduino IDE (for hardware setup)
- Arduino Uno with ultrasonic sensor (optional - has simulation mode)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/hetgardi/D.E-CURSOR.git
cd D.E-CURSOR
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Hardware Setup (Optional)
If you want to use the real sensor:
1. Connect HC-SR04 ultrasonic sensor to Arduino:
   - VCC → 5V
   - GND → GND
   - Trig → Pin 9
   - Echo → Pin 10
2. Upload the Arduino code from `arduino/seat_sensor.ino`
3. Connect Arduino to your computer
4. Update the COM port in `server.js` (line 17)

### 4. Run the Application

#### Start the Backend Server
```bash
npm run start-server
```
The server will run on `http://localhost:3001`

#### Start the Frontend (in a new terminal)
```bash
npm start
```
The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
D.E-CURSOR/
├── arduino/
│   └── seat_sensor.ino          # Arduino sensor code
├── public/
│   └── index.html               # HTML template
├── src/
│   ├── components/
│   │   ├── BusTracker.js        # Bus routes and schedules
│   │   ├── BusTracker.css       # Bus tracker styles
│   │   ├── SeatMap.js           # Real-time seat map
│   │   └── SeatMap.css          # Seat map styles
│   ├── App.js                   # Main application component
│   ├── App.css                  # Application styles
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles
├── server.js                    # Express backend server
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🔌 API Endpoints

### GET /api/seat-status
Returns the current seat occupancy status.

**Response:**
```json
{
  "status": "free" | "occupied",
  "mode": "sensor" | "simulation"
}
```

## 🎯 How It Works

### Seat Monitoring System
1. **Hardware Mode**: Arduino with ultrasonic sensor detects seat occupancy
2. **Serial Communication**: Arduino sends status via USB serial port
3. **Backend Processing**: Node.js server reads serial data and serves via API
4. **Frontend Display**: React app fetches and displays real-time seat status
5. **Simulation Mode**: When hardware is unavailable, system runs in demo mode

### Bus Information System
- Comprehensive AMTS route database
- Real-time schedule display
- Interactive fare calculator
- Mobile-responsive design

## 🚀 Available Scripts

- `npm start` - Start React development server
- `npm run start-server` - Start backend API server
- `npm run build` - Build production bundle
- `npm test` - Run test suite

## 🔧 Configuration

### Serial Port Configuration
Update the COM port in `server.js`:
```javascript
const serialPath = 'COM5'; // Change to your Arduino port
```

### Sensor Calibration
Adjust distance threshold in `arduino/seat_sensor.ino`:
```cpp
if (distance > 0 && distance < 10) { // Adjust threshold as needed
    Serial.println("occupied");
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions or support:
- **GitHub**: [@hetgardi](https://github.com/hetgardi)
- **Project**: [D.E-CURSOR](https://github.com/hetgardi/D.E-CURSOR)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] Multiple sensor support for all seats
- [ ] Mobile application
- [ ] Real-time GPS bus tracking
- [ ] Digital ticket booking integration
- [ ] Push notifications for seat availability
- [ ] Historical occupancy analytics
- [ ] Integration with city transport systems
