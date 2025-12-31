import { useContext, useState, useMemo } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Role-specific skill lists
const roleSkills = {
  Electrician: [
    "Circuit Design",
    "Wiring",
    "Safety Compliance",
    "Lighting Systems",
    "Power Distribution",
    "Testing & Inspection",
    "Panel Installation",
    "Troubleshooting",
    "Code Compliance",
    "Electrical Maintenance"
  ],
  Mechanic: [
    "Engine Repair",
    "Brake Systems",
    "Transmission Work",
    "Diagnostic Tools",
    "HVAC Systems",
    "Suspension & Steering",
    "Electrical Systems",
    "Oil & Fluid Service",
    "Tire Service",
    "Welding & Fabrication"
  ],
  Technician: [
    "System Installation",
    "Network Configuration",
    "Troubleshooting",
    "Software Updates",
    "Hardware Repair",
    "Security Systems",
    "Data Backup",
    "Remote Support",
    "Documentation",
    "Customer Service"
  ]
};

const experienceOptions = [
  { label: "0-2 years", value: "0-2" },
  { label: "3-5 years", value: "3-5" },
  { label: "6+ years", value: "6+" }
];

export default function SkillSelect() {
  const { skills, setSkills, role, setExperience, experience } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedExperience, setSelectedExperience] = useState(experience || "3-5");

  // Get skills based on selected role
  const skillsList = useMemo(() => {
    return roleSkills[role] || [];
  }, [role]);

  function toggleSkill(skill) {
    setSkills(
      skills.includes(skill)
        ? skills.filter(s => s !== skill)
        : [...skills, skill]
    );
  }

  function handleExperienceChange(value) {
    setSelectedExperience(value);
    setExperience(value);
  }

  function handleContinue() {
    if (skills.length > 0) {
      navigate("/analysis");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E8F4F8 0%, #FFFFFF 100%)",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        {/* Back button */}
        <button
          onClick={() => navigate("/role")}
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

        {/* Role display */}
        {role && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "#E8F4F8",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px"
            }}>
              {role === "Electrician" ? "⚡" : role === "Mechanic" ? "🔧" : "⚙️"}
            </div>
            <span style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2C3E50"
            }}>
              {role}
            </span>
          </div>
        )}

        {!role && (
          <div style={{
            background: "#FFF3E0",
            border: "2px solid #FFA726",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "32px",
            textAlign: "center"
          }}>
            <p style={{ color: "#FF6B00", fontSize: "16px" }}>
              Please select a role first to see relevant skills.
            </p>
          </div>
        )}

        {/* Skills section */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#2C3E50",
            marginBottom: "20px"
          }}>
            Select your current skills
          </h2>
          {skillsList.length === 0 ? (
            <p style={{ color: "#5A6C7D", fontSize: "16px" }}>
              No skills available for this role. Please select a role first.
            </p>
          ) : (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px"
            }}>
              {skillsList.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                style={{
                  padding: "12px 20px",
                  fontSize: "16px",
                  fontWeight: "500",
                  border: skills.includes(skill) ? "2px solid #4ECDC4" : "2px solid #E0E0E0",
                  borderRadius: "24px",
                  background: skills.includes(skill) ? "#E8F9F7" : "white",
                  color: skills.includes(skill) ? "#2C3E50" : "#5A6C7D",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s"
                }}
              >
                {skills.includes(skill) && (
                  <span style={{ color: "#4ECDC4", fontSize: "18px" }}>✓</span>
                )}
                {skill}
              </button>
              ))}
            </div>
          )}
        </div>

        {/* Experience section */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#2C3E50",
            marginBottom: "20px"
          }}>
            How much experience do you have?
          </h2>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            }}>
              {experienceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleExperienceChange(option.value)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    border: selectedExperience === option.value ? "2px solid #44A3F7" : "2px solid #E0E0E0",
                    borderRadius: "8px",
                    background: selectedExperience === option.value ? "#E8F4F8" : "transparent",
                    color: selectedExperience === option.value ? "#44A3F7" : "#5A6C7D",
                    cursor: "pointer",
                    margin: "0 4px",
                    transition: "all 0.2s"
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {/* Visual slider indicator */}
            <div style={{
              position: "relative",
              height: "4px",
              background: "#E0E0E0",
              borderRadius: "2px",
              marginTop: "20px"
            }}>
              <div style={{
                position: "absolute",
                left: selectedExperience === "0-2" ? "0%" : selectedExperience === "3-5" ? "33.33%" : "66.66%",
                width: "33.33%",
                height: "100%",
                background: "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)",
                borderRadius: "2px",
                transition: "left 0.3s"
              }}></div>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={skills.length === 0}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "18px",
            fontWeight: "600",
            color: skills.length > 0 ? "white" : "#9E9E9E",
            border: "none",
            borderRadius: "12px",
            cursor: skills.length > 0 ? "pointer" : "not-allowed",
            background: skills.length > 0
              ? "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)"
              : "#E0E0E0",
            boxShadow: skills.length > 0 ? "0 4px 16px rgba(68, 163, 247, 0.3)" : "none",
            transition: "all 0.2s"
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
