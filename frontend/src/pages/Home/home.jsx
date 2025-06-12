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
    title: "Unified Health Data",
    description: "Connects clinical, environmental, and social data to give a complete view of disease patterns.",
  },
  {
    icon: Radar,
    title: "Predictive AI Models",
    description: "Uses AI to forecast outbreaks early and help authorities act faster.",
  },
  {
    icon: Activity,
    title: "Live Alerts & Tracking",
    description: "Tracks cases in real time and sends instant alerts for rapid response.",
  },
  {
    icon: Globe,
    title: "Smart Visual Insights",
    description: "Interactive maps and dashboards highlight risk zones and spread patterns.",
  },
  {
    icon: Users,
    title: "Collaborative Ecosystem",
    description: "Connects health officials, providers, and citizens for coordinated action.",
  },
];

  const stats = [
  { number: "50K+", label: "Sources Monitored" },
  { number: "200+", label: "Outbreaks Predicted" },
  { number: "15M+", label: "Lives Impacted" },
  { number: "100+", label: "Partner Hospitals" },
  { number: "500+", label: "Health Experts Engaged" }
];


  return (
    <div className="home-bg">
      <Navbar />
      <div className="content">
        <div className="left-box">
          <h1 className="main-heading">
            Welcome to <br />
            <span className="head">HealthGuard</span>
          </h1>
          <p className="sub-heading">AI-powered disease outbreak prediction & tracking made simple, fast, and reliable</p>

        
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
