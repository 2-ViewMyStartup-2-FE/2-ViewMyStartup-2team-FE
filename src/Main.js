import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import StartupPage from "./page/StartupPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="CompanyDetailPage" element={<CompanyDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
