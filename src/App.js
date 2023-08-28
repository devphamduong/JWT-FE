import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import User from './components/ManageUser/User';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <>
      <div className="app-container">
        {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
      </div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/users' element={<User />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
