// updates.jsx
import React from "react"
import "./updates.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"

const updatesData = [
  {
    disease: "Dengue",
    activeCases: {
      "Delhi": 320,
      "Maharashtra": 210,
      "Kerala": 180,
      "Tamil Nadu": 150,
    },
    precautions: [
      "Use mosquito repellent",
      "Wear full-sleeved clothes",
      "Avoid stagnant water",
    ],
  },
  {
    disease: "COVID-19",
    activeCases: {
      "Maharashtra": 950,
      "Delhi": 740,
      "Karnataka": 620,
      "Uttar Pradesh": 510,
    },
    precautions: [
      "Wear a mask in crowded places",
      "Get vaccinated",
      "Maintain social distancing",
    ],
  },
  {
    disease: "Swine Flu",
    activeCases: {
      "Rajasthan": 85,
      "Gujarat": 120,
      "Punjab": 70,
      "Haryana": 55,
    },
    precautions: [
      "Wash hands frequently",
      "Avoid close contact with sick people",
      "Stay home if unwell",
    ],
  },
  {
    disease: "Malaria",
    activeCases: {
      "West Bengal": 400,
      "Assam": 300,
      "Odisha": 250,
      "Chhattisgarh": 200,
    },
    precautions: [
      "Use insecticide-treated nets",
      "Take antimalarial medication if advised",
      "Keep windows and doors closed",
    ],
  }
]

function Updates() {
  return (
    <div className="updates-bg">
      <Navbar />
      <div className="updates-container">
        <h1 className="updates-title">Latest Medical & Disease Updates</h1>
        <div className="updates-grid">
          {updatesData.map((item, index) => (
            <div className="update-card" key={index}>
              <h2 className="disease-name">{item.disease}</h2>
              <div className="cases-section">
                <h3>Active Cases by State</h3>
                <ul className="cases-list">
                  {Object.entries(item.activeCases).map(([state, count]) => (
                    <li key={state}>
                      <span className="state-name">{state}:</span>{" "}
                      <span className="case-count">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="precautions-section">
                <h3>Precautions</h3>
                <ul className="precautions-list">
                  {item.precautions.map((tip, i) => (
                    <li key={i}>{tip}</li>
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

export default Updates
