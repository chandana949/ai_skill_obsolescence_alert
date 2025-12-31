import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { roleRisk, skillImpact } from "../riskRules";
import { useNavigate } from "react-router-dom";
import aiService from "../services/aiService";

const steps = [
  { id: 1, label: "Checking industry trends", completed: false },
  { id: 2, label: "Analyzing automation impact", completed: false },
  { id: 3, label: "Preparing your results", completed: false }
];

export default function Analysis() {
  const { role, skills, setTotalRisk, experience } = useContext(UserContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(steps);
  const [aiInsights, setAiInsights] = useState(null);

  useEffect(() => {
    // Calculate total risk
    let risk = roleRisk[role] || 0;
    skills.forEach(skill => {
      risk += skillImpact[skill] || 0;
    });
    setTotalRisk(risk);

    // Get AI insights
    if (role && skills.length > 0) {
      aiService.analyzeSkills(role, skills, experience || "3-5")
        .then(insights => {
          setAiInsights(insights);
        })
        .catch(error => {
          console.error("AI analysis error:", error);
        });
    }

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Update steps sequentially
    const stepTimers = [
      setTimeout(() => {
        setCurrentSteps(prev => {
          const newSteps = [...prev];
          newSteps[0].completed = true;
          return newSteps;
        });
      }, 1000),
      setTimeout(() => {
        setCurrentSteps(prev => {
          const newSteps = [...prev];
          newSteps[1].completed = true;
          return newSteps;
        });
      }, 2500),
      setTimeout(() => {
        setCurrentSteps(prev => {
          const newSteps = [...prev];
          newSteps[2].completed = true;
          return newSteps;
        });
      }, 4000)
    ];

    // Redirect after completion
    const timer = setTimeout(() => {
      navigate("/result");
    }, 5000);

    return () => {
      clearInterval(interval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(timer);
    };
  }, [role, skills, navigate, setTotalRisk, progress]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E8F4F8 0%, #FFFFFF 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "500px",
        width: "100%",
        textAlign: "center"
      }}>
        {/* Logo icon with dots */}
        <div style={{ position: "relative", marginBottom: "40px" }}>
          <div style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #4ECDC4 0%, #44A3F7 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: "0 8px 24px rgba(68, 163, 247, 0.2)"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              background: "white",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "8px",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{ width: "100%", height: "8px", background: "#4ECDC4", borderRadius: "4px" }}></div>
              <div style={{ width: "80%", height: "8px", background: "#44A3F7", borderRadius: "4px" }}></div>
              <div style={{ width: "60%", height: "8px", background: "#4ECDC4", borderRadius: "4px" }}></div>
            </div>
          </div>
          {/* Decorative dots */}
          <div style={{
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "12px",
            background: "#44A3F7",
            borderRadius: "50%",
            opacity: 0.6
          }}></div>
          <div style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "12px",
            height: "12px",
            background: "#4ECDC4",
            borderRadius: "50%",
            opacity: 0.6
          }}></div>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#2C3E50",
          marginBottom: "8px"
        }}>
          Analyzing your skills
        </h2>
        <p style={{
          fontSize: "16px",
          color: "#5A6C7D",
          marginBottom: "40px"
        }}>
          Analyzing job trends and automation impact...
        </p>

        {/* Progress bar */}
        <div style={{
          marginBottom: "12px"
        }}>
          <div style={{
            width: "100%",
            height: "12px",
            background: "#E0E0E0",
            borderRadius: "6px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)",
              borderRadius: "6px",
              transition: "width 0.3s"
            }}></div>
          </div>
        </div>
        <p style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#2C3E50",
          marginBottom: "40px"
        }}>
          {progress}%
        </p>

        {/* Steps */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {currentSteps.map((step, index) => (
            <div
              key={step.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
              }}
            >
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: step.completed ? "#4ECDC4" : "#E0E0E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                {step.completed ? "✓" : ""}
              </div>
              <span style={{
                fontSize: "16px",
                color: step.completed ? "#2C3E50" : "#9E9E9E",
                fontWeight: step.completed ? "600" : "400"
              }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
