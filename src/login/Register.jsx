import React, { useState } from "react";
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

  const bgc = { backgroundColor: "#f2f2f2" };
  // const bgcc = { backgroundColor: "#316eb0" };

  // ---------------------------------------------------------------------------------
  const [txtbox, setTxtbox] = useState(false);
  const [txtbox1, setTxtbox1] = useState(false);
  // const handlebox = (e) => {
  //   if (e.currentTarget.value == true){
  //     setTxtbox(true)

  //   }else{
  //     setTxtbox(false)
  //   }
  // }

  // ---------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------

  //     const formSchema = Yup.object().shape({
  //         password: Yup.string()
  //       .required('Password is mendatory')
  //       .min(3, 'Password must be at 3 char long'),
  //     confirmPwd: Yup.string()
  //       .required('Password is mendatory')
  //       .oneOf([Yup.ref('password')], 'Passwords does not match'),
  //   })
  //   const formOptions = { resolver: yupResolver(formSchema) }

  // ---------------------------------------------------------------------------------
  const Category = [
    { label: "SC", value: "sc" },
    { label: "OBC", value: "obc" },
  ];

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
  };

  //   console.log(watch());

  // console.log(errors.name)

  return (
    <>
      <Header />
      <div className="container pt-5 pb-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-8 shadow round pb-3" style={bgc}>
            <h1 className="text-center pt-3 text-secondary">
              Student Registration Form
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <Form.Label>Do You have NSP ID: </Form.Label>
                        <br />
                        <Form.Text muted>
                          (For Post/Pre Matric Scholarship for SCs, Post/Pre
                          Matric Scholarship for OBCs, or Top-Class Scholarship
                          Schemes for SCs and OBCs (TCS) in the immediately
                          preceding year)
                        </Form.Text>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          className={`form-check form-check-inline ${
                            errors.nsp_id_radio && "invalid"
                          }`}
                          {...register("nsp_id_radio", {
                            required: "NSP id is Required",
                          })}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            value={true}
                            name="nsp_id_radio"
                            onClick={() => {
                              setTxtbox(true);
                            }}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={false}
                            name="nsp_id_radio"
                            onClick={() => {
                              setTxtbox(false);
                            }}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                      {txtbox && (
                        <td>
                          <Form.Label className="form-check-label-inline">
                            Enter Your NSP ID:
                          </Form.Label>

                          {/* <div className="form-check form-check-inline mb-3"> */}
                          <Form.Control
                            type="text"
                            className="form-input-inline"
                            {...register("nsp_id", {
                              required: "nsp is Required",
                            })}
                          />

                          {errors.nsp_id && (
                            <small className="text-danger">
                              {errors.nsp_id.message}
                            </small>
                          )}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <Form.Label>
                          Do you have State PMS Beneficiary ID:
                        </Form.Label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          className={`form-check form-check-inline ${
                            errors.pms_benificiary_id_radio && "invalid"
                          }`}
                          {...register("pms_benificiary_id_radio", {
                            required: "State PMS Beneficiary ID is Required",
                          })}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            value="true"
                            name="pms_benificiary_id_radio"
                            onClick={() => {
                              setTxtbox1(true);
                            }}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="false"
                            name="pms_benificiary_id_radio"
                            onClick={() => {
                              setTxtbox1(false);
                            }}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                      {txtbox1 && (
                        <td>
                          <div className="float-right form-check ">
                            <Form.Label className="form-check-label-inline float-right">
                              Enter Your State PMS Beneficiary ID:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-input-inline float-right"
                              {...register("pms_benificiary_id", {
                                required: "pms is Required",
                              })}
                            />
                          </div>
                          {errors.pms_benificiary_id && (
                            <small className="text-danger">
                              {errors.pms_benificiary_id.message}
                            </small>
                          )}
                        </td>
                      )}
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
                          className={`form-control ${
                            errors.category && "invalid"
                          }`}
                          {...register("category", {
                            required: "Category is Required",
                          })}
                        >
                          <option value="">-- Select -- </option>
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
              <br />
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <label className="col-form-label">Gender:</label>
                      </td>
                      <td className="pt-3">
                        <div
                          className={`form-check-inline ${
                            errors.gender && "invalid"
                          }`}
                          {...register("gender", {
                            required: "Gender is Required",
                          })}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            value="M"
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />{" "}
                          Male &emsp; &emsp;
                          <input
                            className="form-check-input"
                            type="radio"
                            value="F"
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />{" "}
                          Female &emsp; &emsp;
                          <input
                            className="form-check-input"
                            type="radio"
                            value="O"
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />{" "}
                          Other &emsp; &emsp;
                        </div>
                        <div>
                          {errors.gender && (
                            <small className="text-danger">
                              {errors.gender.message}
                            </small>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <div className="form-group">
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email && "invalid"}`}
                  {...register("emailid", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("emailid");
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
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  className={`${errors.state && "invalid"}`}
                  {...register("dob", {
                    required: "Date of Birth is Required",
                  })}
                />
                {errors.dob && (
                  <small className="text-danger">{errors.dob.message}</small>
                )}
              </Form.Group>
              &nbsp;
              <Form.Group controlId="password">
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <Form.Label>Password:</Form.Label>
                      </td>
                      <td>
                        <Form.Control
                          type="password"
                          name="password"
                          className={`${errors.password && "invalid"}`}
                          {...register("password", {
                            required: "Password is Required",
                            pattern: {
                              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
                              message:
                                "Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters is required",
                            },
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

                      <td className="pt-3">
                        <Form.Label>Confirm Password:</Form.Label>
                      </td>
                      <td>
                        <Form.Control
                          type="password"
                          name="c_password"
                          className={`${errors.confirmPwd ? "is-invalid" : ""}`}
                          {...register("c_password", {
                            required: "Confirm Password is Required",
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
              <Form.Group>
                <table className="table table-hovertable-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <Form.Label>State of Passing 10th Exam:</Form.Label>
                      </td>
                      <td>
                        <select
                          className={`form-control ${
                            errors.state && "invalid"
                          }`}
                          {...register("state", {
                            required: "State is Required",
                          })}
                        >
                          <option value="">-- Select State -- </option>
                          {s_d.states.map((State) => (
                            <option value={State.state} key={State.state}>
                              {State.state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <small className="text-danger">
                            {errors.state.message}
                          </small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Group>
              <Form.Group>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <Form.Label>10th Board Certificate Number: </Form.Label>
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          className={`form-control ${
                            errors.certificateno && "invalid"
                          }`}
                          {...register("board_10th_certificate_number", {
                            required: "Cerificate number is Required",
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Only numbers are allowed",
                            },
                          })}
                        />
                        {errors.certificateno && (
                          <small className="text-danger">
                            {errors.certificateno.message}
                          </small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <Form.Label>Year of passing 10th Board: </Form.Label>
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          className={`form-control ${
                            errors.year_of_passing_10th_board && "invalid"
                          }`}
                          {...register("year_of_passing_10th_board", {
                            required: "passing year is Required",
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Only numbers are allowed",
                            },
                            min: {
                              value: 1950,
                              message: "this year is not a valid year",
                            },
                            max: {
                              value: 2022,
                              message: "not valid year",
                            },
                          })}
                        />
                        {errors.year_of_passing_10th_board && (
                          <small className="text-danger">
                            {errors.year_of_passing_10th_board.message}
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
                value="Submit"
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
