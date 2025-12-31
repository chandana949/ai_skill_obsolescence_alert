import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import SkillSelect from "./pages/SkillSelect";
import Analysis from "./pages/Analysis";
import Result from "./pages/Result";
import Recommendations from "./pages/Recommendations";
import AIChatAssistant from "./components/AIChatAssistant";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/skills" element={<SkillSelect />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/result" element={<Result />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
      <AIChatAssistant />
    </>
  );
}

export default App;
