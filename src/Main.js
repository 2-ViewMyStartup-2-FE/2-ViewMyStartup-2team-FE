import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./component/App";
import StartupPage from "./page/StartupPage";
import MyCompare from "./page/Compare";


export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<StartupPage />}/>
          <Route path="/compare" element={<MyCompare />} 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
