import { Target, Heart, Lightbulb } from "lucide-react"
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
            About <span className="head">Edu Buddy</span>
          </h1>
          <p className="about-hero-subtitle">
            Transforming education through innovative technology and personalized learning experiences
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
                At Edu Buddy, we believe that learning should be accessible, engaging, and tailored to each individual's
                unique needs. Our mission is to democratize education by providing cutting-edge tools and resources that
                empower learners worldwide to achieve their full potential.
              </p>
              <p className="mission-description">
                We're committed to breaking down barriers in education and creating a future where everyone has the
                opportunity to learn, grow, and succeed regardless of their background or circumstances.
              </p>
            </div>
            <div className="mission-values">
              <div className="value-item">
                <Target className="value-icon" />
                <h3>Excellence</h3>
                <p>Striving for the highest quality in everything we do</p>
              </div>
              <div className="value-item">
                <Heart className="value-icon" />
                <h3>Inclusivity</h3>
                <p>Making education accessible to learners of all backgrounds</p>
              </div>
              <div className="value-item">
                <Lightbulb className="value-icon" />
                <h3>Innovation</h3>
                <p>Continuously pushing the boundaries of educational technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="team-title">Meet Our Team</h2>
          <p className="team-subtitle">The passionate individuals behind Edu Buddy's vision</p>
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
