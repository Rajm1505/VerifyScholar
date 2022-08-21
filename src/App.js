import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './login/Login';
import Register from './login/Register';
import ContactUs from './login/ContactUs';
import StuApp from './innerPage/App_model/StuApp';
import StuDoc from './innerPage/App_model/StuDoc';
import DigiDemo from './DigiDemo'

function App() {
  // const [sid, setSid] = useState();

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
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/StuApp' element={<StuApp />} />
      <Route path='/StuDoc' element={<StuDoc />} />

    </Routes>
    </>

  );
}

export default App;
