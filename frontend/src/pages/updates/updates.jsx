// 
import React, { useEffect, useState } from "react"
import "./updates.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import axios from "axios"

function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
  try {
    console.log("Fetching updates from backend...");
    const response = await axios.get("http://127.0.0.1:8000/updates");
    console.log("Fetched updates:", response.data);
    setUpdates(response.data); // axios returns JSON in `data`
  } catch (error) {
    console.error("Failed to fetch updates:", error);
  }
};

    fetchUpdates();
  }, []);

  return (
    <div className="updates-bg">
      <Navbar />
      <div className="updates-container">
        <h1 className="updates-title">Latest Medical & Disease Updates</h1>
        <div className="updates-grid">
          {updates.map((item, index) => (
            <div className="update-card" key={index}>
              <h2 className="disease-name">{item.title}</h2>
              <div
                className="update-content"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Updates;
