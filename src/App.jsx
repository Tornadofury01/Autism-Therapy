import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { VisitProvider } from "./context/VisitContext";
import { getScenario } from "./data/scenarios";
import { HomePage } from "./pages/HomePage";
import { ScenarioPage } from "./pages/ScenarioPage";
import { GrownupsPage } from "./pages/GrownupsPage";
import { PreviewPage } from "./pages/PreviewPage";
import { WatchPage } from "./pages/WatchPage";
import { AskPage } from "./pages/AskPage";
import { SummaryPage } from "./pages/SummaryPage";
import { PracticePage } from "./pages/PracticePage";
import { ColorScheme } from "./components/ColorScheme";

function ScenarioScreen({ page: Page }) {
  const { scenarioId } = useParams();
  const scenario = getScenario(scenarioId);
  if (!scenario) return <Navigate to="/scenarios" replace />;
  return <Page scenario={scenario} />;
}

function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      Skip to content
    </a>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="animate-screen">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenarios" element={<ScenarioPage />} />
        <Route path="/grownups" element={<GrownupsPage />} />
        <Route path="/visit/:scenarioId/preview" element={<ScenarioScreen page={PreviewPage} />} />
        <Route path="/visit/:scenarioId/watch" element={<ScenarioScreen page={WatchPage} />} />
        <Route path="/visit/:scenarioId/ask" element={<ScenarioScreen page={AskPage} />} />
        <Route path="/visit/:scenarioId/summary" element={<ScenarioScreen page={SummaryPage} />} />
        <Route path="/visit/:scenarioId/practice" element={<ScenarioScreen page={PracticePage} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <VisitProvider>
        <SkipLink />
        <AnimatedRoutes />
        <ColorScheme />
      </VisitProvider>
    </BrowserRouter>
  );
}
