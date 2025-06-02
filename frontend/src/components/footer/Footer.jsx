import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">Edu Buddy</h3>
            <p className="footer-description">Empowering learners worldwide with personalized education experiences.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/features">Features</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li>
                <a href="/help">Help Center</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Edu Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
