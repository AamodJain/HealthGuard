import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Eye, EyeOff, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./signup.css";

export default function SignupPage() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // make the api call
        try {
            const response = await axios.post("http://127.0.0.1:8000/signup", form, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data));
                toast.success("Signup successful!");
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.detail || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-bg">
            <div className="signup-form-container">
                <div className="signup-title">Create Account</div>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-names-row">
                        <div className="signup-name-box" style={{ position: "relative" }}>
                            <label className="signup-label" htmlFor="firstName">First Name</label>
                            <span className="signup-icon">
                                <User size={20} />
                            </span>
                            <input
                                className="signup-input"
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                                placeholder="First Name"
                                style={{ paddingLeft: "2.2rem" }}
                            />
                        </div>
                        <div className="signup-name-box" style={{ position: "relative" }}>
                            <label className="signup-label" htmlFor="lastName">Last Name</label>
                            <span className="signup-icon">
                                <User size={20} />
                            </span>
                            <input
                                className="signup-input"
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Last Name"
                                style={{ paddingLeft: "2.2rem" }}
                            />
                        </div>
                    </div>
                    <div className="signup-box" style={{ position: "relative" }}>
                        <label className="signup-label" htmlFor="email">Email Address</label>
                        <span className="signup-icon">
                            <Mail size={20} />
                        </span>
                        <input
                            className="signup-input"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            style={{ paddingLeft: "2.2rem" }}
                        />
                    </div>
                    <div className="signup-box" style={{ position: "relative" }}>
                        <label className="signup-label" htmlFor="password">Password</label>
                        <span className="signup-icon">
                            <Lock size={20} />
                        </span>
                        <input
                            className="signup-input"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            style={{ paddingLeft: "2.2rem" }}
                        />
                        <span
                            className="signup-eye-icon"
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={0}
                            style={{
                                position: "absolute",
                                right: "18px",
                                top: "44px",
                                color: "#cbaaf4",
                                cursor: "pointer",
                                zIndex: 2,
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                    <button className="signup-btn" type="submit">Sign Up</button>
                </form>
                <div className="signup-bottom-text">
                    Already have an account?
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
