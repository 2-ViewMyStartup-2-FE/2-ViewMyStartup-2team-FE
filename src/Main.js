import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App.js";
import CompanyDetailPage from "./pages/CompanyDetailPage.js";
import StartupPage from "./pages/StartupPage.js";
import MyCompare from "./pages/Compare.js";
import CompareResultPage from "./pages/CompareResultPage.js";
import CompareStatusPage from "./pages/CompareStatusPage.js";
import InvestStatusPage from "./pages/InvestStatusPage.js";
import LandingPage from "./pages/LandingPage.js";
import NotFoundPage from "./pages/NotPage.js";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="companies" element={<StartupPage />} />
          <Route path="companies/:id" element={<CompanyDetailPage />} />
          <Route path="compare" element={<MyCompare />} />
          <Route path="compare-result" element={<CompareResultPage />} />
          <Route path="compare-status" element={<CompareStatusPage />} />
          <Route path="invest-status" element={<InvestStatusPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
