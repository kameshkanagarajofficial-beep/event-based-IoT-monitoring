import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function App() {
  const [currentValue, setCurrentValue] = useState(50);
  const [previousValue, setPreviousValue] = useState(50);

  const [continuousCount, setContinuousCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const threshold = 5;
  const energyPerTransmission = 0.5;

  // Sensor simulation (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 100);
      setCurrentValue(newValue);

      // Continuous mode always transmits
      setContinuousCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Event-based + abnormal detection
  useEffect(() => {
    // Abnormal condition
    if (currentValue > 90) {
      setAlertMessage(
        "⚠️ Critical Alert: Sensor value exceeded safe limit!"
      );
      setEventCount((prev) => prev + 1);
      setPreviousValue(currentValue);
      return;
    }

    // Event-based condition
    if (Math.abs(currentValue - previousValue) > threshold) {
      setEventCount((prev) => prev + 1);
      setPreviousValue(currentValue);
      setAlertMessage("");
    }}, [currentValue]);

  const reductionPercentage =
    continuousCount > 0
      ? (
          ((continuousCount - eventCount) / continuousCount) *
          100
        ).toFixed(2)
      : 0;

  const continuousEnergy = (
    continuousCount * energyPerTransmission
  ).toFixed(2);

  const eventEnergy = (
    eventCount * energyPerTransmission
  ).toFixed(2);

  const energySaved = (
    continuousEnergy - eventEnergy
  ).toFixed(2);

  const chartData = [
    {
      name: "Transmission",
      Continuous: continuousCount,
      EventBased: eventCount
    }
  ];

  return (
    <div className="dashboard">
      <div className="card">
        <h1>Event-Based IoT Performance Analysis</h1>

        <h2>Current Sensor Value: {currentValue}</h2>

        {alertMessage && (
          <div className="alert">{alertMessage}</div>
        )}

        <div className="section">
          <div className="metric">
            Continuous Mode Transmissions: {continuousCount}
          </div>
          <div className="metric">
            Event-Based Transmissions: {eventCount}
          </div>
          <div className="metric highlight">
            Transmission Reduction: {reductionPercentage}%
          </div>
        </div>

        <div className="section">
          <div className="metric">
            Continuous Energy Used: {continuousEnergy} units
          </div>
          <div className="metric">
            Event-Based Energy Used: {eventEnergy} units
          </div>
          <div className="metric highlight">
            Energy Saved: {energySaved} units
          </div>
        </div>

        <div className="section chart-container">
          <h2>Transmission Comparison Graph</h2>

          <BarChart
            width={500}
            height={300}
            data={chartData}
          >
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Continuous" fill="#00d9ff" />
            <Bar dataKey="EventBased" fill="#00ffb3" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default App;
