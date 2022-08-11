import "../../App.css";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import s_d from "../../state&disctrict.json";
import { Form } from "react-bootstrap";
import React, { useState } from "react";

function StuApp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    data.preventDefault();
    console.log(data);
    console.log(JSON.stringify(data));
    reset();
  };

  const MStatus = [
    { label: "Married", value: "Married" },
    { label: "Unmarried", value: "Unmarried" },
    { label: "Divorsed", value: "Divorsed" },
    { label: "Seperated", value: "Seperated" },
  ];
  const [value, setValue] = useState("");

  const states = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Delhi", label: "Delhi" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Orissa", label: "Orissa" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Other", label: "Other" },
  ];

  const ScrSystems = [
    { label: "CGPA/ OGPA", value: "CGPA/ OGPA" },
    { label: "% Marks", value: "% Marks" },
  ];

  const benefits = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  // console.log(watch());

  // console.log(errors.name)

  return (
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <h1 className="text-center pt-3 text-secondary">Application Form</h1>
        <div className="col-sm-6 shadow round pb-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <h4>1.Personal Details</h4>
              <div className="form-group">
                <label className="col-form-label">Full Name</label>
                <input
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
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">Gender</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Male"
                    name="gender"
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Female"
                    name="gender"
                  />
                  <label className="form-check-label">Female</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Other"
                    name="gender"
                  />
                  <label className="form-check-label">Other</label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-form-label">Phone</label>
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
                  onKeyUp={() => {
                    trigger("phone");
                  }}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">Are you 18+</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="plus18"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="plus18"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-group">
                <label className="col-form-label">
                  Adhaar No./Application ID
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.aadhaar && "invalid"}`}
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
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">
                    Do you belong to minority category
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="minority_category"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="minority_category"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">
                    s Are you "Differently abled" ?
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="disablity"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="disablity"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">Marital Status</label>
                </div>
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
              </div>
              <Form.Group>
                <Form.Label>Domicile State</Form.Label>
                <select
                  className={`form-control ${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setValue(e.target.value);
                  }}
                  value={value}
                >
                  <option value="">-- Select State -- </option>
                  {s_d.states.map((State) => (
                    <option value={State.state} key={State.state}>
                      {State.state}
                    </option>
                  ))}
                </select>
              </Form.Group>
              {/* ---------------------------------------------------------------------------------------------------------- */}
              <div className="form-group">
                <div>
                  <label className="col-form-label">Domicile district</label>
                </div>
                <select
                  className={`form-control ${errors.district && "invalid"}`}
                  {...register("district", {
                    required: "district is Required",
                  })}
                >
                  <option value="">-- Select district -- </option>
                  {s_d.states.map((State) => {
                    if (State.state == value) {
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
              </div>
            </div>

            <div className="mt-5">
              <h4>2.Current Address</h4>
              <div className="form-group">
                <label className="col-form-label">Address(Line 1)</label>
                <textarea
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
              </div>
              <div className="form-group">
                <label className="col-form-label">State</label>
                <div>
                  <select
                    className={`${errors.state && "invalid"}`}
                    {...register("state", { required: "State is Required" })}
                  >
                    <option value="">-- Select State -- </option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
                )}
                <div>
                  <label className="col-form-label">state</label>
                </div>
                <select
                  className={`${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                >
                  <option value="">-- Select state -- </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">PIN Code</label>
                <input
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
              </div>
            </div>

            <div className="mt-5">
              <h4>3.Is Permanent Address Same as Current Address</h4>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Yes"
                  name="sameascurrent"
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="No"
                  name="sameascurrent"
                />
                <label className="form-check-label">No</label>
              </div>
            </div>
            <div className="mt-5">
              <h4>4.Permanent Address</h4>
              <div className="form-group">
                <label className="col-form-label">Address(Line 1)</label>
                <textarea
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
              </div>
              <div className="form-group">
                <label className="col-form-label">State</label>
                <div>
                  <select
                    className={`${errors.state && "invalid"}`}
                    {...register("state", { required: "State is Required" })}
                  >
                    <option value="">-- Select State -- </option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
                )}
                <div>
                  <label className="col-form-label">state</label>
                </div>
                <select
                  className={`${errors.state && "invalid"}`}
                  {...register("state", { required: "state is Required" })}
                >
                  <option value="">-- Select state -- </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">PIN Code</label>
                <input
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
              </div>
            </div>
            <div className="mt-5">
              <h4>5.Examination Details for which coaching is required</h4>
              <div className="form-group">
                <label className="col-form-label">
                  Examination for which coaching is required
                </label>
                <div>
                  <select
                    className={`${errors.coaching_required && "invalid"}`}
                    {...register("coaching_required", {
                      required: "Coaching is Required",
                    })}
                  >
                    <option value="">-- Select State -- </option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h4>6.Qualifying Examination Details.</h4>
              <div className="form-group">
                <h6>Please Enter Details of High School</h6>
                <label className="col-form-label">
                  Qualification Exam Cource Name
                </label>
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
                <div>
                  <label className="col-form-label">Status</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="qualification_status"
                  />
                  <label className="form-check-label">Appearing</label>
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
            </div>
            <div className="mt-5">
              <h4>High school (10th) Examination Details</h4>
              <div className="form-group">
                <h6>Please Enter Details of High School</h6>
                <label className="col-form-label">
                  Name of College/ Institute
                </label>
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
              </div>
              <div className="form-group">
                <label className="col-form-label">State</label>
                <div>
                  <select
                    className={`${errors.state && "invalid"}`}
                    {...register("state", { required: "State is Required" })}
                  >
                    <option value="">-- Select State -- </option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
                )}
                <div>
                  <label className="col-form-label">state</label>
                </div>
                <select
                  className={`${errors.state_10 && "invalid"}`}
                  {...register("state_10", { required: "state is Required" })}
                >
                  <option value="">-- Select state -- </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.state_10 && (
                  <small className="text-danger">
                    {errors.state_10.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">
                  Address of College/Institute
                </label>
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
              </div>
              <div className="form-group">
                <label className="col-form-label">Subject/ Course Taken</label>
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
              </div>
              <div className="form-group">
                <label className="col-form-label">Year of Passing</label>
                <input
                  type="text"
                  className={`form-control ${errors.ypass && "invalid"}`}
                  {...register("ypass", {
                    required: "Year of Passing is Required",
                  })}
                  onKeyUp={() => {
                    trigger("ypass");
                  }}
                />
                {errors.ypass && (
                  <small className="text-danger">{errors.ypass.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Scoring System</label>
                <div>
                  <select
                    className={`${errors.scoring_system && "invalid"}`}
                    {...register("scoring_system", {
                      required: "Score system is Required",
                    })}
                  >
                    <option value="">-- Select -- </option>
                    {ScrSystems.map((ScrSystem) => (
                      <option key={ScrSystem.value} value={ScrSystem.value}>
                        {ScrSystem.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.scoring_system && (
                  <small className="text-danger">
                    {errors.scoring_system.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Percentage</label>
                <input
                  type="text"
                  className={`form-control ${errors.percentage && "invalid"}`}
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
              </div>
            </div>
            <div className="mt-5">
              <h4>
                7 a. Have you availed benefit under this scheme or Similar
                Coaching Scheme of the State/UT
              </h4>
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
              <h4 className="mt-5">
                7 b. Number of siblings who availed benefit under such schemes
              </h4>
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
              <div className="mt-5">
                <h4>8.Bank Account details of candidates.</h4>
                <div className="form-group">
                  <h6>
                    Please provide details of account which is adhaar seeded
                  </h6>
                  <label className="col-form-label">
                    Name of Account Holder
                  </label>
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
                </div>
                <div className="form-group">
                  <label className="col-form-label">Bank Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.bank_name && "invalid"}`}
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
                </div>
                <div className="form-group">
                  <label className="col-form-label">Account Number</label>
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
                </div>
                <div className="form-group">
                  <label className="col-form-label">IFSC Code</label>
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
                </div>
              </div>
              <div className="mt-5">
                <h4>
                  9.Total Income from all sources of family members contributing
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default StuApp;