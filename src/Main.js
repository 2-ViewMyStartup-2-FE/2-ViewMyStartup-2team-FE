import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import StartupPage from "./page/StartupPage";
import MyCompare from "./page/Compare";
import CompareResultPage from "./page/CompareResultPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="CompanyDetailPage" element={<CompanyDetailPage />} />
          <Route path="compare" element={<MyCompare />} />
          <Route path="compare-result" element={<CompareResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
