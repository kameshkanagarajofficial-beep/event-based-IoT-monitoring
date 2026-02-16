import React, { useState, useEffect } from "react";

function App() {
  const [currentValue, setCurrentValue] = useState(50);
  const [previousValue, setPreviousValue] = useState(50);
  const [transmittedData, setTransmittedData] = useState([]);
  const threshold = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 100);
      setCurrentValue(newValue);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Math.abs(currentValue - previousValue) > threshold) {
      setTransmittedData(prev => [...prev, currentValue]);
      setPreviousValue(currentValue);
    }
  }, [currentValue]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Event-Based IoT Monitoring</h1>
      <h2>Current Sensor Value: {currentValue}</h2>
      <h3>Threshold: {threshold}</h3>

      <h3>Transmitted Data:</h3>
      <ul>
        {transmittedData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
