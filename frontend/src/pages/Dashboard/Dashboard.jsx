import React, { useEffect, useState } from "react";
import { fetchOutbreakData } from "../../api/outbreakService";
import BarChartByDisease from "../../components/BarChartByDisease";
import PieChartDeathsRecovery from "../../components/PieChartDeathsRecovery";
import LineChartByState from "../../components/LineChartByState";
import MapChart from "../../components/Map";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";

import './Dashboard.css';

export default function Dashboard() {
  const [outbreaks, setOutbreaks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchOutbreakData();
        setOutbreaks(data);
        console.log("Fetched outbreak data:", data);
      } catch (error) {
        console.error("Failed to fetch outbreak data:", error);
      }
    };
    loadData();
  }, []);

  // Total cases per disease
  const diseaseSummary = outbreaks.reduce((acc, curr) => {
    if (!acc[curr.disease]) {
      acc[curr.disease] = { name: curr.disease, cases: 0 };
    }
    acc[curr.disease].cases += curr.cases;
    return acc;
  }, {});
  const diseaseData = Object.values(diseaseSummary);

  // Pie Chart: Deaths vs Recoveries
  const deathRecoveryData = outbreaks.map(item => ({
    name: item.disease,
    deaths: item.death_cases,
    recoveries: item.recovered ?? (item.cases - item.active_cases - item.death_cases),
  }));

  // Line Chart: State-wise trend
  const stateWiseTrend = outbreaks.map(item => ({
    state: item.state,
    cases: item.cases,
    active: item.active_cases,
    deaths: item.death_cases,
  }));

  return (
    <>
      <Navbar />
      <div className="chatbot-container">
        <h1 className="chatbot-heading">Outbreak Dashboard</h1>
        <p className="chatbot-subheading">
          Track outbreaks, monitor trends, and stay informed — all in one place.
        </p>
      </div>

      <div className="dashboard-container">

        {/* 🌍 Map Section */}
        <MapChart data={outbreaks} />

        {/* 📊 Charts Row */}
        <div className="charts-row">
          <div className="chart-half">
            <h3 className="chart-title">Disease-wise Total Cases</h3>
            <div style={{ width: "100%", height: "300px" }}>
              <BarChartByDisease data={diseaseData} />
            </div>
          </div>

          <div className="chart-half">
            <h3 className="chart-title">Deaths vs Recoveries</h3>
            <div style={{ width: "100%", height: "300px" }}>
              <PieChartDeathsRecovery data={deathRecoveryData} />
            </div>
          </div>
        </div>

        {/* 📈 Line Chart */}
        <div className="chart-full">
          <h3 className="chart-title">State-wise Outbreak Trend</h3>
          <div style={{ width: "100%", height: "300px" }}>
            <LineChartByState data={stateWiseTrend} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
