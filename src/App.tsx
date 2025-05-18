import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import ParkDetail from "./components/ParkDetail";

export default function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/park/:id" element={<ParkDetail />} />\
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}
