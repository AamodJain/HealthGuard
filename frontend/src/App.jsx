import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import ContactPage from './pages/contact/contact';
import About from './pages/About/About';
import Profile from './pages/profile/profile';
import RoleSelection from "./pages/auth/RoleSelection";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from './pages/Dashboard/Dashboard';
import {Toaster} from 'react-hot-toast';


function App() {
  // const {authUser} = useAuthContext();
  return (
    <>
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/roleSelect" element={<RoleSelection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
    </>
  );
}

export default App;
