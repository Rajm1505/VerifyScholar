import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Form, FormLabel, Button } from "react-bootstrap";

import Header from "../Header";

export default function PersonalProfile(props) {
    const navigate = useNavigate();
    const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [aadhaar, setAadhaar] = useState();
  const [status, setStatus] = useState();

    useEffect(() => {
        (
          async () => {
            const response = await fetch('http://127.0.0.1:8000/api/registerfetch/', {
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            const content = await response.json();
            setName(content.name);
            setEmail(content.email);
            setAadhaar(content.aadhaar);
            setPhone(content.mobile_number);
            setStatus(content.mobile_number);
            console.log(content);
            if (content.detail == "Unauthenticated") {
              return navigate('/login');
            }
          }
        )();
      });

  return (
    <>
    <Header />
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' , background: "linear-gradient(194deg, rgba(0,0,0,0.919502835313813) 0%, rgba(6,69,120,0.950315160243785) 50%, rgba(209,185,32,0.8886905103838411) 100%)"
                }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{name}</MDBTypography>
                  {/* <MDBCardText>Web Designer</MDBCardText> */}
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{phone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Verification Status</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6" style={{color :"red"}}>{props.message} </MDBTypography>

                        {/* <MDBCardText className="text-muted">info@example.com</MDBCardText> */}
                        <a href="http://127.0.0.1:8000/api/getfiles">
                            <Button variant="info" >Manual Verification</Button>
                            </a>
                        {/* <MDBCardTex\\ className="text-muted">info@example.com</MDBCardText> */}
                      </MDBCol>
                      {/* <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol> */}
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}