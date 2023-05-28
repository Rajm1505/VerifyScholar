import React, { useState } from 'react';
import '../style/nav.css';
import govlogo from "../images/government-logo.png";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="nav-bg" >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand d-flex align-items-center ">
        {/* <Nav.Link className="navbar-brand d-flex align-items-center " to="#"> */}
						<img src={govlogo} className="bg-white rounded p-1" alt="central gov logo" width="45" />
						<div className="lh-1 fs-6 fw-ligh ms-2 text-dark">
							<p className="m-0 text-white fw-bold mb-1 fs-7">Free Coaching Scheme For <br />SC & OBC Students </p>
							<p className="m-0 fs-7 text-white">Department of Social Justice & Empowerment.</p>
							<p className="m-0 fs-7 text-white">Ministry of Social Justice and Empowerment.</p>
							<p className="m-0 fs-7 text-white">Government of India.</p>
						</div>
					{/* </Nav.Link> */}
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto nt">
            <Nav.Link href="#" className="navlink hover-zoom nt" >Scheme Guidelines</Nav.Link>
            <Nav.Link href="#" className="navlink hover-zoom nt">Faq's</Nav.Link>
            <Nav.Link href="/register" className="navlink hover-zoom nt">Register</Nav.Link>
            <Nav.Link href="/contact" className="navlink hover-zoom nt">Contact Us</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


