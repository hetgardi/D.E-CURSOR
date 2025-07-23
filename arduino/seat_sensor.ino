/**
 * AMTS Bus Seat Occupancy Sensor
 * 
 * Uses HC-SR04 ultrasonic sensor to detect seat occupancy
 * Sends serial data to computer for real-time monitoring
 * 
 * Hardware Connections:
 * - HC-SR04 VCC -> Arduino 5V
 * - HC-SR04 GND -> Arduino GND  
 * - HC-SR04 Trig -> Arduino Pin 9
 * - HC-SR04 Echo -> Arduino Pin 10
 * 
 * Serial Output:
 * - "occupied" when distance < 10cm (person detected)
 * - "free" when distance >= 10cm (no person detected)
 */

// Pin definitions for HC-SR04 ultrasonic sensor
const int trigPin = 9;   // Trigger pin - sends ultrasonic pulse
const int echoPin = 10;  // Echo pin - receives reflected pulse

void setup() {
  // Configure pins
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Initialize serial communication at 9600 baud
  Serial.begin(9600);
  
  // Optional: Add startup message
  Serial.println("AMTS Seat Sensor Initialized");
}

void loop() {
  // Send ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read echo and calculate distance
  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;  // Convert to centimeters

  // Determine seat status based on distance
  // Adjust threshold (10cm) based on your sensor placement
  if (distance > 0 && distance < 10) {
    Serial.println("occupied");
  } else {
    Serial.println("free");
  }
  
  // Wait 500ms before next reading
  delay(500); 
}