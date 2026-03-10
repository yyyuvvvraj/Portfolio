import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Triggering Vite HMR Reload for Windows Casing issues
import { useState, useEffect } from "react";
import UbuntuLayout from "./components/UbuntuLayout";
import InitialBootScreen from "./components/InitialBootScreen";
import Home from "./pages/Home";
import Telemetry from "./pages/Telemetry";
import Projects from "./pages/Projects";
import Logs from "./pages/Logs";
import Contact from "./pages/Contact";
import { GameProvider } from "./context/GameContext";

export default function App() {
  const [bootSequenceActive, setBootSequenceActive] = useState(true);

  return (
    <>
      {bootSequenceActive && <InitialBootScreen onComplete={() => setBootSequenceActive(false)} />}
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<UbuntuLayout />}>
              <Route index element={<Home />} />
              <Route path="telemetry" element={<Telemetry />} />
              <Route path="projects" element={<Projects />} />
              <Route path="logs" element={<Logs />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </GameProvider>
    </>
  );
}
