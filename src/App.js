// import logo from './logo.svg';
import { useContext } from 'react';
import './App.css';

import UseReducersss from './Components/UseReducersss.jsx';
import Login from './Components/Login.js';
import { Link, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to='/'>
              Form
            </Link>
          </li>
          <li>
            <Link to='Login'>
              table
            </Link>

          </li>
        </ul>
      </div>
      <Routes>
        <Route path='/' element={<UseReducersss />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
    </div >
  );
}

export default App;
