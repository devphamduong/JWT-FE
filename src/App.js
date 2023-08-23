import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Nav from './components/Navigation/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <>
      <div className="app-container">
        <Nav />
      </div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
