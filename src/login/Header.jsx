import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <>

    <div>Login Header</div>
    <div>

    <NavLink to="/" >Home</NavLink>
    <br/>
    <NavLink to="/register" >Register</NavLink>
    <br/>
    <NavLink to="/login" >login</NavLink>

</div>
    </>

  );
};

export default Header;