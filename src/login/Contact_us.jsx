import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
const Contact_us = () => {
  return (
    <>
    <Header/>
      <section className="section-1">




        <div className="container" 
        // style="background-color:#F3F7F5"
        >
          <div className="row">

            <center> 
                 <br />     <br />


              <h2>Free Coaching Scheme</h2>
              <h4>For Scheme Related queries</h4>
              <p>
                Shastri Bhawan
                Dr. Rajendra Prasad Road, New Delhi-110001
                <br /><strong>Phone:</strong> 011 23382391 <br />
                <strong>Email:</strong>dbtcell[dot]msje[at]nic[dot]in <br />


              </p>


              <h4>For Technical queries</h4>
              <p>
                Shastri Bhawan
                Dr. Rajendra Prasad Road, New Delhi-110001
                <br /><strong>Phone:</strong> 011 23073443 <br />
                </p>

            </center>
            </div></div>


      </section> 
      <Footer />
    </>

  );
};
export default Contact_us;
