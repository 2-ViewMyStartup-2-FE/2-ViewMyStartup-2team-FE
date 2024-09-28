import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import StartupPage from "./pages/StartupPage";
import MyCompare from "./pages/Compare";
import CompareResultPage from "./pages/CompareResultPage";
import CompareStatusPage from "./pages/CompareStatusPage";
import InvestStatusPage from "./pages/InvestStatusPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="CompanyDetailPage" element={<CompanyDetailPage />} />
          <Route path="compare" element={<MyCompare />} />
          <Route path="compare-result" element={<CompareResultPage />} />
          <Route path="compare-status" element={<CompareStatusPage />} />
          <Route path="invest-status" element={<InvestStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
