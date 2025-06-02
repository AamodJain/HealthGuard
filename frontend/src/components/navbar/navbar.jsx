// complete
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
    return (
        <nav className="home-navbar">
                <div className="home-navbar-brand" >Edu Buddy</div>
                <div><ul className="home-navbar-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul></div>
                <div className="home-navbar-Login">
                    <Link to="/login"><button className="home-login-button">Login</button></Link>
                </div>
              </nav>
    );
}

export default Navbar;
