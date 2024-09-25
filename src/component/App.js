import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import './css/App.css';

function App() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}

export default App;
