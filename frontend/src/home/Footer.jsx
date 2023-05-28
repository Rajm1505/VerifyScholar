import React from 'react';
import {NavLink} from "react-router-dom";

const Footer = () => {
  return (
    // <div>Footer</div>

    <>
    <footer className="">
	<div className="bg-yellow">
		<div className="container-xxl">
			<div className="row">
				<ul className="my-2 text-center fs-7 footer-link">
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="/">Home</NavLink></li>
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="docs/gui2023.pdf" target="_blank">Scheme Guidelines</NavLink></li>
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="login">login</NavLink></li>
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="update password">Update Password</NavLink></li>
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="register">Register</NavLink></li>
					<li className="d-inline-block"><NavLink className="text-black fw-light py-0 px-2" to="contact">Contact Us</NavLink></li>
				 </ul>
			</div>
		</div>
	</div>
	<div className="footer-bg">
	<div className="container-xxl">
	 <div className="d-flex justify-content-start align-items-center pt-4 pb-3">
		 <img src="images_home/nic-logo.png" alt=" " />
		 <p className="flex-fill text-center text-white fw-light fs-7 mb-0">This site is designed, developed, hosted and maintained by National Informatics Centre,Department of Social Justice and Empowerment, Ministry of Social Justice <br/>and Empowerment, Government of India.</p>
	 </div>	
	</div>
	<hr className="footer-line my-2" />
	<div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' ,color: '#808080' }}>
        © 2022 Copyright: dosje for smart india Hackthon 
        
      </div>
   </div>
</footer>   
    </>
  );
};

export default Footer;