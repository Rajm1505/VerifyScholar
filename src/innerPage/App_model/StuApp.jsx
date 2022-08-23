import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import  {useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import s_d from "../../state&disctrict.json";
import courses from "../../allCourses.json";
import { Form, FormText } from "react-bootstrap";
import $ from 'jquery';
import Header from "../Header";

// function StuApp(props: {sid : string}) {
function StuApp() {
  const bgc = { backgroundColor: "#f2f2f2" };
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://127.0.0.1:8000/api/registerfetch/', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const content = await response.json();
        setName(content.name);
        setGender(content.gender);
        setPhone(content.mobile_number);
        console.log(content);
        if(content.detail == "Unauthenticated"){
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

  const onSubmit = (data) => {
    data.preventDefault();
    console.table(data);
    console.table(JSON.stringify(data));
    // reset();
  };

  const MStatus = [
    { label: "Married", value: "Married" },
    { label: "Unmarried", value: "Unmarried" },
    { label: "Divorsed", value: "Divorsed" },
    { label: "Seperated", value: "Seperated" },
  ];

  const declarations = [
    {
      label: "Yes i declare all that points are correct.",
      value: "Yes i declare all that points are correct.",
    },
    {
      label: "No all that points are not correct in my case.",
      value: "No all that points are not correct in my case.",
    },
  ];

  const [d_value, setDvalue] = useState("");
  const [c_value, setCvalue] = useState("");
  const [p_value, setPvalue] = useState("");
  const [h_value, setHvalue] = useState("");

  // const [address, setAddress] = useState(false);
  // if (address === true) {
  //   $("#yes").click(function () {
  //     $("#paddress1").text($("#caddress1").text());
  //     // $('#address2').val("GeeksForGeeks");
  //     //  s
  //     // $('#pdistrict').val("GeeksForGeeks");
  //     $("#ppin").val($("#cpin").val());
  //     //  $('#ppin').val("746837465");
  //   });
  // }

  const ScrSystems = [
    { label: "CGPA/ OGPA", value: "CGPA/ OGPA" },
    { label: "% Marks", value: "% Marks" },
  ];

  const benefits = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
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
              <table className="table table-hover table-bordered">
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <label className="col-form-label">Gender</label>
                    </td>
                    <td colSpan="2" className="pt-3">
                      <div
                        className={`${errors.gender && "invalid"}`}
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                        disabled
                      >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="M"
                            checked = {gender=="M"? true : false}
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />
                          <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="F"
                            checked = {gender=="F"? true : false}
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />
                          <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="O"
                            checked = {gender=="O"? true : false}
                            name="gender"
                            {...register("gender", {
                              required: "Gender is Required",
                            })}
                          />
                          <label className="form-check-label">Other</label>
                        </div>
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
                  <tr>
                    <td colSpan="2">
                      <label className="col-form-label">Are you 18+</label>
                    </td>
                    <td colSpan="2" className="pt-3">
                      <div
                        className={`${errors.plus18 && "invalid"}`}
                        {...register("plus18", {
                          required: "Required",
                        })}
                      >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="plus18"
                            {...register("plus18", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="plus18"
                            {...register("plus18", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
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
                  <tr>
                    <td>
                      <label className="col-form-label">Phone</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`form-control ${errors.phone && "invalid"}`}
                        {...register("phone", {
                          required: "Phone is Required",
                          pattern: {
                            value:
                              /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                            message: "Invalid phone no",
                          },
                        })}
                        value={phone}
                        onKeyUp={() => {
                          trigger("phone");
                        }}
                        disabled
                      />
                      {errors.phone && (
                        <small className="text-danger">
                          {errors.phone.message}
                        </small>
                      )}
                    </td>
                    <td>
                      <label className="col-form-label">
                        Adhaar No. / Application ID
                      </label>
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.aadhaar && "invalid"
                        }`}
                        {...register("aadhaar", {
                          required: "Adhaar No./Application ID is Required",
                        })}
                        onKeyUp={() => {
                          trigger("aadhaar");
                        }}
                      />
                      {errors.aadhaar && (
                        <small className="text-danger">
                          {errors.aadhaar.message}
                        </small>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <label className="col-form-label">
                        Do you belong to the minority category?
                      </label>
                    </td>
                    <td colSpan="2">
                      <div
                        className={`${errors.minority_category && "invalid"}`}
                        {...register("minority_category", {
                          required: "Required",
                        })}
                      >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="minority_category"
                            {...register("minority_category", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="minority_category"
                            {...register("minority_category", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </div>
                      <div>
                        {errors.minority_category && (
                          <small className="text-danger">
                            {errors.minority_category.message}
                          </small>
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <label className="col-form-label">
                        Are you "Differently abled"?
                      </label>
                    </td>
                    <td colSpan="2">
                      <div
                        className={`${errors.disablity && "invalid"}`}
                        {...register("disablity", {
                          required: "Required",
                        })}
                      >
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="disablity"
                            {...register("disablity", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="disablity"
                            {...register("disablity", {
                              required: "Required",
                            })}
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <label className="col-form-label">Marital Status</label>
                    </td>
                    <td colSpan="2">
                      <select
                        className={`form-control ${
                          errors.marital_status && "invalid"
                        }`}
                        {...register("marital_status", {
                          required: "Marital status is Required",
                        })}
                      >
                        <option value="">-- Select -- </option>
                        {MStatus.map((Mstatus) => (
                          <option key={Mstatus.value} value={Mstatus.value}>
                            {Mstatus.label}
                          </option>
                        ))}
                      </select>
                      {errors.marital_status && (
                        <small className="text-danger">
                          {errors.marital_status.message}
                        </small>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-3">
                      <Form.Label>Domicile State</Form.Label>
                    </td>
                    <td>
                      <select
                        className={`form-control ${errors.state && "invalid"}`}
                        {...register("state", {
                          required: "State is Required",
                        })}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setDvalue(e.target.value);
                        }}
                        value={d_value}
                      >
                        <option value="">-- Select state -- </option>
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
                    <td>
                      <label className="col-form-label">
                        Domicile District
                      </label>
                    </td>
                    <td>
                      <select
                        className={`form-control ${
                          errors.district && "invalid"
                        }`}
                        {...register("district", {
                          required: "district is Required",
                        })}
                      >
                        <option value="">-- Select district -- </option>
                        {s_d.states.map((State) => {
                          if (State.state === d_value) {
                            return (
                              <>
                                {State.districts.map((disct) => (
                                  <option value={disct}>{disct}</option>
                                ))}
                              </>
                            );
                          }
                        })}
                      </select>
                      {errors.district && (
                        <small className="text-danger">
                          {errors.district.message}
                        </small>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />{" "}
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4 className="mb-4">2. Current Address</h4>
              {/* <div className="form-group">
                <label className="col-form-label">Address(Line 1)</label>
                <textarea
                  id="caddress1"
                  className={`form-control ${errors.address1 && "invalid"}`}
                  {...register("address1", { required: "Address is Required" })}
                  onKeyUp={() => {
                    trigger("address1");
                  }}
                />
                {errors.address1 && (
                  <small className="text-danger">
                    {errors.address1.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Address(Line 2)</label>
                <textarea
                  id="caddress2"
                  className={`form-control ${errors.address2 && "invalid"}`}
                  {...register("address2", { required: "Address is Required" })}
                  onKeyUp={() => {
                    trigger("address2");
                  }}
                />
                {errors.address2 && (
                  <small className="text-danger">
                    {errors.address2.message}
                  </small>
                )}
              </div> */}
              <div className="form-group">
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <Form.Label>State</Form.Label>
                      </td>
                      <td>
                        <select
                          id="cstate"
                          className={`form-control ${
                            errors.cstate && "invalid"
                          }`}
                          {...register("cstate", {
                            required: "State is Required",
                          })}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setCvalue(e.target.value);
                          }}
                          value={c_value}
                        >
                          <option value="">-- Select state -- </option>
                          {s_d.states.map((State) => (
                            <option value={State.state} key={State.state}>
                              {State.state}
                            </option>
                          ))}
                        </select>
                        {errors.cstate && (
                          <small className="text-danger">
                            {errors.cstate.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <label className="col-form-label"> District</label>
                      </td>
                      <td>
                        <select
                          id="cdistrict"
                          className={`form-control ${
                            errors.cdistrict && "invalid"
                          }`}
                          {...register("cdistrict", {
                            required: "district is Required",
                          })}
                        >
                          <option value="">-- Select district -- </option>
                          {s_d.states.map((State) => {
                            if (State.state === c_value) {
                              return (
                                <>
                                  {State.districts.map((disct) => (
                                    <option value={disct}>{disct}</option>
                                  ))}
                                </>
                              );
                            }
                          })}
                        </select>
                        {errors.cdistrict && (
                          <small className="text-danger">
                            {errors.cdistrict.message}
                          </small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="form-group">
                <label className="col-form-label">PIN Code</label>
                <input
                  id="cpin"
                  type="text"
                  className={`form-control ${errors.pincode && "invalid"}`}
                  {...register("pincode", {
                    required: "Pincode is Required",
                  })}
                  onKeyUp={() => {
                    trigger("pincode");
                  }}
                />
                {errors.pincode && (
                  <small className="text-danger">
                    {errors.pincode.message}
                  </small>
                )}
              </div> */}
            </div>
            <hr />{" "}
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4 className="mb-4">3. Is Permanent Address Same as Current Address?</h4>
              <div className="form-check form-check-inline">
                <input
                  id="address"
                  className="form-check-input"
                  type="radio"
                  value={true}
                  name="sameascurrent"
                  // onClick={() => {
                  //   setAddress(true);
                  // }}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="address"
                  className="form-check-input"
                  type="radio"
                  value={false}
                  name="sameascurrent"
                  // onClick={() => {
                  //   setAddress(false);
                  // }}
                />

                <label className="form-check-label">No</label>
              </div>
            </div>
            <hr />{" "}
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4 className="mb-4">4. Permanent Address</h4>
              {/* <div className="form-group">
                <label className="col-form-label">Address(Line 1)</label>
                <textarea
                  id="paddress1"
                  className={`form-control ${errors.address1 && "invalid"}`}
                  {...register("address1", { required: "Address is Required" })}
                  onKeyUp={() => {
                    trigger("address1");
                  }}
                />
                {errors.address1 && (
                  <small className="text-danger">
                    {errors.address1.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Address(Line 2)</label>
                <textarea
                  id="paddress2"
                  className={`form-control ${errors.address2 && "invalid"}`}
                  {...register("address2", { required: "Address is Required" })}
                  onKeyUp={() => {
                    trigger("address2");
                  }}
                />
                {errors.address2 && (
                  <small className="text-danger">
                    {errors.address2.message}
                  </small>
                )}
              </div> */}
              <div className="form-group">
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <Form.Label>State</Form.Label>
                      </td>
                      <td>
                        <select
                          id="pstate"
                          className={`form-control ${
                            errors.pstate && "invalid"
                          }`}
                          {...register("pstate", {
                            required: "State is Required",
                          })}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setPvalue(e.target.value);
                          }}
                          value={p_value}
                        >
                          <option value="">-- Select state -- </option>
                          {s_d.states.map((State) => (
                            <option value={State.state} key={State.state}>
                              {State.state}
                            </option>
                          ))}
                        </select>
                        {errors.pstate && (
                          <small className="text-danger">
                            {errors.pstate.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <label className="col-form-label"> District</label>
                      </td>
                      <td>
                        <select
                          id="pdistrict"
                          className={`form-control ${
                            errors.pdistrict && "invalid"
                          }`}
                          {...register("pdistrict", {
                            required: "district is Required",
                          })}
                        >
                          <option value="">-- Select district -- </option>
                          {s_d.states.map((State) => {
                            if (State.state === p_value) {
                              return (
                                <>
                                  {State.districts.map((disct) => (
                                    <option value={disct}>{disct}</option>
                                  ))}
                                </>
                              );
                            }
                          })}
                        </select>
                        {errors.pdistrict && (
                          <small className="text-danger">
                            {errors.pdistrict.message}
                          </small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="form-group">
                <label className="col-form-label">PIN Code</label>
                <input
                  id="ppin"
                  type="text"
                  className={`form-control ${errors.pincode && "invalid"}`}
                  {...register("pincode", {
                    required: "Pincode is Required",
                  })}
                  onKeyUp={() => {
                    trigger("pincode");
                  }}
                />
                {errors.pincode && (
                  <small className="text-danger">
                    {errors.pincode.message}
                  </small>
                )}
              </div> */}
            </div>
            <hr />
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4 className="mb-4">5. Examination Details for which coaching is required.</h4>
              <div className="form-group">
                <Form.Text className="fs-6" muted>
                  Examination for which coaching is required.
                </Form.Text>
                <div className="mt-3">
                  <select
                    className={`form-control ${
                      errors.coaching_required && "invalid"
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
                  {errors.state && (
                    <small className="text-danger">
                      {errors.state.message}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <hr />{" "}
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4>6. Qualifying Examination Details.</h4>
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
                          className={`form-control ${
                            errors.qualification && "invalid"
                          }`}
                          {...register("qualification", {
                            required: "Qualification is Required",
                          })}
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
                          className={`${
                            errors.qualification_status && "invalid"
                          }`}
                          {...register("qualification_status", {
                            required: "Required",
                          })}
                        >
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              value="Yes"
                              name="qualification_status"
                              {...register("qualification_status", {
                                required: "Required",
                              })}
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
                              {...register("qualification_status", {
                                required: "Required",
                              })}
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
            <div className="mt-5">
              <h4>High school (10th) Examination Details</h4>
              <FormText className="fs-6" muted>
                Please Enter Details of High School
              </FormText>
              <br />
              <table className="table table-hover table-bordered mt-2">
                <tbody>
                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Name of College/ Institute</label>
                    </td>
                    <td colSpan="2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.instituteName_10 && "invalid"
                        }`}
                        {...register("instituteName_10", {
                          required: "College/ Institute name is Required",
                        })}
                        onKeyUp={() => {
                          trigger("instituteName_10");
                        }}
                      />
                      {errors.instituteName_10 && (
                        <small className="text-danger">
                          {errors.instituteName_10.message}
                        </small>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td className="pt-3">
                      <Form.Label>State</Form.Label>
                    </td>
                    <td>
                      <select
                        className={`form-control ${errors.hstate && "invalid"}`}
                        {...register("hstate", {
                          required: "State is Required",
                        })}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setHvalue(e.target.value);
                        }}
                        value={h_value}
                      >
                        <option value="" className="text-center">
                          -- Select state --
                        </option>
                        {s_d.states.map((State) => (
                          <option value={State.state} key={State.state}>
                            {State.state}
                          </option>
                        ))}
                      </select>
                      {errors.hstate && (
                        <small className="text-danger">
                          {errors.hstate.message}
                        </small>
                      )}
                    </td>

                    <td className="pt-3">
                      <Form.Label>District</Form.Label>
                    </td>
                    <td>
                      <select
                        className={`form-control ${
                          errors.hdistrict && "invalid"
                        }`}
                        {...register("hdistrict", {
                          required: "district is Required",
                        })}
                      >
                        <option value="" className="text-center">
                          -- Select district --
                        </option>
                        {s_d.states.map((State) => {
                          if (State.state === h_value) {
                            return (
                              <>
                                {State.districts.map((disct) => (
                                  <option value={disct}>{disct}</option>
                                ))}
                              </>
                            );
                          }
                        })}
                      </select>
                      {errors.hdistrict && (
                        <small className="text-danger">
                          {errors.hdistrict.message}
                        </small>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Address of College/Institute</label>
                    </td>
                    <td colSpan="2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.address_institute_10 && "invalid"
                        }`}
                        {...register("address_institute_10", {
                          required: "Address of College/ Institute is Required",
                        })}
                        onKeyUp={() => {
                          trigger("address_institute_10");
                        }}
                      />
                      {errors.address_institute_10 && (
                        <small className="text-danger">
                          {errors.address_institute_10.message}
                        </small>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Subject/ Course Taken</label>
                    </td>
                    <td colSpan="2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.subject_taken && "invalid"
                        }`}
                        {...register("subject_taken", {
                          required: "Subject/ Course name is Required",
                        })}
                        onKeyUp={() => {
                          trigger("subject_taken");
                        }}
                      />
                      {errors.subject_taken && (
                        <small className="text-danger">
                          {errors.subject_taken.message}
                        </small>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Year of Passing</label>
                    </td>
                    <td colSpan="2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.year_pass && "invalid"
                        }`}
                        {...register("year_pass", {
                          required: "Year of Passing is Required",
                        })}
                        onKeyUp={() => {
                          trigger("year_pass");
                        }}
                      />
                      {errors.year_pass && (
                        <small className="text-danger">
                          {errors.year_pass.message}
                        </small>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Scoring System</label>
                    </td>
                    <td colSpan="2">
                      <select
                        className={`form-control ${
                          errors.scoring_system && "invalid"
                        }`}
                        {...register("scoring_system", {
                          required: "Score system is Required",
                        })}
                      >
                        <option value="" className="text-center">
                          -- Select --
                        </option>
                        {ScrSystems.map((ScrSystem) => (
                          <option key={ScrSystem.value} value={ScrSystem.value}>
                            {ScrSystem.label}
                          </option>
                        ))}
                      </select>
                      {errors.scoring_system && (
                        <small className="text-danger">
                          {errors.scoring_system.message}
                        </small>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="pt-3">
                      <label>Percentage</label>
                    </td>
                    <td colSpan="2">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.percentage && "invalid"
                        }`}
                        {...register("percentage", {
                          required: "Percentage is Required",
                        })}
                        onKeyUp={() => {
                          trigger("percentage");
                        }}
                      />
                      {errors.percentage && (
                        <small className="text-danger">
                          {errors.percentage.message}
                        </small>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <table className="table table-hover table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <h4>
                        7 a. Have you availed benefit under this scheme or
                        Similar Coaching Scheme of the State/UT
                      </h4>
                    </td>
                    <td>
                      <select
                        className={`form-control ${
                          errors.availed_benefit && "invalid"
                        }`}
                        {...register("availed_benefit")}
                      >
                        <option value="" className="text-center">
                          -- Select --
                        </option>
                        {benefits.map((benefit) => (
                          <option key={benefit.value} value={benefit.value}>
                            {benefit.label}
                          </option>
                        ))}
                      </select>
                      {errors.availed_benefit && (
                        <small className="text-danger">
                          {errors.availed_benefit.message}
                        </small>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>
                        7 b. Number of siblings who availed benefit under such
                        schemes
                      </h4>
                    </td>
                    <td>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.num_siblings_availd_benefit && "invalid"
                          }`}
                          {...register("num_siblings_availd_benefit", {
                            required: "Siblings is Required",
                          })}
                          onKeyUp={() => {
                            trigger("num_siblings_availd_benefit");
                          }}
                        />
                        {errors.num_siblings_availd_benefit && (
                          <small className="text-danger">
                            {errors.num_siblings_availd_benefit.message}
                          </small>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />{" "}
            {/*  ################################################################################################################## */}
            <div className="mt-5">
              <h4>8. Bank Account details of candidates.</h4>
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
                          className={`form-control ${
                            errors.bank_accountholder_name && "invalid"
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
                          className={`form-control ${
                            errors.bank_name && "invalid"
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
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                          className={`form-control ${
                            errors.bank_IFSC_code && "invalid"
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
              <h4>
                9. Total Income from all sources of family members contributing
                to the household during the Financial Year 2020-21.
              </h4>
              <div className="form-group">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Relationship</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Nature of Employment</th>
                      <th>Income in Rs.(yearly)</th>
                      <th>ITR Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Father</td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <select
                          className={`${errors.availed_benefit && "invalid"}`}
                          {...register("availed_benefit")}
                        >
                          <option value="">-- Select -- </option>
                          {benefits.map((benefit) => (
                            <option key={benefit.value} value={benefit.value}>
                              {benefit.label}
                            </option>
                          ))}
                        </select>
                        {errors.availed_benefit && (
                          <small className="text-danger">
                            {errors.availed_benefit.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="qualification_status"
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="qualification_status"
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>mother</td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <select
                          className={`${errors.availed_benefit && "invalid"}`}
                          {...register("availed_benefit")}
                        >
                          <option value="">-- Select -- </option>
                          {benefits.map((benefit) => (
                            <option key={benefit.value} value={benefit.value}>
                              {benefit.label}
                            </option>
                          ))}
                        </select>
                        {errors.availed_benefit && (
                          <small className="text-danger">
                            {errors.availed_benefit.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="qualification_status"
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="qualification_status"
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>brother</td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <select
                          className={`${errors.availed_benefit && "invalid"}`}
                          {...register("availed_benefit")}
                        >
                          <option value="">-- Select -- </option>
                          {benefits.map((benefit) => (
                            <option key={benefit.value} value={benefit.value}>
                              {benefit.label}
                            </option>
                          ))}
                        </select>
                        {errors.availed_benefit && (
                          <small className="text-danger">
                            {errors.availed_benefit.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="qualification_status"
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="qualification_status"
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>sister</td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <select
                          className={`${errors.availed_benefit && "invalid"}`}
                          {...register("availed_benefit")}
                        >
                          <option value="">-- Select -- </option>
                          {benefits.map((benefit) => (
                            <option key={benefit.value} value={benefit.value}>
                              {benefit.label}
                            </option>
                          ))}
                        </select>
                        {errors.availed_benefit && (
                          <small className="text-danger">
                            {errors.availed_benefit.message}
                          </small>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.bank_account_no && "invalid"
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
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Yes"
                            name="qualification_status"
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="No"
                            name="qualification_status"
                          />
                          <label className="form-check-label">No</label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="mb-3">10. Declaration</h4>
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
                  className={`form-control ${
                    errors.declaration_action && "invalid"
                  }`}
                  {...register("declaration_action")}
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
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default StuApp;
