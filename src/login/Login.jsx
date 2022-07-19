import React ,{useState} from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "./Header";

function Login ({ login }) {
    
    const [captchaResult , setCaptchaResult] = useState(); 
    const { register, handleSubmit, formState: { errors }, reset ,trigger, } = useForm();
    const onSubmit = async data => {
        data.preventDefault();
        // await login(data.email, data.password);
        reset();
    };

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
            <Form.Group className="cta">
            <ReCAPTCHA 
                sitekey="YOUR SITE KEY"
                onChange={handleSubmit}/>
            </Form.Group>

            {   captchaResult }
                {/* && */}
            <button type="submit" className="btn btn-primary my-3">SUBMIT</button>
            {/* } */}
        </form>
        </div>
      </div>
    </div>
      </>
    );
}

export default Login;