import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ParkDetail from "./components/parks/ParkDetail";
import PlanPage from "./pages/PlanPage";
import ParksPage from "./pages/ParksPage";
import AboutPage from "./pages/AboutPage";
import TripSummary from "./components/parks/trips/TripSummary";
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";
import PlanYourVisit from "./components/parks/PlanYourVist";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize a single query client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DefaultLayout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/park/:id"
              element={
                <Suspense fallback={<div className="p-8">Loading park...</div>}>
                  <ParkDetail />
                </Suspense>
              }
            />
            <Route path="/planner" element={<PlanPage />} />
            <Route path="/summary" element={<TripSummary />} />
            <Route path="/parks" element={<ParksPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/alerts" element={<PlanYourVisit />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
