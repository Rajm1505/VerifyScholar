// import "./App.css";
import React ,{useState} from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import Header from "./Header";
import { useForm } from "react-hook-form";
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
  const states =[
    
        {value:'Andhra Pradesh', label:'Andhra Pradesh'},
        {value:'Arunachal Pradesh',label:'Arunachal Pradesh'},
        {value:'Assam',label:'Assam'},
        {value:'Bihar',label:'Bihar'},
        {value:'Chhattisgarh',label:'Chhattisgarh'},
        {value:'Delhi',label:'Delhi'},
        {value:'Goa',label:'Goa'},
        {value:'Gujarat',label:'Gujarat'},
        {value:'Haryana',label:'Haryana'},
        {value:'Himachal Pradesh',label:'Himachal Pradesh'},
        {value:'Jammu and Kashmir',label:'Jammu and Kashmir'},
        {value:'Jharkhand',label:'Jharkhand'},
        {value:'Karnataka',label:'Karnataka'},
        {value:'Kerala',label:'Kerala'},
        {value:'Madhya Pradesh',label:'Madhya Pradesh'},
        {value:'Maharashtra',label:'Maharashtra'},
        {value:'Manipur',label:'Manipur'},
        {value:'Meghalaya',label:'Meghalaya'},
        {value:'Mizoram',label:'Mizoram'},
        {value:'Nagaland',label:'Nagaland'},
        {value:'Orissa',label:'Orissa'},
        {value:'Punjab',label:'Punjab'},
        {value:'Rajasthan',label:'Rajasthan'},
        {value:'Sikkim',label:'Sikkim'},
        {value:'Tamil Nadu',label:'Tamil Nadu'},
        {value:'Tripura',label:'Tripura'},
        {value:'Uttar Pradesh',label:'Uttar Pradesh'},
        {value:'Uttarakhand',label:'Uttarakhand'},
        {value:'West Bengal',label:'West Bengal'},
        {value:'Other',label:'Other'}

  ];

 const nspinput = () => {
    return (
        
        <div>
          <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="emailid" placeholder="Enter email" />
        </Form.Group>
        </div>
    );
    
 };
 


  const onSubmit = (data) => {
    console.log(data);
    const Data1 = JSON.stringify(data);
    console.log(Data1);

    // try {
    //     const resp =await axios.post("", Data)
    //     console.log(resp.data);
    // }catch (error){
    //     consol.log(error.response);

    // }
    axios.post('http://127.0.0.1:8000/api/register/', Data1)
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
    <div className="container pt-5">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow round pb-3">
          <h1 className="text-center pt-3 text-secondary">
            Student Registration Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Do You have NSP ID: </Form.Label>
                <br/>
                <Form.Text id="passwordHelpBlock" muted>
                (For Post/Pre Matric Scholarship for SCs, Post/Pre Matric Scholarship for OBCs, or Top-Class Scholarship Schemes for SCs and OBCs (TCS) in the immediately preceding year)</Form.Text><br/>
                <div className={`form-check form-check-inline ${errors.nsp_id_radio && "invalid"}`}
                {...register("nsp_id_radio", {
                  required: "NSP id is Required" })}>
                
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  name="nsp_id_radio" 
                  />
                
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value={false}
                  name="nsp_id_radio"
                />
                <label className="form-check-label">No</label>
              </div>
                <div className="form-check form-check-inline mb-3" >
                     <Form.Label className="form-check-label-inline" >Enter Your NSP ID:  </Form.Label>
                    <Form.Control type="text"  className="form-input-inline" 
                    {...register("nsp_id",{ required: "nsp is Required" })} />
                </div>
                <div>
                {errors.nsp_id && (
                    <small className="text-danger">{errors.nsp_id.message}</small>
                    )}
                </div>
            </Form.Group>

            <Form.Group>
                <div>

                <Form.Label>Do you have State PMS Beneficiary ID:</Form.Label>
                </div>
           
                <div className={`form-check form-check-inline ${errors.pms_benificiary_id_radio && "invalid"}`}
                {...register("pms_benificiary_id_radio", {
                  required: "State PMS Beneficiary ID is Required" })}>
                
                <input
                  className="form-check-input"
                  type="radio"
                  value="true"
                  name="pms_benificiary_id_radio" 
                  />
                
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  value="false"
                  name="pms_benificiary_id_radio"
                />
                <label className="form-check-label">No</label>
              </div>
                <div className="float-right form-check ">
                     <Form.Label className="form-check-label-inline float-right" >Enter Your State PMS Beneficiary ID:</Form.Label>
                    <Form.Control type="text"  className="form-input-inline float-right"
                    {...register("pms_benificiary_id", { required: "pms is Required" })}  />
                </div>
                {errors.pms_benificiary_id && (
                <small className="text-danger">{errors.pms_benificiary_id.message}</small>
              )}
            </Form.Group>
                  

            <div className="form-group">
              <label className="col-form-label">Category :</label>

              <Form.Select
                className={`form-control ${errors.category && "invalid"}`}
                {...register("category", { required: "Category is Required" })}
                >
                <option value="">-- Select -- </option>
                {Category.map((Category) => (
                  <option key={Category.value} value={Category.value}>
                    {Category.label}
                  </option>
                ))}
              </Form.Select>
              {errors.Category && (
                <small className="text-danger">{errors.Category.message}</small>
              )}
            </div>
            &nbsp;

              <Form.Group>
                
              <label className="col-form-label">Name:</label>
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
                </Form.Group>
           

            <div className="form-group">
              <label className="col-form-label">Father Name:</label>
              <input
                type="text"
                className={`form-control ${errors.fname && "invalid"}`}
                {...register("fname", { required: "Father Name is Required" })}
                onKeyUp={() => {
                  trigger("fname");
                }}
              />
              {errors.fname && (
                <small className="text-danger">{errors.fname.message}</small>
              )}
            </div>

            <div className="form-group">
                <label className="col-form-label">Gender:</label><br/>
                  <div className={`form-check-inline ${errors.gender && "invalid"}`} 
                    {...register("gender", {required: "Gender is Required" })}>
                          <input className="form-check-input" type="radio" value="M" name="gender" {...register("gender", {required: "Gender is Required" })} /> Male &nbsp;
                          <input className="form-check-input" type="radio" value="F" name="gender" {...register("gender", {required: "Gender is Required" })} /> Female &nbsp;
                          <input className="form-check-input" type="radio" value="O" name="gender" {...register("gender", {required: "Gender is Required" })} /> Other &nbsp;
                  </div>
               <div>
                  {errors.gender && ( <small className="text-danger">{errors.gender.message}</small>)}
                </div>
            </div>

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
                {...register("dob", { required: "Date of Birth is Required" })}
                />
                {errors.dob && (
                <small className="text-danger">{errors.dob.message}</small>
              )}
            </Form.Group>
            &nbsp;

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" 
              className={`${errors.password && "invalid"}`}
              {...register("password",
               { required: "paasword is Required" ,
                pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/ ,
                        message: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",}
                    })} 
              />
              {errors.password&& (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </Form.Group>
            &nbsp;
            <Form.Group controlId="c_password">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" name="c_password" 
              className={`${errors.confirmPwd ? 'is-invalid' : ''}`}
              {...register("c_password" ,{
                required: "confirm password is required"
            })}
              />
              {errors.c_password&& (
                <small className="text-danger">{errors.c_password.message}</small>
              )}
            </Form.Group>
            &nbsp;
{/* -------------------------------------------------------------------------------------------------------------------- */}

{/* ---------------------------------------------------------------------------------------------------------------------- */}
            <Form.Group>
              <Form.Label>State of Passing 10th Exam:</Form.Label>
              <Form.Select className={`${errors.state && "invalid"}`}
                {...register("state_of_passing_10th_exam", { required: "State is Required" })}
              >
                <option value="">-- Select -- </option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </Form.Select>
              {errors.state_of_passing_10th_exam && (
                <small className="text-danger">{errors.state_of_passing_10th_exam.message}</small>
              )}
            </Form.Group>
            &nbsp;
            <Form.Group>
                <Form.Label>10th Board Certificate Number: </Form.Label>
                <Form.Control type="text"
                className={`form-control ${errors.certificateno && "invalid"}`}
                {...register("board_10th_certificate_number", {
                  required: "Cerificate number is Required" , pattern: {
                    value: /^[0-9]*$/,
                    message: "Only numbers are allowed",
                  }})} />
                  {errors.certificateno && (
                <small className="text-danger">{errors.certificateno.message}</small>
              )}
            </Form.Group>
            &nbsp;
            <Form.Group>
                <Form.Label>Year of passing 10th Board: </Form.Label>
                <Form.Control type="number"
                className={`form-control ${errors.year_of_passing_10th_board && "invalid"}`}
                {...register("year_of_passing_10th_board", {
                  required: "passing year is Required" , 
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
                  }})} />
                  {errors.year_of_passing_10th_board && (
                <small className="text-danger">{errors.year_of_passing_10th_board.message}</small>
              )}
            </Form.Group>

            <input
              type="submit"
              className="btn btn-primary my-3"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;