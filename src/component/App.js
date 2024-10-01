import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav.js";
import "../css/App.css";

function App() {
  return (
    <Fragment>
      <Nav />
      <Outlet />
    </Fragment>
  );
}

export default App;
