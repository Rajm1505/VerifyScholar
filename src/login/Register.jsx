import React, {useState} from "react";
import  { useNavigate} from 'react-router-dom';
import { Form } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import { useForm } from "react-hook-form";
import Footer from "./Footer";
import s_d from "../state&disctrict.json";
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

  const bgc ={backgroundColor: '#f2f2f2'};
  const bgcc ={backgroundColor: '#316eb0'};
  
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

  const onSubmit = (data) => {
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

  if(redirect){
    return navigate('/login');;
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
                  <td colspan="2">
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
                          onClick={() => { setTxtbox(true);}}
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
                  { txtbox  &&
                  <td>
                    

                      <Form.Label className="form-check-label-inline">Enter Your NSP ID:</Form.Label>
                        
                    {/* <div className="form-check form-check-inline mb-3"> */}
                      <Form.Control
                        type="text"
                        className="form-input-inline"
                        {...register("nsp_id", )}
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
                    <td colspan="2">
                    <Form.Label>Do you have State PMS Beneficiary ID:</Form.Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <div className={`form-check form-check-inline ${
                            errors.pms_benificiary_id_radio && "invalid"}`}
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
                                  {...register("pms_benificiary_id", )}
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
                              className={`form-control ${errors.category && "invalid"}`}
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
                            {errors.Category && (
                              <small className="text-danger">
                                {errors.Category.message}
                              </small>
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Form.Group>
              <Form.Group>
                <Form.Label className="col-form-label">Name:</Form.Label>
                <Form.Control
                  type="text"
                  className={`form-control ${errors.name && "invalid"}`}
                  {...register("name", { required: "Name is Required" })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
              </Form.Group>
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
              <br/>
              
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
                  className={`form-control ${errors.phone && "invalid"}`}
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
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              &nbsp;
              <Form.Group controlId="password">
                <table className="table table-hover table-bordered"> 
                    <tbody>
                      <tr>
                        
                        <td>
                            <Form.Label>Password</Form.Label>

                        </td>
                        <td>
                            <Form.Control
                              type="password"
                              name="password"
                              className={`${errors.password && "invalid"}`}
                              {...register("password", {
                                required: "paasword is Required",
                                pattern: {
                                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
                                  message:
                                    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                                },
                                minLength: {
                                  value: 8,
                                  message: "min length is 5",
                                }
                              })}
                            />
                            {errors.password && (
                              <small className="text-danger">
                                {errors.password.message}
                              </small>
                            )}
                        </td>
                          {/* </Form.Group>
                      
                          <Form.Group controlId="c_password"> */}
                        
                        <td>
                              <Form.Label>Confirm Password:</Form.Label>
                        </td>
                        <td>
                              <Form.Control
                                type="password"
                                name="c_password"
                                className={`${errors.confirmPwd ? "is-invalid" : ""}`}
                                {...register("c_password", {
                                  required: "confirm password is required",
                                })}
                              />
                              {errors.c_password && (
                                <small className="text-danger">
                                  {errors.c_password.message}
                                </small>
                              )}
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