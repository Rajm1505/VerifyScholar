import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import govlogo from "../images/government-logo.png";
// import "../style/nav.css";
import "./page.css";

const Header = () => {
  return (
    <>
      {/* <div>Login Header</div>
      <div>

        <NavLink to="/" >Home</NavLink>
        <br />
        <NavLink to="/register" >Register</NavLink>
        <br />
        <NavLink to="/login" >login</NavLink>
        <br />
        <NavLink to="/login" >Update password</NavLink>
      </div> */}

      {/* ------------------------------------------------------------------------ */}

      <nav className="navbar py-0 sticky-top navbar-dark bg-blue navbar-expand-lg">
		 <div className="container-xxl justify-content-lg-end">
			<NavLink className="navbar-brand d-flex align-items-center d-lg-none" to="/">
				<img src={govlogo} className="bg-white rounded p-1" alt="central gov logo" width="45"/>
				<div className="lh-1 fs-6 fw-ligh ms-2 text-dark">
					<p className="m-0 text-white fw-bold mb-1 fs-7">Free Coaching Scheme For <br/>SC & OBC Students </p>
					<p className="m-0 fs-7 text-white">Department of Social Justice & Empowerment.</p>
					<p className="m-0 fs-7 text-white">Ministry of Social Justice and Empowerment.</p>
					<p className="m-0 fs-7 text-white">Government of India.</p>
				</div>
			   </NavLink>
		   <button className="navbar-toggler shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="true" aria-label="Toggle navigation">
			 <span className="navbar-toggler-icon"></span>
		   </button>
		   <div className="collapse navbar-collapse collapse show" id="navbarScroll">
			<ul className="navbar-nav me-auto my-lg-0 navbar-nav-scroll">
				<li className="nav-item">
					<NavLink className="nav-link p-0 py-1 me-4 d-inline-block active" to="/">Home</NavLink>
				 </li>
				 <li className="nav-item">
					<NavLink className="nav-link p-0 py-1 me-4 d-inline-block"  to="#" >Scheme Guidelines</NavLink>
				 </li>
				 <li className="nav-item">
					<NavLink className="nav-link p-0 py-1 me-4 d-inline-block"  to="#" >FaQ's</NavLink>
				 </li>
				<li className="nav-item">
					<NavLink className="nav-link p-0 py-1 me-4 d-inline-block" to="/register">Register</NavLink>
				 </li>
				 <li className="nav-item">
					<NavLink className="nav-link p-0 py-1 me-0 d-inline-block" to="/contact">Contact Us</NavLink>
				 </li>
			</ul>
			<NavLink to="/login" className="btn rounded-pill bg-yellow py-2 px-4 fs-7 fw-bold">Login</NavLink>
		   </div>
		 </div>
	</nav>	

    </>

  );
};

export default Header;