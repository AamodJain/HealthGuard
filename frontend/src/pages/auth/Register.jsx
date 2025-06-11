import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spline from '@splinetool/react-spline';

import styles from "./Register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    college: "",
    rollNumber: "",
    department: "",
    subjects: "",
    childName: "",
    relation: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role,
    };

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.token) {
        toast.success("Registration successful");
        console.log("Registration successful:", data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* 3D Background */}
      <div className={styles.splineBackground}>
        <Spline scene="https://prod.spline.design/9xisgDbk3wn0ofGk/scene.splinecode" />
      </div>

      {/* Foreground Form */}
      <div className={styles.card}>
        <h2 className={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={styles.input} required />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={styles.input} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className={styles.input} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className={styles.input} required />

          {role === "student" && (
            <>
              <input name="college" placeholder="College Name" value={formData.college} onChange={handleChange} className={styles.input} required />
              <input name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} className={styles.input} required />
            </>
          )}

          {role === "teacher" && (
            <>
              <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} className={styles.input} required />
              <input name="subjects" placeholder="Subjects Taught" value={formData.subjects} onChange={handleChange} className={styles.input} required />
            </>
          )}

          {role === "parent" && (
            <>
              <input name="childName" placeholder="Student's Roll No." value={formData.childName} onChange={handleChange} className={styles.input} required />
              <input name="relation" placeholder="Your Relation to Student" value={formData.relation} onChange={handleChange} className={styles.input} required />
            </>
          )}

          <button type="submit" className={styles.button}>Register</button>
          <p className={styles.text}>
            Already have an account?
            <Link to="/login" className={styles.link}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;