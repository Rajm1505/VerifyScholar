import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ContactUs from './Auth/ContactUs';
import StuApp from './innerPage/App_model/StuApp';
import StuDoc from './innerPage/App_model/StuDoc';
import Profile from './innerPage/App_model/profile';

  
function App() {
  return (
    <>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' element={<Login /> } />
      <Route path='/register' element={<Register/>} />
      <Route path='/contact' element={<ContactUs/>} />
      <Route path='/StuApp' element={<StuApp />} />
      <Route path='/StuDoc' element={<StuDoc />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
    </>

  );
}

export default App;
