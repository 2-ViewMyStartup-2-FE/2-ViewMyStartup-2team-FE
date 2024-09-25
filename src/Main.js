import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
