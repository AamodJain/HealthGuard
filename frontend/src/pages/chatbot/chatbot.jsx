// chatbot.jsx
import React from "react"
import "./chatbot.css"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import Spline from "@splinetool/react-spline"

function Chatbot() {
  return (
    <div className="chatbot-page">
      <Navbar />
      <div className="chatbot-container">
        <h1 className="chatbot-heading">HealthGuard Assistant</h1>
        <p className="chatbot-subheading">
          Ask questions, report symptoms, or get help instantly.
        </p>

        <div className="chatbot-main">
          {/* Spline on Left */}
          <div className="chatbot-left">
            <Spline scene="https://prod.spline.design/XEnHoR7zNbCfXb4e/scene.splinecode" />
          </div>

          {/* Chatbot iframe on Right */}
          <div className="chatbot-right">
            <div className="iframe-wrapper">
              <iframe
                src="https://webchat.botframework.com/embed/healthbot-vlulkbo?s=RSeTzaiOQ5o.z69KMvVqXvMgk_gUvLny3w66Igtjrg3KpHg3WmPCge4"
                style={{
                  minWidth: "400px",
                  width: "100%",
                  minHeight: "500px",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.05)",
                  backgroundColor: "#171717",
                }}
                title="HealthGuard Chatbot"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Chatbot
