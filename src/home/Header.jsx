import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom'; 
function Header() {
  return (
    <>
    <div>
    Main Header
    <br/>
     <NavLink to="/login" >login</NavLink>
    <br/>
     <NavLink to="/StuApp" >Student Application Form </NavLink>

    <br/>
     <NavLink to="/StuDoc" > Student Documente Form </NavLink>

    </div>
    </>
  );
};

export default Header;