import { createContext, useState } from "react";

const UserContext = createContext();  // ✅ only declare once

function UserProvider({ children }) {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [totalRisk, setTotalRisk] = useState(0);
  const [experience, setExperience] = useState("");
  const [aiInsights, setAiInsights] = useState(null);

  return (
    <UserContext.Provider value={{ 
      role, setRole, 
      skills, setSkills, 
      totalRisk, setTotalRisk,
      experience, setExperience,
      aiInsights, setAiInsights
    }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
