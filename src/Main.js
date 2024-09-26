import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import ComparisonResult from "./component/ComparisonResult.js";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<ComparisonResult />} />
      </Routes>
    </BrowserRouter>
  );
}
