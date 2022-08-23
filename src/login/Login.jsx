import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "./Header";
import axios from "axios";
import Footer from "./Footer";
import swal from 'sweetalert';

function Login() {
  const navigate = useNavigate();
  const [captchaResult, setCaptchaResult] = useState();
  const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
  // const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  // var response;
  // var content;

  const onSubmit = async (e) => {
    // e.preventDefault();s
    const Data = JSON.stringify(e);
    console.log(Data);

    var response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: Data
    });
    var content = await response.json();
    setError(content.error);
    if (content.detail == "Unauthenticated") {
      swal({
        title: error,
        text: "Please Enter valid information !! ",
        icon: "error",
        button: "Ok",
        dangerMode: true,
      });
    }
    setMessage(content.message);
    // setRedirect(true);
  }
  if (message == "Success") {
    return navigate('/StuApp');
  }


  const handleRecaptcha = (value) => {
    fetch("http://127.0.0.1:8000/api/recaptcha/", {
      method: "POST",
      body: JSON.stringify({ captcha_value: value }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.captcha.success);
        console.log(data);

        setCaptchaResult(data.captcha.success);
      });
  };

  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-6 shadow round pb-3">
            <h1 className="text-center pt-3 text-secondary mb-5">
              Student Login Form
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <form  > */}
              <Form.Group>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="bi bi-person">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          fill="currentColor"
                          class="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </i>
                    </div>
                  </div>
                  <input
                    className="form-control mb-4"
                    id="email"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    type="email"
                    onKeyUp={() => {
                      trigger("email");
                    }}
                    placeholder="Enter Username"
                  />
                </div>
                {errors.email && (
                  <span className="text-danger" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i class="bi bi-lock">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="18"
                          fill="currentColor"
                          class="bi bi-lock"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                      </i>
                    </div>
                  </div>
                  <input
                    className="form-control"
                    id="password"
                    {...register("password", {
                      required: "required",
                      minLength: {
                        value: 5,
                        message: "min length is 5",
                      },
                    })}
                    type="password"
                    onKeyUp={() => {
                      trigger("password");
                    }}
                    placeholder="Enter Password"
                  />
                </div>
                {errors.password && (
                  <span className="text-danger" role="alert">
                    {errors.password.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="mt-4">
                <ReCAPTCHA
                  sitekey="6Ld7UwUhAAAAALEngXULJ7ywescW3jkh54CNCtuO"
                  onChange={handleRecaptcha}
                />
              </Form.Group>

              {/* {captchaResult
             &&  */}
              <input type="submit" className="btn btn-primary mt-4" value="login" />

              {/* }  */}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
