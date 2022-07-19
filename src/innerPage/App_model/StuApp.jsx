import "../../App.css";
import react , {useState } from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import s_d from '../../state&disctrict.json';
import { Form } from "react-bootstrap";


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
const [value ,setValue] =useState('');
const handleSelect = (e) => {
  console.log(e.target.value);
  setValue(e.target.value);
};

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
                    name="18+"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="18+"
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
                  className={`form-control ${errors.Ano && "invalid"}`}
                  {...register("Ano", {
                    required: "Adhaar No./Application ID is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Ano");
                  }}
                />
                {errors.Ano && (
                  <small className="text-danger">{errors.Ano.message}</small>
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
                    name="minority"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="minority"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">s
                    Are you "Differently abled" ?
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="differently abled"
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="differently abled"
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-form-label">Marital Status</label>
                </div>
                <select
                  className={`form-control ${errors.mstatus && "invalid"}`}
                  {...register("mstatus", {
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
                {errors.mstatus && (
                  <small className="text-danger">
                    {errors.mstatus.message}
                  </small>
                )}
              </div>
              {/* ---------------------------------------------------------------------------------------------------------- */}
              <div className="form-group">
              
              {/* ---------------------------------------------------------------------------------------------------------- */}
              <Form.Group>
                <Form.Label>Domicile State</Form.Label>
                <select
                    className={` form-control ${errors.state && "invalid"}`}
                    {...register("state", { required: "State is Required" })}
                    onChange={(e) => {
                      console.log(e.target.value)
                      setValue(e.target.value)}}
                    //  onSelect={handleSelect}
                     >
                       <option value="">-- Select State -- </option>
                        {s_d.states.map((state) => (
                      <option value={state.state} >{state.state}</option>
                    ))}
                      </select>
              </Form.Group>
              {/* ---------------------------------------------------------------------------------------------------------- */}

                <div>
                  <label className="col-form-label">Domicile District</label>
                </div>
                <select
                  className={`form-control ${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                >
                  <option value="">-- Select District -- </option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}

                  {/* {s_d.states.filter(s_d => s_d.states.state === value).map((disct) => (
                      <option key={disct.districts} value={disct.districts}>
                        {disct.districts}
                      </option>
                    ))}
                  {s_d.states.map((state) => {

                    if (state.state == value){

                      return (
                        <>
                        <option value={state.districts}>
                        {state.districts}
                      </option></>);
                    }
                  }
                    )} */}
                </select>
                {errors.state && (
                  <small className="text-danger">{errors.state.message}</small>
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
                  <label className="col-form-label">District</label>
                </div>
                <select
                  className={`${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                >
                  <option value="">-- Select District -- </option>
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
                  className={`form-control ${errors.Pincode && "invalid"}`}
                  {...register("Pincode", {
                    required: "Pincode is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Pincode");
                  }}
                />
                {errors.Pincode && (
                  <small className="text-danger">
                    {errors.Pincode.message}
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
                  name="differently abled"
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="No"
                  name="differently abled"
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
                  <label className="col-form-label">District</label>
                </div>
                <select
                  className={`${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                >
                  <option value="">-- Select District -- </option>
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
                  className={`form-control ${errors.Pincode && "invalid"}`}
                  {...register("Pincode", {
                    required: "Pincode is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Pincode");
                  }}
                />
                {errors.Pincode && (
                  <small className="text-danger">
                    {errors.Pincode.message}
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
                  className={`form-control ${errors.Course && "invalid"}`}
                  {...register("Course", {
                    required: "Course is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Course");
                  }}
                />
                {errors.Course && (
                  <small className="text-danger">{errors.Course.message}</small>
                )}
                <div>
                  <label className="col-form-label">Status</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yes"
                    name="differently abled"
                  />
                  <label className="form-check-label">Appearing</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="No"
                    name="differently abled"
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
                  className={`form-control ${errors.College && "invalid"}`}
                  {...register("College", {
                    required: "College/ Institute name is Required",
                  })}
                  onKeyUp={() => {
                    trigger("College");
                  }}
                />
                {errors.College && (
                  <small className="text-danger">
                    {errors.College.message}
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
                  <label className="col-form-label">District</label>
                </div>
                <select
                  className={`${errors.state && "invalid"}`}
                  {...register("state", { required: "State is Required" })}
                >
                  <option value="">-- Select District -- </option>
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
                <label className="col-form-label">
                  Address of College/Institute
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.Addcollege && "invalid"}`}
                  {...register("Addcollege", {
                    required: "Address of College/ Institute is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Addcollege");
                  }}
                />
                {errors.Addcollege && (
                  <small className="text-danger">
                    {errors.Addcollege.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Subject/ Course Taken</label>
                <input
                  type="text"
                  className={`form-control ${errors.Cname && "invalid"}`}
                  {...register("Cname", {
                    required: "Subject/ Course name is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Cname");
                  }}
                />
                {errors.Cname && (
                  <small className="text-danger">{errors.Cname.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Year of Passing</label>
                <input
                  type="text"
                  className={`form-control ${errors.Ypass && "invalid"}`}
                  {...register("Ypass", {
                    required: "Year of Passing is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Ypass");
                  }}
                />
                {errors.Ypass && (
                  <small className="text-danger">{errors.Ypass.message}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Scoring System</label>
                <div>
                  <select
                    className={`${errors.ScrSystem && "invalid"}`}
                    {...register("ScrSystem", {
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
                {errors.ScrSystem && (
                  <small className="text-danger">
                    {errors.ScrSystem.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label">Percentage</label>
                <input
                  type="text"
                  className={`form-control ${errors.Percentage && "invalid"}`}
                  {...register("Percentage", {
                    required: "Percentage is Required",
                  })}
                  onKeyUp={() => {
                    trigger("Percentage");
                  }}
                />
                {errors.Percentage && (
                  <small className="text-danger">
                    {errors.Percentage.message}
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
                className={`${errors.benefit && "invalid"}`}
                {...register("benefit")}
              >
                <option value="">-- Select -- </option>
                {benefits.map((benefit) => (
                  <option key={benefit.value} value={benefit.value}>
                    {benefit.label}
                  </option>
                ))}
              </select>
              {errors.benefit && (
                <small className="text-danger">{errors.benefit.message}</small>
              )}
              <h4 className="mt-5">
                7 b. Number of siblings who availed benefit under such schemes
              </h4>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${errors.siblings && "invalid"}`}
                  {...register("siblings", {
                    required: "Siblings is Required",
                  })}
                  onKeyUp={() => {
                    trigger("siblings");
                  }}
                />
                {errors.siblings && (
                  <small className="text-danger">
                    {errors.siblings.message}
                  </small>
                )}
              </div>
              <div className="mt-5">
                <h4>8.Bank Account details of candidates.</h4>
                <div className="form-group">
                  <h6>
                    Please provide details of account which is adhaar seeded
                  </h6>
                  <label className="col-form-label">Name of Account Holder</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Aholder && "invalid"}`}
                    {...register("Aholder", {
                      required: "Account Holder Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("Aholder");
                    }}
                  />
                  {errors.Aholder && (
                    <small className="text-danger">
                      {errors.Aholder.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-form-label">Bank Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.BankName && "invalid"}`}
                    {...register("BankName", {
                      required: "Bank Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("BankName");
                    }}
                  />
                  {errors.BankName && (
                    <small className="text-danger">
                      {errors.BankName.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-form-label">Account Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Anumber && "invalid"}`}
                    {...register("Anumber", {
                      required: "Account Number is Required",
                    })}
                    onKeyUp={() => {
                      trigger("Anumber");
                    }}
                  />
                  {errors.Anumber && (
                    <small className="text-danger">
                      {errors.Anumber.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className="col-form-label">IFSC Code</label>
                  <input
                    type="text"
                    className={`form-control ${errors.IFSC && "invalid"}`}
                    {...register("IFSC", {
                      required: "IFSC Code is Required",
                    })}
                    onKeyUp={() => {
                      trigger("IFSC");
                    }}
                  />
                  {errors.IFSC && (
                    <small className="text-danger">
                      {errors.IFSC.message}
                    </small>
                  )}
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
