import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spline from "@splinetool/react-spline";
import { toast } from "react-hot-toast";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, role } = response.data;

      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(response.data));

        switch (role) {
          case "Public":
          case "Medical Official":
            navigate("/");
            // reload page
            window.location.reload();
            break;
          default:
            toast.error("Invalid role. Please try again.");
        }
      } else {
        setError("Login failed. Please check your credentials.");
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
      toast.error(err.response?.data?.detail || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.splineBackground}>
        <Spline scene="https://prod.spline.design/kEXDvZEV89W1A4EP/scene.splinecode" />
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {error && <p style={{ color: "#f87171", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p className={styles.text}>
          Don’t have an account?
          <Link to="/roleSelect" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
