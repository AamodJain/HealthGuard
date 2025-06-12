// alerts.jsx
import React from "react"
import "./alerts.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"

const alertData = [
  {
    disease: "Dengue",
    likelyStates: ["West Bengal", "Assam", "Odisha"],
    risk: "High",
    reasons: [
      "High mosquito breeding due to stagnant water",
      "Recent rainfall and poor drainage",
    ],
  },
  {
    disease: "Chikungunya",
    likelyStates: ["Maharashtra", "Goa"],
    risk: "Moderate",
    reasons: [
      "Rising humidity and urban crowding",
      "Increased cases in neighboring districts",
    ],
  },
  {
    disease: "Heat Stroke",
    likelyStates: ["Rajasthan", "Gujarat"],
    risk: "Severe",
    reasons: [
      "Extreme heat wave expected",
      "Dehydration risk among outdoor workers",
    ],
  },
  {
    disease: "Swine Flu",
    likelyStates: ["Punjab", "Himachal Pradesh"],
    risk: "Low",
    reasons: ["Isolated cluster cases reported", "Weather remains favorable"],
  },
]

function Alerts() {
  return (
    <div className="alerts-bg">
      <Navbar />
      <div className="alerts-container">
        <h1 className="alerts-title">Upcoming Disease Alerts</h1>
        <div className="alerts-grid">
          {alertData.map((alert, index) => (
            <div className="alert-card" key={index}>
              <h2 className="alert-disease">{alert.disease}</h2>
              <div className="alert-risk risk-tag" data-risk={alert.risk}>
                Risk: {alert.risk}
              </div>
              <div className="alert-states">
                <h3>Likely to Spread In:</h3>
                <ul>
                  {alert.likelyStates.map((state, i) => (
                    <li key={i}>{state}</li>
                  ))}
                </ul>
              </div>
              <div className="alert-reasons">
                <h3>Possible Reasons</h3>
                <ul>
                  {alert.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Alerts
