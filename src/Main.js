import "./reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import CompanyDetailPage from "./pages/CompanyDetailPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/CompanyDetailPage" element={<CompanyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
