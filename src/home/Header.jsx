import React ,{useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import {FaTimes , FaBars} from "react-icons/fa"
import "../style/nav.css"
function Header() {

  const navRef = useRef();

  const shownavbar =() => {
    navRef.current.classList.toggle("responsive_nav")
  }
  return (
    <>
      {/* Main Header
        <br />
        <NavLink to="/login" >login</NavLink>
        <br />
        <NavLink to="/StuApp" >Student Application Form </NavLink>

        <br />
        <NavLink to="/StuDoc" > Student Documente Form </NavLink> */}

      <header>
          <h3>Home Page </h3>
          <nav ref={navRef} >
            <NavLink to="/StuApp" className="navlink">Student Application Form </NavLink>
            <NavLink to="/StuDoc" className="navlink"> Student Documente Form </NavLink>
            <NavLink to="#" className="navlink">Scheme Guidelines</NavLink>
            <NavLink to="#" className="navlink">FaQ's</NavLink>
            <NavLink to="/register" className="navlink">Register</NavLink>
            <NavLink to="/contact" className="navlink">Contact Us</NavLink>
            <NavLink to="/login" className="float-right btn rounded-pill bg-yellow py-2 px-4 fs-7 fw-bold">login</NavLink>
            <button className="nav-btn nav-close-btn" onClick={shownavbar}>
                <FaTimes/>
            </button>
          </nav>
            <button className="nav-btn nav-close-btn" onClick={shownavbar}>
              <FaBars/>
            </button>
      </header>

    </>
  );
};

export default Header;