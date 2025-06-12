import { User, BarChart3, LogOut } from "lucide-react"
import { useAuthContext } from '../../context/authContext.jsx';
import "./ProfileModal.css"

const ProfileModal = ({ isOpen, onClose, onNavigate }) => {
    const { authUser } = useAuthContext();
    // const { user, logout } = useAuth()

    if (!isOpen) return null

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.reload()
    }

    const handleLogout = () => {
        logout()
        onClose()
    }

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <div className="profile-modal-header">
                    <User size={25} />
                    <div className="profile-info">
                        <h3>{authUser?.firstName} {authUser?.lastName}</h3>
                        <p>{authUser?.email}</p>
                    </div>
                </div>

                <div className="profile-modal-menu">
                    {/* <button
                        className="profile-menu-item"
                        onClick={() => {
                            onNavigate("/profile")
                            onClose()
                        }}
                    >
                        <User size={20} />
                        Profile
                    </button>

                    <button
                        className="profile-menu-item"
                        onClick={() => {
                            onNavigate("/dashboard")
                            onClose()
                        }}
                    >
                        <BarChart3 size={20} />
                        Dashboard
                    </button> */}

                    <button className="profile-menu-item logout" onClick={handleLogout}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal
