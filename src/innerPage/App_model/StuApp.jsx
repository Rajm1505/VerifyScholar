import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import s_d from "../../state&disctrict.json";
import courses from "../../allCourses.json";
import { Form, FormText } from "react-bootstrap";
import $ from 'jquery';
import Header from "../Header";
import axios from "axios";

// function StuApp(props: {sid : string}) {
function StuApp() {
  const bgc = { backgroundColor: "#f2f2f2" };
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [aadhaar, setAadhaar] = useState();
  // const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/api/registerfetch/', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        setName(content.name);
        setAadhaar(content.aadhaar_no);
        // console.log(content);
        if (content.detail == "Unauthenticated") {
          return navigate('/login');
        }
      }
    )();
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    console.table(e);
    const Data = JSON.stringify(e);
    console.log(Data);

    axios
      .post("http://127.0.0.1:8000/api/formregister/", Data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    reset();
    // setRedirect(true);

    // reset();
  };

  const declarations = [
    {
      label: "Yes i declare all that points are correct.",
      value: "Yes",
    },
    {
      label: "No all that points are not correct in my case.",
      value: "No",
    },
  ];
  return (
    <>
      <Header />
      <div className="container pt-5 pb-5">
        <div className="row justify-content-sm-center pt-5 pb-5">
          <div className="col-sm-8 shadow round pb-3" style={bgc}>
            <h1 className="text-center pt-3 text-secondary">Application Form</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/*  ################################################################################################################## */}
              <div className="mt-5">
                <h4>1. Personal Details</h4>
                <div className="form-group">
                  <label className="col-form-label">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name && "invalid"}`}
                    {...register("name", { required: "Name is Required" })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                    value={name}
                    disabled
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
                <br />

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
                  value={aadhaar}
                  disabled
                />
                {errors.aadhaar_no && (
                  <small className="text-danger">
                    {errors.aadhaar_no.message}
                  </small>
                )}
              </div>
              <hr />
              {/*  ################################################################################################################## */}
              <div className="mt-5">
                <h4 className="mb-4">2. Examination Details for which coaching is required.</h4>
                <div className="form-group">
                  <Form.Text className="fs-6" muted>
                    Examination for which coaching is required.
                  </Form.Text>
                  <div className="mt-3">
                    <select
                      className={`form-control ${errors.coaching_required && "invalid"
                        }`}
                      {...register("coaching_required", {
                        required: "Coaching is Required",
                      })}
                    >
                      <option value="">-- Select Course -- </option>
                      {courses.Courses.map((course) => (
                        <option value={course.value} key={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                    {errors.coaching_required && (
                      <small className="text-danger">
                        {errors.coaching_required.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <hr />{" "}
              {/*  ################################################################################################################## */}
              <div className="mt-5">
                <h4>3. Qualifying Examination Details.</h4>
                <div className="form-group">
                  <FormText className="fs-6" muted>
                    Please Enter Details of High School
                  </FormText>
                  <br />
                  <table className="table table-hover table-bordered mt-2">
                    <tbody>
                      <tr>
                        <td>
                          <label className="col-form-label">
                            Qualification Exam Cource Name
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${errors.qualification && "invalid"
                              }`}
                            onKeyUp={() => {
                              trigger("qualification");
                            }}
                          />
                          {errors.qualification && (
                            <small className="text-danger">
                              {errors.qualification.message}
                            </small>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="col-form-label">Status</label>
                        </td>
                        <td className="pt-3">
                          <div
                            className={`${errors.qualification_status && "invalid"
                              }`}
                          >
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                value="Yes"
                                name="qualification_status"
                              />
                              <label className="form-check-label">
                                Appearing
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                value="No"
                                name="qualification_status"
                              />
                              <label className="form-check-label">Passed</label>
                            </div>
                          </div>
                          <div>
                            {errors.qualification_status && (
                              <small className="text-danger">
                                {errors.qualification_status.message}
                              </small>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />{" "}
              {/*  ################################################################################################################## */}

              {/*  ################################################################################################################## */}
              <div className="mt-5">
                <h4>4. Bank Account details of candidates.</h4>
                <div className="form-group">
                  <FormText className="fs-6" muted>
                    Please provide details of account which is adhaar seeded
                  </FormText>
                  <table className="table table-hover table-bordered mt-2">
                    <tbody>
                      <tr>
                        <td>
                          <label className="col-form-label">
                            Name of Account Holder
                          </label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${errors.bank_accountholder_name && "invalid"
                              }`}
                            {...register("bank_accountholder_name", {
                              required: "Account Holder Name is Required",
                            })}
                            onKeyUp={() => {
                              trigger("bank_accountholder_name");
                            }}
                          />
                          {errors.bank_accountholder_name && (
                            <small className="text-danger">
                              {errors.bank_accountholder_name.message}
                            </small>
                          )}
                        </td>
                        <td>
                          <label className="col-form-label">Bank Name</label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${errors.bank_name && "invalid"
                              }`}
                            {...register("bank_name", {
                              required: "Bank Name is Required",
                            })}
                            onKeyUp={() => {
                              trigger("bank_name");
                            }}
                          />
                          {errors.bank_name && (
                            <small className="text-danger">
                              {errors.bank_name.message}
                            </small>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label className="col-form-label">Account Number</label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${errors.bank_account_no && "invalid"
                              }`}
                            {...register("bank_account_no", {
                              required: "Account Number is Required",
                            })}
                            onKeyUp={() => {
                              trigger("bank_account_no");
                            }}
                          />
                          {errors.bank_account_no && (
                            <small className="text-danger">
                              {errors.bank_account_no.message}
                            </small>
                          )}
                        </td>
                        <td>
                          <label className="col-form-label">IFSC Code</label>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${errors.bank_IFSC_code && "invalid"
                              }`}
                            {...register("bank_IFSC_code", {
                              required: "IFSC Code is Required",
                            })}
                            onKeyUp={() => {
                              trigger("bank_IFSC_code");
                            }}
                          />
                          {errors.bank_IFSC_code && (
                            <small className="text-danger">
                              {errors.bank_IFSC_code.message}
                            </small>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />{" "}
              {/*  ################################################################################################################## */}
              <div className="mt-5">
                <h4 className="mb-3">5. Declaration</h4>
                <div className="form-group">
                  <ol type="i">
                    <FormText className="fs-6" muted>
                      <li>
                        I declare that, i have not taken the benefits till now/
                        have not taken the benefit more than once under the Scheme
                        of Free Coaching for SC and OBC students being implemented
                        by Govt. of India.
                      </li>
                      <br />
                      <li>
                        Declare that, i am not a beneficiary of a similar Scheme
                        being implemented by any other Department/ Ministry of of
                        Central Government or State Government in which free
                        coaching is provided to the students for preparation of
                        competitive exams.
                      </li>
                      <br />
                      <li>
                        I declare that, not more than one sibling have taken
                        benefit under the Scheme till now.
                      </li>
                      <br />
                      <li>
                        All information filled in the application form is true to
                        my knowledge, and if, on any occasion information given by
                        me is found to be incorrect, my candidature for this
                        coaching scheme shall able to be canceled, and/or I may be
                        proceeded against for administrative/criminal proceedings.
                        I shall also be able to deposit any fee paid to me with
                        the applicable penalty stipulated in the scheme
                        guidelines.
                      </li>
                    </FormText>
                  </ol>
                  <select
                    className={`form-control ${errors.declaration_action && "invalid"
                      }`}
                  >
                    <option value="">-- Select -- </option>
                    {declarations.map((declaration) => (
                      <option key={declaration.value} value={declaration.value}>
                        {declaration.label}
                      </option>
                    ))}
                  </select>
                  {errors.declaration_action && (
                    <small className="text-danger">
                      {errors.declaration_action.message}
                    </small>
                  )}
                </div>
              </div>
              {/*  ################################################################################################################## */}
              <input
                type="submit"
                className="btn btn-lg btn-primary mt-5 mb-3"
                // value="Submit"
              />
            </form>
          </div>
        </div>
      </div >
    </>
  );
}

export default StuApp;
