import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function getRiskLevel(risk) {
  if (risk >= 70) return { level: "High Risk", color: "#FF6B6B", bgColor: "#FFE6E6", borderColor: "#FF6B6B" };
  if (risk >= 40) return { level: "Medium Risk", color: "#FFA726", bgColor: "#FFF3E0", borderColor: "#FFA726" };
  return { level: "Low Risk", color: "#4ECDC4", bgColor: "#E8F9F7", borderColor: "#4ECDC4" };
}

function getTimeEstimate(risk) {
  if (risk >= 70) return "2-3 years";
  if (risk >= 40) return "5-7 years";
  return "10+ years";
}

function getRiskMessage(risk) {
  if (risk >= 70) {
    return "Your current skills are at high risk. Consider learning automation-resistant skills and new technologies immediately to stay competitive.";
  }
  if (risk >= 40) {
    return "Your current skills are good, but new smart home and solar technologies are changing the field. Learning these will keep you in demand.";
  }
  return "Your skills are well-positioned for the future. Continue staying updated with industry trends to maintain your competitive edge.";
}

export default function Result() {
  const { role, skills, totalRisk = 0 } = useContext(UserContext);
  const navigate = useNavigate();
  const riskInfo = getRiskLevel(totalRisk);
  const timeEstimate = getTimeEstimate(totalRisk);

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
        {/* Risk indicator */}
        <div style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          <div style={{
            width: "120px",
            height: "120px",
            background: riskInfo.bgColor,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            border: `4px solid ${riskInfo.borderColor}`
          }}>
            <span style={{
              fontSize: "48px",
              color: riskInfo.color
            }}>
              {totalRisk >= 70 ? "⚠️" : totalRisk >= 40 ? "⚡" : "✓"}
            </span>
          </div>
          <div style={{
            display: "inline-block",
            padding: "8px 20px",
            background: riskInfo.bgColor,
            border: `2px solid ${riskInfo.borderColor}`,
            borderRadius: "20px",
            marginBottom: "8px"
          }}>
            <span style={{
              fontSize: "16px",
              fontWeight: "600",
              color: riskInfo.color
            }}>
              {riskInfo.level}
            </span>
          </div>
          <p style={{
            fontSize: "14px",
            color: "#5A6C7D",
            marginTop: "8px"
          }}>
            Your Skill Risk Level
          </p>
        </div>

        {/* Time estimate card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
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
              🕐
            </div>
            <span style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#2C3E50"
            }}>
              Estimated Time
            </span>
          </div>
          <h3 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#2C3E50",
            marginBottom: "16px"
          }}>
            {timeEstimate}
          </h3>
          <div style={{
            position: "relative",
            height: "8px",
            background: "#E0E0E0",
            borderRadius: "4px",
            marginTop: "20px"
          }}>
            <div style={{
              position: "absolute",
              left: "0",
              width: `${Math.min((totalRisk / 100) * 100, 100)}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${riskInfo.color} 0%, ${riskInfo.borderColor} 100%)`,
              borderRadius: "4px"
            }}></div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            fontSize: "12px",
            color: "#5A6C7D"
          }}>
            <span>Now</span>
            <span>Future</span>
          </div>
        </div>

        {/* Explanation card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          border: `2px solid ${riskInfo.borderColor}`,
          marginBottom: "32px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px"
          }}>
            <div style={{
              width: "24px",
              height: "24px",
              background: riskInfo.bgColor,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: riskInfo.color,
              fontSize: "14px",
              fontWeight: "700"
            }}>
              i
            </div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2C3E50"
            }}>
              What does this mean?
            </h3>
          </div>
          <p style={{
            fontSize: "16px",
            color: "#5A6C7D",
            lineHeight: "1.6"
          }}>
            {getRiskMessage(totalRisk)}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => navigate("/recommendations")}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            background: "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)",
            boxShadow: "0 4px 16px rgba(68, 163, 247, 0.3)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(68, 163, 247, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(68, 163, 247, 0.3)";
          }}
        >
          See Skill Recommendations →
        </button>
      </div>
    </div>
  );
}
