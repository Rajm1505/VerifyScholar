import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "./Header";
import axios from 'axios';

function Login() {

  const [captchaResult, setCaptchaResult] = useState();
  const { register,handleSubmit, formState: { errors }, reset, trigger, } = useForm();

  const onSubmit = (e) => {
    // e.preventDefault()

    console.log(e);
    const Data = JSON.stringify(e);
    console.log(Data);
    axios.post('http://127.0.0.1:8000/api/recaptcha/', Data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();

  }
  const handleRecaptcha = (value) => {

    fetch('http://127.0.0.1:8000/api/recaptcha/', {
      method: 'POST',
      body: JSON.stringify({ 'captcha_value': value }),
      headers: { 'Content-Type': 'application/json' }
    })
     .then(res => res.json())
     .then(data => {
       console.log(data.captcha.success)
       console.log(data)
       
       setCaptchaResult(data.captcha.success)
     });
  }


return (
  <>

    <Header />
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow round pb-3">
          <h1 className="text-center pt-3 text-secondary">
            Student Login Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form  > */}
            <Form.Group>
              <label className="col-form-label" htmlFor="email">email</label>
              <input
                className="form-control"
                id="email"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })}
                type="email"
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && <span className="text-danger" role="alert">{errors.email.message}</span>}

            </Form.Group>
            <Form.Group >
              <label className="col-form-label" htmlFor="password">password</label>
              <input
                className="form-control"
                id="password"
                {...register("password", {
                  required: "required",
                  minLength: {
                    value: 5,
                    message: "min length is 5"
                  }
                })}
                type="password"
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && <span className="text-danger" role="alert">{errors.password.message}</span>}
            </Form.Group>
            <br />
            <Form.Group className="cta">
              <ReCAPTCHA
                sitekey="6Ld7UwUhAAAAALEngXULJ7ywescW3jkh54CNCtuO"
                onChange={handleRecaptcha} />
            </Form.Group>

            {captchaResult
             && 
            <button type="submit" className="btn btn-primary my-3" >SUBMIT</button>
             } 
          </form>
        </div>
      </div>
    </div>
  </>
);
              }

export default Login;