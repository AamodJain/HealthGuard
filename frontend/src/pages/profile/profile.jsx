import { Calendar, Mail, User, Award, Clock, BookOpen } from "lucide-react"
import { useAuthContext } from "../../context/authContext"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import "./Profile.css"

const Profile = () => {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-container">
          <div className="profile-error">
            <h2>Please log in to view your profile</h2>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const profileStats = [
    { icon: Clock, label: "Hours Learned", value: authUser.hoursLearned || 0 },
    { icon: BookOpen, label: "Courses Completed", value: "12" },
    { icon: Award, label: "Certificates Earned", value: "8" },
    { icon: User, label: "Current Streak", value: `${authUser.streak || 0} days` },
  ]

  const achievements = [
    { title: "First Steps", description: "Completed your first course", earned: true },
    { title: "Streak Master", description: "Maintained a 7-day learning streak", earned: true },
    { title: "Knowledge Seeker", description: "Completed 10 courses", earned: true },
    { title: "Dedicated Learner", description: "Logged 100 hours of learning", earned: true },
    { title: "Course Creator", description: "Created your first course", earned: false },
    { title: "Community Helper", description: "Helped 50 fellow learners", earned: false },
  ]

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <img src={authUser.avatar || "/placeholder.svg"} alt={authUser.first_name + " " + authUser.last_name} className="profile-avatar-large" />
            <button className="change-avatar-btn">Change Photo</button>
          </div>
          <div className="profile-info-section">
            <h1 className="profile-name">{authUser.first_name + " " + authUser.last_name}</h1>
            <p className="profile-title">Learning Enthusiast</p>
            <div className="profile-details">
              <div className="profile-detail">
                <Mail size={16} />
                <span>{authUser.email}</span>
              </div>
              <div className="profile-detail">
                <Calendar size={16} />
                <span>
                  Joined {new Date(authUser.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <h2 className="section-title">Learning Statistics</h2>
          <div className="stats-grid">
            {profileStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={authUser.first_name + " " + authUser.last_name} readOnly />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={authUser.email} readOnly />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Add phone number" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Add your location" />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Bio</label>
              <textarea placeholder="Tell us about yourself..." rows={4}></textarea>
            </div>
            <button className="save-profile-btn">Save Changes</button>
          </div>
        </div>

        {/* Achievements */}
        <div className="profile-section">
          <h2 className="section-title">Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className={`achievement-card ${achievement.earned ? "earned" : "locked"}`}>
                <div className="achievement-icon">
                  <Award size={24} />
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
                {achievement.earned && <div className="achievement-badge">✓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
