import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E8F4F8 0%, #FFFFFF 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      position: "relative"
    }}>
      {/* Language selector */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px"
      }}>
        <button style={{
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #E0E0E0",
          background: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          color: "#333"
        }}>
          <span>🌐</span>
          <span>हिंदी</span>
        </button>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "600px",
        width: "100%",
        textAlign: "center"
      }}>
        {/* Logo Icon */}
        <div style={{
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, #4ECDC4 0%, #44A3F7 100%)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
          boxShadow: "0 8px 24px rgba(68, 163, 247, 0.2)"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "white",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "12px",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{ width: "100%", height: "12px", background: "#4ECDC4", borderRadius: "4px" }}></div>
            <div style={{ width: "80%", height: "12px", background: "#44A3F7", borderRadius: "4px" }}></div>
            <div style={{ width: "60%", height: "12px", background: "#4ECDC4", borderRadius: "4px" }}></div>
          </div>
        </div>

        {/* Brand name */}
        <h1 style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "#2C3E50",
          marginBottom: "16px",
          letterSpacing: "-0.5px"
        }}>
          SkillGuard
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: "20px",
          color: "#5A6C7D",
          marginBottom: "48px",
          lineHeight: "1.5"
        }}>
          Know if your skills are future-safe
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/role")}
          style={{
            padding: "18px 48px",
            fontSize: "18px",
            fontWeight: "600",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            background: "linear-gradient(90deg, #44A3F7 0%, #4ECDC4 100%)",
            boxShadow: "0 4px 16px rgba(68, 163, 247, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
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
          Check My Skill Risk
          <span style={{ fontSize: "20px" }}>→</span>
        </button>
      </div>

      {/* Feature cards */}
      <div style={{
        display: "flex",
        gap: "24px",
        maxWidth: "1000px",
        width: "100%",
        marginTop: "auto",
        padding: "40px 20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {/* Quick & Simple */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          flex: "1",
          minWidth: "250px",
          maxWidth: "300px",
          textAlign: "center"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "#44A3F7",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "24px"
          }}>
            ✓
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#2C3E50", marginBottom: "8px" }}>
            Quick & Simple
          </h3>
          <p style={{ fontSize: "14px", color: "#5A6C7D", lineHeight: "1.5" }}>
            Get your skill risk report in 2 minutes
          </p>
        </div>

        {/* Stay Ahead */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          flex: "1",
          minWidth: "250px",
          maxWidth: "300px",
          textAlign: "center"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "#4ECDC4",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "24px"
          }}>
            ⭐
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#2C3E50", marginBottom: "8px" }}>
            Stay Ahead
          </h3>
          <p style={{ fontSize: "14px", color: "#5A6C7D", lineHeight: "1.5" }}>
            Learn what skills to add before it's too late
          </p>
        </div>

        {/* Built for You */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          flex: "1",
          minWidth: "250px",
          maxWidth: "300px",
          textAlign: "center"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "#E8F4F8",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "24px"
          }}>
            👥
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#2C3E50", marginBottom: "8px" }}>
            Built for You
          </h3>
          <p style={{ fontSize: "14px", color: "#5A6C7D", lineHeight: "1.5" }}>
            Made for electricians, mechanics, and technicians
          </p>
        </div>
      </div>
    </div>
  );
}
