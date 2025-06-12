import React, { useEffect, useState } from "react";
import "./alerts.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const loadAlerts = async () => {
      console.log("Fetching alerts from backend...");
      const data = await axios.get("http://localhost:8000/alerts")
      console.log("Fetched alerts:", data);
      setAlerts(data.data);
    };
    loadAlerts();
  }, []);

  return (
    <div className="alerts-bg">
      <Navbar />
      <div className="alerts-container">
        <h1 className="alerts-title">Upcoming Disease Alerts</h1>
        <div className="alerts-grid">
          {alerts.map((alert, index) => (
            <div className="alert-card" key={index}>
              <h2 className="alert-disease">{alert.title}</h2>
              <div
                className="alert-content"
                dangerouslySetInnerHTML={{ __html: alert.content }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Alerts;
