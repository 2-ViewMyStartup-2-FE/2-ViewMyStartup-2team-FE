import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App.js";
import CompanyDetailPage from "./pages/CompanyDetailPage.js";
import StartupPage from "./pages/StartupPage.js";
import MyCompare from "./pages/Compare.js";
import CompareResultPage from "./pages/CompareResultPage.js";
import CompareStatusPage from "./pages/CompareStatusPage.js";
import InvestStatusPage from "./pages/InvestStatusPage.js";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="CompanyDetailPage" element={<CompanyDetailPage />} />
          {/* 임시로 추가해둔 라우트 */}
          <Route path="companies/:id" element={<CompanyDetailPage />} />
          <Route path="compare" element={<MyCompare />} />
          <Route path="compare-result" element={<CompareResultPage />} />
          <Route path="compare-status" element={<CompareStatusPage />} />
          <Route path="invest-status" element={<InvestStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
