"use client"
import { Calendar, TrendingUp, Clock, AlertCircle, Radar, Globe } from "lucide-react"
import { useAuthContext } from "../../context/authContext"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import "./Dashboard.css"

const Dashboard = () => {
    const { authUser } = useAuthContext()
    console.log(authUser);
    if (!authUser) {
        return (
            <div className="dashboard-page">
                <Navbar />
                <div className="dashboard-container">
                    <div className="dashboard-error">
                        <h2>Please log in to view your dashboard</h2>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const generateHeatmapData = () => {
        const data = []
        const today = new Date()
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            data.push({
                date: date.toISOString().split("T")[0],
                count: Math.floor(Math.random() * 5),
            })
        }
        return data
    }

    const heatmapData = generateHeatmapData()

    const weeklyData = [
        { day: "Mon", hours: 40 },
        { day: "Tue", hours: 55 },
        { day: "Wed", hours: 30 },
        { day: "Thu", hours: 45 },
        { day: "Fri", hours: 60 },
        { day: "Sat", hours: 35 },
        { day: "Sun", hours: 25 },
    ]

    const dashboardStats = [
        { icon: Globe, title: "Regions Monitored", value: "132", change: "+8%" },
        { icon: AlertCircle, title: "Active Alerts", value: "17", change: "+23%" },
        { icon: Radar, title: "AI Predictions", value: "89", change: "+12%" },
        { icon: Clock, title: "Avg Response Time", value: "2.4h", change: "-6%" },
    ]

    const getActivityLevel = (count) => {
        if (count === 0) return "none"
        if (count === 1) return "low"
        if (count === 2) return "medium"
        if (count >= 3) return "high"
        return "none"
    }

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Welcome back, {authUser.first_name}!</h1>
                    <p className="dashboard-subtitle">Here’s your disease surveillance overview</p>
                </div>

                <div className="dashboard-stats">
                    <div className="stats-grid">
                        {dashboardStats.map((stat, index) => (
                            <div key={index} className="dashboard-stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">
                                        <stat.icon size={24} />
                                    </div>
                                    <span className={`stat-change ${stat.change.startsWith("+") ? "positive" : "negative"}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-title">{stat.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2 className="section-title">
                        <Calendar size={20} />
                        Alert Activity
                    </h2>
                    <div className="heatmap-container">
                        <div className="heatmap-grid">
                            {heatmapData.map((day, index) => (
                                <div
                                    key={index}
                                    className={`heatmap-cell ${getActivityLevel(day.count)}`}
                                    title={`${day.date}: ${day.count} alerts`}
                                />
                            ))}
                        </div>
                        <div className="heatmap-legend">
                            <span>Fewer</span>
                            <div className="legend-cells">
                                <div className="legend-cell none" />
                                <div className="legend-cell low" />
                                <div className="legend-cell medium" />
                                <div className="legend-cell high" />
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2 className="section-title">
                        <TrendingUp size={20} />
                        Weekly Outbreak Trends
                    </h2>
                    <div className="chart-container">
                        <div className="bar-chart">
                            {weeklyData.map((day, index) => (
                                <div key={index} className="bar-item">
                                    <div
                                        className="bar"
                                        style={{ height: `${(day.hours / 60) * 100}%` }}
                                        title={`${day.day}: ${day.hours} cases`}
                                    />
                                    <span className="bar-label">{day.day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chart-y-axis">
                            <span>60+</span>
                            <span>45</span>
                            <span>30</span>
                            <span>15</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2 className="section-title">
                        <Radar size={20} />
                        Ongoing Health Objectives
                    </h2>
                    <div className="goals-container">
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Expand Coverage to 5 New Regions</h3>
                                <p>Targeted surveillance expansion this month</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "60%" }} />
                                </div>
                                <span className="progress-text">3/5</span>
                            </div>
                        </div>
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Detect 10 Early-Stage Outbreaks</h3>
                                <p>Using predictive models and alerting tools</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "70%" }} />
                                </div>
                                <span className="progress-text">7/10</span>
                            </div>
                        </div>
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Reduce Average Response Time</h3>
                                <p>Optimize the alert-to-action workflow</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "50%" }} />
                                </div>
                                <span className="progress-text">2.4h avg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Dashboard
