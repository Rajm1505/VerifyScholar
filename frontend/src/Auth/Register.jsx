import React, { useState, useEffect }   from "react";
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Footer from "./Footer";
import { useRef } from "react";

// import * as Yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'


function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const bgc = { backgroundColor: '#f2f2f2' };

  // ---------------------------------------------------------------------------------
  const [txtbox, setTxtbox] = useState(false);
  const [txtbox1, setTxtbox1] = useState(false);
  // ---------------------------------------------------------------------------------
  const Category = [
    { label: "SC", value: "sc" },
    { label: "OBC", value: "obc" },
  ];

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [FullName, setFullName] = useState();
  const password = useRef();
  const cPassword = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState('form-control');
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [Pass, setPass] = useState();


  useEffect(() => {
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid')
      }
    }
  }, [isCPasswordDirty])


  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid')
      }
    }
    setPass(password.current.value)
  }
  console.log('password', Pass)

  const onSubmit = (data) => {
    data.name = FullName;
    data.password = Pass;
    console.log(data);
    const Data1 = JSON.stringify(data);
    console.log(Data1);
    axios
      .post("http://127.0.0.1:8000/api/register/", Data1)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();
    setRedirect(true);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleonBlurDiv = (e) => {
    let fullName = lastName + " " + firstName;
    setFullName(fullName);
  }

  if (redirect) {
    return navigate('/login');
  }


  return (
    <>
      <Header />
      <div className="container pt-5">

        <div className="row justify-content-sm-center pt-5" >
          <div className="col-sm-8 shadow round pb-3" style={bgc}>
            <h1 className="text-center pt-3 text-secondary">
              Student Registration Form
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group >
                <table className="table table-hover table-bordered" >
                  <tbody>

                    <tr>
                      <td colSpan="2">
                        <Form.Label>Do You have NSP ID: </Form.Label>
                        <br />
                        <Form.Text id="passwordHelpBlock" muted>
                          (For Post/Pre Matric Scholarship for SCs, Post/Pre Matric
                          Scholarship for OBCs, or Top-Class Scholarship Schemes for SCs
                          and OBCs (TCS) in the immediately preceding year)
                        </Form.Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={`form-check form-check-inline ${errors.nsp_id_radio && "invalid"}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            value={true}
                            name="nsp_id_radio"
                            onClick={() => { setTxtbox(true); }}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={false}
                            name="nsp_id_radio"
                            onClick={() => { setTxtbox(false); }}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                      {txtbox &&
                        <td>
                          <Form.Label className="form-check-label-inline">Enter Your NSP ID:</Form.Label>

                          {/* <div className="form-check form-check-inline mb-3"> */}
                          <Form.Control
                            type="text"
                            className="form-input-inline"
                            {...register("nsp_id",)}
                          />

                          {errors.nsp_id && (
                            <small className="text-danger">
                              {errors.nsp_id.message}
                            </small>
                          )}

                        </td>
                      }
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <Form.Label>Do you have State PMS Beneficiary ID:</Form.Label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className={`form-check form-check-inline ${errors.pms_benificiary_id_radio && "invalid"}`}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            value="true"
                            name="pms_benificiary_id_radio"
                            onClick={() => { setTxtbox1(true); }}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="false"
                            name="pms_benificiary_id_radio"
                            onClick={() => { setTxtbox1(false); }}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                      {txtbox1 &&
                        <td>
                          <div className="float-right form-check ">
                            <Form.Label className="form-check-label-inline float-right">
                              Enter Your State PMS Beneficiary ID:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-input-inline float-right"
                              {...register("pms_benificiary_id",)}
                            />
                          </div>
                          {errors.pms_benificiary_id && (
                            <small className="text-danger">
                              {errors.pms_benificiary_id.message}
                            </small>
                          )}
                        </td>
                      }
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <label className="col-form-label">Category :</label>
                      </td>
                      <td>
                        <Form.Select
                          className={`form-control ${errors.caste_category && "invalid"}`}
                          {...register("caste_category", {
                            required: "Category is Required",
                          })}
                        >
                          <option >-- Select -- </option>
                          {Category.map((Category) => (
                            <option key={Category.value} value={Category.value}>
                              {Category.label}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.caste_category && (
                          <small className="text-danger">
                            {errors.caste_category.message}
                          </small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <div onBlur={handleonBlurDiv}>
                <Form.Group>
                  <Form.Label className="col-form-label">First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={handleFirstName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="col-form-label">Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    onChange={handleLastName}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <label className="col-form-label">Father Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.fname && "invalid"}`}
                  {...register("fname", {
                    required: "Father Name is Required",
                  })}
                  onKeyUp={() => {
                    trigger("fname");
                  }}
                />
                {errors.fname && (
                  <small className="text-danger">{errors.fname.message}</small>
                )}

              </Form.Group>
              <br />

              <div className="form-group">
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email && "invalid"}`}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Phone:</label>
                <input
                  type="text"
                  className={`form-control ${errors.mobile_number && "invalid"}`}
                  {...register("mobile_number", {
                    required: "Phone is Required",
                    pattern: {
                      value:
                        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                      message: "Invalid phone no",
                    },
                    minLength: {
                      value: 10,
                      message: "min length is 10",
                    },
                    mixLength: {
                      value: 10,
                      message: "min length is 10",
                    }
                  })}
                  onKeyUp={() => {
                    trigger("mobile_number");
                  }}
                />
                {errors.mobile_number && (
                  <small className="text-danger">{errors.mobile_number.message}</small>
                )}
              </div>
              &nbsp;
              <Form.Group>
              <label className="col-form-label">
                  Adhaar No. / Application ID
                </label>

                <input
                  type="text"
                  className={`form-control ${errors.aadhaar_no && "invalid"
                    }`}
                  {...register("aadhaar_no", {
                    required: "Adhaar No./Application ID is Required",
                  })}
                  onKeyUp={() => {
                    trigger("aadhaar_no");
                  }}
                />
                {errors.aadhaar_no && (
                  <small className="text-danger">
                    {errors.aadhaar_no.message}
                  </small>
                )}
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>

                      <td>
                        <Form.Label>Password</Form.Label>

                      </td>
                      <td>
                        <div>
                          <Form.Control
                            type="password"
                            // name="password"
                            // {...register("password",
                            //  {
                            //   required: false,
                            //   pattern: {
                            //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
                            //     message:
                            //       "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                            //   },
                            //   minLength: {
                            //     value: 8,
                            //     message: "min length is 5",
                            //   }
                            // })}
                            ref={password}
                            id="password"
                          />
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password.message}
                            </small>
                          )}
                        </div>
                      </td>
                      {/* </Form.Group> */}

                      {/* <Form.Group controlId="c_password"> */}

                      <td>
                        <Form.Label>Confirm Password:</Form.Label>
                      </td>
                      <td>
                        <Form.Control
                          type="password"
                          // name="c_password"
                          className={cPasswordClass}
                          // {...register("c_password", {
                          //   // required: true
                          // })}
                          ref={cPassword}
                          onChange={checkPasswords}
                          id="c_password"
                        />
                        {showErrorMessage && isCPasswordDirty ? <div> Passwords did not match </div> : ''}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <input
                type="submit"
                className="btn-lg btn-primary my-3 "
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;