// complete
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuthContext } from '../../context/authContext.jsx';
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react"
import ProfileModal from '../ProfileModal/ProfileModal.jsx';
import { useState } from 'react';


function Navbar() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)


  const handleProfileClick = () => {
    setIsProfileModalOpen(true)
  }

  const handleModalNavigate = (path) => {
    navigate(path)
  }

  return (
    <>
    <nav className="home-navbar">
      <div className="home-navbar-brand" >HealthGuard</div>
      <div><ul className="home-navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/updates">Updates</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul></div>
      <div className="home-navbar-Login">
        {authUser ? (
            <button className="profile-button" onClick={handleProfileClick}>
              <UserCircle size={20} className='profile-modal-icon'/>
            </button>
          ) : (
            <Link to = "/login">
            <button className="home-login-button">Login</button>
            </Link>
          )}
      </div>
    </nav>
    <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onNavigate={handleModalNavigate}
      />
      </>
  );
}

export default Navbar;
