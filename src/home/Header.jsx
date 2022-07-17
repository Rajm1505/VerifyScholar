import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom'
function Header() {
  return (
    <>
    <div>

     <NavLink to="/register" >Register</NavLink>
    </div>
    </>
  );
};

export default Header;