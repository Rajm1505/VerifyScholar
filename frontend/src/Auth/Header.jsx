import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import govlogo from "../images/government-logo.png";
import "../style/nav.css";
import "./page.css";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {

	const [detail, setDetail] = useState('');
	const navigate = useNavigate();
	const [redirect, setRedirect] = useState(false);

	// useEffect(() => {
	// 	(
	// 		async () => {
	// 			const response = await fetch('http://127.0.0.1:8000/api/registerfetch/', {
	// 				headers: { 'Content-Type': 'appliction/json' },
	// 				credentials: 'include',

	// 			});
	// 			const content = await response.json();
	// 			console.log(content);
	// 			setSid(content.name);
	// 			setDetail(content.detail);

	// 		}
	// 	)();
	// });

	// const logout = async () => {
	// 	fetch('http://127.0.0.1:8000/api/logout/', {
	// 		method: "POST",
	// 		headers: { 'Content-Type': 'appliction/json' },
	// 		credentials: 'include',
	// 	});
	// 	setSid('');
	// 	setRedirect(true);
	// }


	// if (redirect) {
	// 	return navigate('/login');;
	// }

	// let menu;
	// if (detail == "Unauthenticated") {
	// 	menu = (
	// 		<>
	// 			<Nav className="me-auto nt">
	// 				<Nav.Link href="/" className="navlink hover-zoom nt" >Home</Nav.Link>
	// 				<Nav.Link href="/register" className="navlink hover-zoom nt">Register</Nav.Link>
	// 				<Nav.Link href="/contact" className="navlink hover-zoom nt">Contact Us</Nav.Link>
	// 			</Nav>
	// 			<Nav>
	// 				<Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none">Login</Nav.Link>
	// 			</Nav>
	// 		</>
	// 	)
	// } else {
	// 	menu = (
	// 		<>
	// 			<Nav className="me-auto nt">
	// 				<Nav.Link href="/StuApp" className="navlink hover-zoom nt">Student Application Form</Nav.Link>
	// 				<Nav.Link href="/StuDoc" className="navlink hover-zoom nt">Student Documente Form</Nav.Link>
	// 			</Nav>
	// 			<Nav>
	// 				<Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none" onClick={logout}>Logout</Nav.Link>
	// 			</Nav>
	// 		</>
	// 	)
	// }

	return (
		<>
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
							<Nav.Link href="/" className="navlink hover-zoom nt" >Home</Nav.Link>
							<Nav.Link href="/register" className="navlink hover-zoom nt">Register</Nav.Link>
							<Nav.Link href="/contact" className="navlink hover-zoom nt">Contact Us</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link href="/login" className="text-dark text-gradient btn-warning nt px-4 text-decoration-none">Login</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

		</>

	);
};

export default Header;
