import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from './home/Header';
import Footer from './home/Footer';
import Container from './home/Container';


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/api/login/', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        // setStatus(content.message);
        console.log(content);
        if (content.message == "Success") {
          return navigate('/profile');
        }
      }
    )();
  });
  return (
    <>
      <Header />
      <Container />
      <Footer />
    </>
  );
};

export default Home;