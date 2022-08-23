import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
// import { FaTimes, FaBars } from "react-icons/fa";
import "../style/nnav.css";
import useScript from 'react-script-hook';
import { Helmet } from "react-helmet";
const Header = () => {
  // const navRef = useRef();

  // const shownavbar = () => {
  //   navRef.current.classList.toggle("responsive_nav");
  // };


  // const hamburger = document.querySelector(".hamburger");
  // const navMenu = document.querySelector(".nav-menu");

  // hamburger.addEventListener("click", () => {
  //   hamburger.classList.toggle("active");
  //   navMenu.classList.toggle("active");
  // });

  // document.querySelector(".nav-link").forEach(n => n.addEventListener("click", () => {
  //   hamburger.classList.remove("active");
  //   navMenu.classList.remove("active");
  // }));
  
  useScript("./script.js");
  return (
    <>
      {/* <Helmet>

        <script src={navjs} type="text/javascript"></script>
      </Helmet> */}
      <header>
        <nav className="navbar">
          <p className="nav-branding">react</p>
          <ul className="nav-menu" >
            <li>
              <NavLink className="nav-link a" to="#" >a</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link a" to="#" >b</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link a" to="#" >c</NavLink>
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>

      </header>
    </>
  );
}

export default Header;
