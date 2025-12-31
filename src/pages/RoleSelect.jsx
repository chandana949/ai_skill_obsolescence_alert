import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const roles = [
  {
    name: "Electrician",
    icon: "⚡",
    color: "#FFD700",
    bgColor: "#FFF9E6"
  },
  {
    name: "Mechanic",
    icon: "🔧",
    color: "#FF8C42",
    bgColor: "#FFF4E6"
  },
  {
    name: "Technician",
    icon: "⚙️",
    color: "#44A3F7",
    bgColor: "#E8F4F8"
  }
];

export default function RoleSelect() {
  const { setRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  function selectRole(roleName) {
    setSelectedRole(roleName);
    setRole(roleName);
  }

  function handleContinue() {
    if (selectedRole) {
      navigate("/skills");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E8F4F8 0%, #FFFFFF 100%)",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#5A6C7D",
            fontSize: "16px",
            marginBottom: "32px",
            padding: "8px 0"
          }}
        >
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#2C3E50",
            marginBottom: "8px"
          }}>
            Tell us about your work
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#5A6C7D",
            marginBottom: "24px"
          }}>
            This helps us give you accurate results
          </p>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#2C3E50",
            marginBottom: "24px"
          }}>
            What is your job role?
          </h2>
        </div>

        {/* Role cards */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "40px"
        }}>
          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => selectRole(role.name)}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                border: selectedRole === role.name ? "2px solid #44A3F7" : "2px solid transparent",
                boxShadow: selectedRole === role.name 
                  ? "0 4px 16px rgba(68, 163, 247, 0.2)" 
                  : "0 2px 8px rgba(0, 0, 0, 0.08)",
                transition: "all 0.2s"
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                background: role.bgColor,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px"
              }}>
                {role.icon}
              </div>
              <span style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#2C3E50",
                flex: 1
              }}>
                {role.name}
              </span>
              {selectedRole === role.name && (
                <div style={{
                  width: "24px",
                  height: "24px",
                  background: "#44A3F7",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px"
                }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "18px",
            fontWeight: "600",
            color: selectedRole ? "white" : "#9E9E9E",
            border: "none",
            borderRadius: "12px",
            cursor: selectedRole ? "pointer" : "not-allowed",
            background: selectedRole 
              ? "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)"
              : "#E0E0E0",
            boxShadow: selectedRole ? "0 4px 16px rgba(68, 163, 247, 0.3)" : "none",
            transition: "all 0.2s"
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
