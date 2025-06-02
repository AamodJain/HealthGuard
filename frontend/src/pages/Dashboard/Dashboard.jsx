"use client"
import { Calendar, TrendingUp, Clock, Award, BookOpen, Target } from "lucide-react"
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

    // Generate sample heatmap data (past 365 days)
    const generateHeatmapData = () => {
        const data = []
        const today = new Date()
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            data.push({
                date: date.toISOString().split("T")[0],
                count: Math.floor(Math.random() * 5), // 0-4 activity levels
            })
        }
        return data
    }

    const heatmapData = generateHeatmapData()

    const weeklyData = [
        { day: "Mon", hours: 2.5 },
        { day: "Tue", hours: 1.8 },
        { day: "Wed", hours: 3.2 },
        { day: "Thu", hours: 2.1 },
        { day: "Fri", hours: 1.5 },
        { day: "Sat", hours: 4.0 },
        { day: "Sun", hours: 3.5 },
    ]

    const dashboardStats = [
        { icon: Clock, title: "Total Hours", value: authUser.hoursLearned || 0, change: "+12%" },
        { icon: BookOpen, title: "Courses", value: "15", change: "+25%" },
        { icon: Award, title: "Certificates", value: "8", change: "+3%" },
        { icon: Target, title: "Goals Met", value: "12/15", change: "+80%" },
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
                {/* Dashboard Header */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Welcome back, {authUser.first_name}!</h1>
                    <p className="dashboard-subtitle">Here's your learning progress overview</p>
                </div>

                {/* Stats Cards */}
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

                {/* Learning Activity Heatmap */}
                <div className="dashboard-section">
                    <h2 className="section-title">
                        <Calendar size={20} />
                        Learning Activity
                    </h2>
                    <div className="heatmap-container">
                        <div className="heatmap-grid">
                            {heatmapData.map((day, index) => (
                                <div
                                    key={index}
                                    className={`heatmap-cell ${getActivityLevel(day.count)}`}
                                    title={`${day.date}: ${day.count} activities`}
                                />
                            ))}
                        </div>
                        <div className="heatmap-legend">
                            <span>Less</span>
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

                {/* Weekly Progress Chart */}
                <div className="dashboard-section">
                    <h2 className="section-title">
                        <TrendingUp size={20} />
                        Weekly Progress
                    </h2>
                    <div className="chart-container">
                        <div className="bar-chart">
                            {weeklyData.map((day, index) => (
                                <div key={index} className="bar-item">
                                    <div
                                        className="bar"
                                        style={{ height: `${(day.hours / 4) * 100}%` }}
                                        title={`${day.day}: ${day.hours} hours`}
                                    />
                                    <span className="bar-label">{day.day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chart-y-axis">
                            <span>4h</span>
                            <span>3h</span>
                            <span>2h</span>
                            <span>1h</span>
                            <span>0h</span>
                        </div>
                    </div>
                </div>

                {/* Current Goals */}
                <div className="dashboard-section">
                    <h2 className="section-title">
                        <Target size={20} />
                        Current Goals
                    </h2>
                    <div className="goals-container">
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Complete JavaScript Course</h3>
                                <p>Finish all modules by end of month</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "75%" }} />
                                </div>
                                <span className="progress-text">75%</span>
                            </div>
                        </div>
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Study 20 hours this week</h3>
                                <p>Current week learning target</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "60%" }} />
                                </div>
                                <span className="progress-text">12/20h</span>
                            </div>
                        </div>
                        <div className="goal-item">
                            <div className="goal-info">
                                <h3>Earn 3 Certificates</h3>
                                <p>Complete certification courses</p>
                            </div>
                            <div className="goal-progress">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "67%" }} />
                                </div>
                                <span className="progress-text">2/3</span>
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
