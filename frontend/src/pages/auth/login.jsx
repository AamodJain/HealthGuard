import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./auth.css";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login", form, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.token) {
                // console.log("Login successful:", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data));
                toast.success("Login successful!");
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            toast.error(err.response?.data?.detail || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-bg">
            <div className="login-form-container">
                <div className="login-title">Welcome Back</div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-box" style={{ position: "relative" }}>
                        <label className="login-label" htmlFor="email">Email Address</label>
                        <span className="login-icon">
                            <Mail size={20} />
                        </span>
                        <input
                            className="login-input"
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
                    <div className="login-box" style={{ position: "relative" }}>
                        <label className="login-label" htmlFor="password">Password</label>
                        <span className="login-icon">
                            <Lock size={20} />
                        </span>
                        <input
                            className="login-input"
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
                            className="login-eye-icon"
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
                    <button className="login-btn" type="submit">Login</button>
                </form>
                <div className="login-bottom-text">
                    Don't have an account?
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
