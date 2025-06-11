import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoleSelection.module.css";
import { Users , Stethoscope, HeartPulse } from "lucide-react";
import Spline from "@splinetool/react-spline";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate("/Register", { state: { role } });
  };

  return (
    <div className={styles.container}>
      {/* Spline Icon */}
      <div className={styles.splineContainer}>
        <Spline scene="https://prod.spline.design/XEnHoR7zNbCfXb4e/scene.splinecode" />
      </div>

      <h1 className={styles.title}>Select Your Role</h1>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => handleRoleSelect("Public")}
          className={styles.button}
        >
          <Users className={styles.icon} />
          Public
        </button>
        <button
          onClick={() => handleRoleSelect("Medical Official")}
          className={styles.button}
        >
          <Stethoscope className={styles.icon} />
          Medical Official
        </button>
        {/* <button
          onClick={() => handleRoleSelect("parent")}
          className={styles.button}
        >
          <FaUserShield className={styles.icon} />
          Parent
        </button> */}
      </div>
    </div>
  );
};

export default RoleSelection;
