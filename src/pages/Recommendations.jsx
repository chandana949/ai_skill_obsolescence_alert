import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { roleRisk, skillImpact } from "../riskRules";
import aiService from "../services/aiService";

// Base recommendations that can be customized based on role and risk
const baseRecommendations = {
  Electrician: [
    {
      title: "Solar Panel Installation",
      description: "Growing demand as homes switch to solar power",
      demand: 95,
      duration: "3-4 months",
      level: "Easy",
      priority: "High"
    },
    {
      title: "Smart Home Systems",
      description: "Automated lighting, security, and climate control",
      demand: 88,
      duration: "2-3 months",
      level: "Easy",
      priority: "High"
    },
    {
      title: "EV Charging Station Setup",
      description: "Essential skill as electric vehicles become mainstream",
      demand: 82,
      duration: "4-5 months",
      level: "Medium",
      priority: "Growing"
    },
    {
      title: "Energy Storage Systems",
      description: "Battery backup and grid integration technologies",
      demand: 75,
      duration: "5-6 months",
      level: "Medium",
      priority: "Growing"
    }
  ],
  Mechanic: [
    {
      title: "EV Maintenance & Repair",
      description: "Critical skill as electric vehicles dominate the market",
      demand: 92,
      duration: "4-5 months",
      level: "Medium",
      priority: "High"
    },
    {
      title: "Hybrid Vehicle Systems",
      description: "Understanding both electric and combustion systems",
      demand: 85,
      duration: "3-4 months",
      level: "Medium",
      priority: "High"
    },
    {
      title: "Diagnostic Software",
      description: "Modern vehicle diagnostics and computer systems",
      demand: 78,
      duration: "2-3 months",
      level: "Easy",
      priority: "Growing"
    },
    {
      title: "Battery Technology",
      description: "Lithium-ion and advanced battery systems",
      demand: 70,
      duration: "5-6 months",
      level: "Hard",
      priority: "Growing"
    }
  ],
  Technician: [
    {
      title: "Industrial Automation",
      description: "PLC programming and automated systems",
      demand: 90,
      duration: "4-6 months",
      level: "Medium",
      priority: "High"
    },
    {
      title: "IoT Integration",
      description: "Connecting devices and systems to the internet",
      demand: 85,
      duration: "3-4 months",
      level: "Medium",
      priority: "High"
    },
    {
      title: "Smart Home Systems",
      description: "Automated lighting, security, and climate control",
      demand: 80,
      duration: "2-3 months",
      level: "Easy",
      priority: "Growing"
    },
    {
      title: "Energy Management Systems",
      description: "Monitoring and optimizing energy consumption",
      demand: 75,
      duration: "4-5 months",
      level: "Medium",
      priority: "Growing"
    }
  ]
};

// Default recommendations if no role is selected
const defaultRecommendations = baseRecommendations.Electrician;

function getPersonalizedRecommendations(role, skills, totalRisk) {
  let recommendations = baseRecommendations[role] || defaultRecommendations;
  
  // Filter out recommendations for skills the user already has
  const userSkillLower = skills.map(s => s.toLowerCase());
  recommendations = recommendations.filter(rec => {
    const recTitleLower = rec.title.toLowerCase();
    return !userSkillLower.some(skill => recTitleLower.includes(skill));
  });

  // If user has high risk, prioritize high-priority recommendations
  if (totalRisk >= 70) {
    recommendations = recommendations.sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (b.priority === "High" && a.priority !== "High") return 1;
      return b.demand - a.demand;
    });
  }

  // Return top 4 recommendations
  return recommendations.slice(0, 4);
}

export default function Recommendations() {
  const { role, skills, totalRisk = 0 } = useContext(UserContext);
  const [selectedPath, setSelectedPath] = useState(null);
  
  const recommendations = getPersonalizedRecommendations(role, skills, totalRisk);

  async function handleViewLearningPath(recommendation) {
    setSelectedPath(recommendation);
    
    // Get AI-generated learning path
    try {
      const learningPath = await aiService.generateLearningPath(recommendation.title, role);
      
      const message = `Learning Path for ${recommendation.title}:\n\n` +
        `Duration: ${recommendation.duration}\n` +
        `Level: ${recommendation.level}\n` +
        `Demand: ${recommendation.demand}%\n\n` +
        `Steps to Master:\n${learningPath.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n` +
        `Resources:\n${learningPath.resources.map(r => `• ${r}`).join('\n')}\n\n` +
        `Timeline: ${learningPath.timeline}`;
      
      alert(message);
    } catch (error) {
      // Fallback to basic message
      alert(`Learning Path for ${recommendation.title}:\n\n` +
            `Duration: ${recommendation.duration}\n` +
            `Level: ${recommendation.level}\n` +
            `Demand: ${recommendation.demand}%\n\n` +
            `This learning path will help you master ${recommendation.title.toLowerCase()} and stay competitive in the evolving job market.`);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E8F4F8 0%, #FFFFFF 100%)",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        {/* Header */}
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#2C3E50",
          marginBottom: "12px",
          textAlign: "center"
        }}>
          These skills will keep you competitive and in-demand
        </h1>
        
        {role && (
          <p style={{
            fontSize: "16px",
            color: "#5A6C7D",
            textAlign: "center",
            marginBottom: "40px"
          }}>
            Personalized recommendations for {role}
          </p>
        )}

        {/* Recommendations grid */}
      {recommendations.length > 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            {recommendations.map((rec, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                  position: "relative"
                }}
              >
                {/* Priority badge */}
                <div style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  background: rec.priority === "High" ? "#E8F4F8" : "#FFF4E6",
                  border: `1px solid ${rec.priority === "High" ? "#44A3F7" : "#FFA726"}`
                }}>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: rec.priority === "High" ? "#44A3F7" : "#FFA726"
                  }}>
                    {rec.priority}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#2C3E50",
                  marginBottom: "8px",
                  paddingRight: "100px"
                }}>
                  {rec.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: "16px",
                  color: "#5A6C7D",
                  marginBottom: "24px",
                  lineHeight: "1.5"
                }}>
                  {rec.description}
                </p>

                {/* Metrics */}
                <div style={{
                  display: "flex",
                  gap: "32px",
                  marginBottom: "24px",
                  flexWrap: "wrap"
                }}>
                  {/* Demand */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#E8F9F7",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      📈
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#5A6C7D",
                        marginBottom: "2px"
                      }}>
                        Demand
                      </div>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#2C3E50"
                      }}>
                        {rec.demand}%
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#E8F4F8",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      🕐
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#5A6C7D",
                        marginBottom: "2px"
                      }}>
                        Duration
                      </div>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#2C3E50"
                      }}>
                        {rec.duration}
                      </div>
                    </div>
                  </div>

                  {/* Level */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      background: "#F3E5F5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      🎯
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#5A6C7D",
                        marginBottom: "2px"
                      }}>
                        Level
                      </div>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#2C3E50"
                      }}>
                        {rec.level}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleViewLearningPath(rec)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)",
                    boxShadow: "0 2px 8px rgba(68, 163, 247, 0.2)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(68, 163, 247, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(68, 163, 247, 0.2)";
                  }}
                >
                  View Learning Path →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)"
          }}>
            <p style={{
              fontSize: "18px",
              color: "#5A6C7D"
            }}>
              No recommendations available. Please select a role and skills to get personalized recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
