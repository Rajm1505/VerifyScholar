import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './login/Login';
import Register from './login/Register';
import Contact_Us from './login/Contact_us';
import StuApp from './innerPage/App_model/StuApp';
import StuDoc from './innerPage/App_model/StuDoc';
import DigiDemo from './DigiDemo'

function App() {
  const [sid, setSid] = useState();

  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch('http://127.0.0.1:8000/api/user/', {
  //         headers: { 'Content-Type': 'appliction/json' },
  //         credentials: 'include',
          
  //       });
  //       const content = await response.json();
  //       setSid(content.sid);
  //     }
  //   )();
  // });

  return (

    <>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/contact' element={<Contact_Us/>} />
      {/* <Route path='/StuApp' element={() => <StuApp  sid={sid}/>} /> */}
      <Route path='/StuApp' element={<StuApp/>} />
      <Route path='/StuDoc' element={<StuDoc />} />
      <Route path='/digidemo' element={<DigiDemo />} />

    </Routes>
    </>

  );
}

export default App;
