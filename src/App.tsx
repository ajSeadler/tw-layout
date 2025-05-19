import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ParkDetail from "./components/parks/ParkDetail";
import PlanPage from "./pages/PlanPage";
import ParksPage from "./pages/ParksPage";
import AboutPage from "./pages/AboutPage";
import TripSummary from "./components/parks/trips/TripSummary";

export default function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/park/:id" element={<ParkDetail />} />
          <Route path="/planner" element={<PlanPage />} />
          <Route path="/summary" element={<TripSummary />} />
          <Route path="/parks" element={<ParksPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}
