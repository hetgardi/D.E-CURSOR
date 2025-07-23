# Arduino Seat Sensor Setup

This directory contains the Arduino code for the HC-SR04 ultrasonic sensor that detects seat occupancy.

## Hardware Requirements

- Arduino Uno (or compatible)
- HC-SR04 Ultrasonic Sensor
- USB Cable
- Breadboard and jumper wires (optional)

## Wiring Diagram

Connect the HC-SR04 sensor to your Arduino as follows:

```
HC-SR04    Arduino Uno
--------   -----------
VCC     -> 5V
GND     -> GND
Trig    -> Pin 9
Echo    -> Pin 10
```

## Installation

1. Open Arduino IDE
2. Load the `seat_sensor.ino` file
3. Select your Arduino board and COM port
4. Upload the code to your Arduino

## How It Works

1. The sensor sends ultrasonic pulses every 500ms
2. Measures the distance to the nearest object
3. If distance < 10cm, seat is considered "occupied"
4. If distance >= 10cm, seat is considered "free"
5. Status is sent via serial communication to the computer

## Calibration

You may need to adjust the distance threshold based on your setup:

```cpp
if (distance > 0 && distance < 10) { // Adjust this value
    Serial.println("occupied");
} else {
    Serial.println("free");
}
```

## Troubleshooting

- **No serial data**: Check COM port connection and baud rate (9600)
- **Incorrect readings**: Adjust distance threshold or sensor positioning
- **Intermittent connection**: Ensure stable USB connection and power supply

## Serial Output Format

The Arduino sends simple text commands:
- `"occupied"` - when seat is occupied
- `"free"` - when seat is available

This data is read by the Node.js server via serial port communication.
