import { ShieldCheck, Globe, ActivitySquare } from "lucide-react"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import "./About.css"

const About = () => {
  const teamMembers = [
    {
      name: "Sanskar Sureka",
      role: "Thapar",
      image: "",
      bio: "",
    },
    {
      name: "Aamod Jain",
      role: "IIT Ropar",
      image: "",
      bio: "",
    },
    {
      name: "Mitul Aggarwal",
      role: "IIIT Delhi",
      image: "",
      bio: "",
    },
    {
      name: "Priyanka Suri",
      role: "NSUT",
      image: "",
      bio: "",
    },
  ]

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">
            About <span className="head">HealthGuard</span>
          </h1>
          <p className="about-hero-subtitle">
            Empowering global health through AI-driven disease outbreak prediction and prevention
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="mission-title">Our Mission</h2>
              <p className="mission-description">
                At HealthGuard, our mission is to safeguard communities by predicting and detecting early-stage disease
                outbreaks using cutting-edge AI and data science. We strive to equip health authorities with tools to make
                faster, more informed decisions.
              </p>
              <p className="mission-description">
                By combining structured and unstructured data from diverse sources, we aim to create a proactive, inclusive,
                and transparent disease surveillance ecosystem.
              </p>
            </div>
            <div className="mission-values">
              <div className="value-item">
                <ShieldCheck className="value-icon" />
                <h3>Excellence</h3>
                <p>Delivering reliable and robust AI solutions for public health infrastructure</p>
              </div>
              <div className="value-item">
                <Globe className="value-icon" />
                <h3>Transparency</h3>
                <p>Building trust through open, accessible, and ethical use of data</p>
              </div>
              <div className="value-item">
                <ActivitySquare className="value-icon" />
                <h3>Innovation</h3>
                <p>Continuously evolving with state-of-the-art technology to tackle modern health challenges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="team-title">Meet Our Team</h2>
          <p className="team-subtitle">The minds behind HealthGuard’s AI for health innovation</p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image-container">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-image" />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
