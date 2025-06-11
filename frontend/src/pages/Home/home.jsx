import { Microscope, Activity, Radar, Globe, Users } from "lucide-react"
import "./home.css"
import { Link } from "react-router-dom"
import SplineScene from "../../components/splineScene"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"

function Home() {

  const features = [
    {
      icon: Microscope,
      title: "Data Aggregation & Integration",
      description: "Integrates epidemiological, clinical, mobility, demographic, environmental, and social media data using seamless API-led connectivity.",
    },
    {
      icon: Radar,
      title: "AI-Powered Predictive Modeling",
      description: "Leverages machine learning to identify disease trends and predict outbreak probabilities for early alerts.",
    },
    {
      icon: Activity,
      title: "Real-Time Monitoring & Alerts",
      description: "Continuously monitors incoming data streams and instantly notifies authorities of potential outbreaks.",
    },
    {
      icon: Globe,
      title: "Comprehensive Disease Insights",
      description: "Combines structured and unstructured data to visualize and analyze disease dynamics, risk factors, and hotspots.",
    },
    {
      icon: Users,
      title: "Collaboration & Public Engagement",
      description: "Facilitates communication between health authorities, providers, and the public to coordinate response efforts effectively.",
    },
  ]

  const stats = [
    { number: "50K+", label: "Data Sources Monitored" },
    { number: "200+", label: "Outbreaks Predicted Early" },
    { number: "15M+", label: "Citizens Protected" },
    { number: "100+", label: "Health Care Providers" },
    { number: "100+", label: "Medical Experts" }
  ]

  return (
    <div className="home-bg">
      <Navbar />
      <div className="content">
        <div className="left-box">
          <h1 className="main-heading">
            Welcome to <br />
            <span className="head">HealthGuard</span>
          </h1>
          <p className="sub-heading">Learning made simple, effective, and engaging</p>
        
            <Link to="/login" className="cta-link">
              <button className="cta-button">Get Started</button>
            </Link>
        
        </div>
        <div className="right-box">
          <SplineScene />
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title-home">Why Choose HealthGuard?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={42} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card-home">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
