import { BookOpen, Brain, Zap, Target } from "lucide-react"
import "./home.css"
import { Link } from "react-router-dom"
import SplineScene from "../../components/splineScene"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"

function Home() {

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic content that adapts to your learning style and pace.",
    },
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your unique learning style and pace.",
    },
    {
      icon: Zap,
      title: "Real-time Feedback",
      description: "Get instant feedback and suggestions to improve your learning outcomes.",
    },
    {
      icon: Target,
      title: "Personalized Goals",
      description: "Set custom learning objectives and receive tailored recommendations.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "500+", label: "Courses Available" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="home-bg">
      <Navbar />
      <div className="content">
        <div className="left-box">
          <h1 className="main-heading">
            Welcome to <br />
            <span className="head">Edu Buddy</span>
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
          <h2 className="section-title">Why Choose Edu Buddy?</h2>
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
              <div key={index} className="stat-card">
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
