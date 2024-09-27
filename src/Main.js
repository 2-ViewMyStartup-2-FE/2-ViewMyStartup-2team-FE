import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import StartupPage from "./page/StartupPage";
import InvestStatusPage from "./page/InvestStatusPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<StartupPage />} />
          <Route path="/invest-status" element={<InvestStatusPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
