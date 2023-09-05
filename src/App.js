import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Navigation/Nav';
import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <>
      <div className="app-header">
        <Nav />
      </div>
      <div className="app-container">
        <AppRoutes />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
