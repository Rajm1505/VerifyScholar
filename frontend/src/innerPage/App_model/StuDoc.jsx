import React, { useState, useEffect } from "react";
import { Form, FormLabel, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from "../Header";
import ReactLoading from "react-loading";
import swal from 'sweetalert';
import Profile from "./profile";

// import BootstrapSwitchButton from 'bootstrap-switch-button-react';

function StuDoc() {
    const navigate = useNavigate();
    const bgc = { backgroundColor: "#f2f2f2" };
    const [aadhar, setAadhar] = useState();
    const [inc_status, setInc_status] = useState();
    const [aadhaar_status, setAadhaar_status] = useState();
    const [creamy_status, setCreamy_status] = useState();
    const [marksheet10_status, setMarksheet10_status] = useState();
    const [marksheet12_status, setMarksheet12_status] = useState();
    const [disability_status, setDisability_status] = useState();

    const [rf_t, setRf_t] = useState();
    const [vpass, setVpass] = useState();

    const doc2 = true;
    const [aadhaar, setaadhaar] = useState();
    const [incomecertificate, setIncomecertificate] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();
    const [txtbox, setTxtbox] = useState(false);
    const docerror = [];

    useEffect(() => {
        (async () => {
            const response = await fetch('http://127.0.0.1:8000/api/userdoclist/', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            let content = await response.json();
            setInc_status(content.inc_status);
            setAadhaar_status(content.aadhaar_status);
            setRf_t(content.refreshtoken);
            setVpass(content.vpass);
            setCreamy_status(content.creamy_status);
            setMarksheet10_status(content.marksheet10_status)
            setMarksheet12_status(content.marksheet12_status)
            setDisability_status(content.disability_status)

            setIncomecertificate(content.incomecertificate)
            console.log("data : ", content);
            // content.map((doc)=>{
            //     if(doc == false) {
            //         docerror.push(doc)
            //     }
            //     else if(content.disability_status == 'required'){
            //         docerror.push('Disability Document is required')
            //     }    
            // })


            if (content.detail == "Unauthenticated") {
                return navigate('/login');
            }
            // if(content.stuapp == false){
            //     return navigate('/StuApp')
            // }
        }
        )();
    });

    // if (vpass > 0) {
    //     swal({
    //         title: "Oops! Please fix these:",
    //         text: docerror,
    //         icon: "error",
    //         button: "Ok",
    //         dangerMode: true,
    //     });
    // }
    // onClick={loding}
    // const loding= () => {
    //     <ReactLoading type="spinningBubbles" color="#0000FF" height={100}  width={50} />
    // }
    let vpass1;


    if(vpass==3){
        vpass1 = (
            <a href="http://127.0.0.1:8000/api/getfiles">
                            <Button variant="info" >Manual Verification</Button>
                            </a>
            
        )
    }
    else {
        vpass1 = (

            <a href="http://127.0.0.1:8000/api/verify">
                            <Button variant="info" >check Document</Button>
                            </a>
        )
    }

    let manu1;
    let manu2;

    if (rf_t == true) {
        manu1 = (
            <>
                <tr>
                    <td></td>
                    <td>
                        {vpass1}

                    </td>
                </tr>
            </>
        )
    }
    else {
        manu2 = (
            <>
                <tr>
                    <td>
                        <td>Do You have a digiLocker Account or not ? </td>
                        {/* <td><BootstrapSwitchButton checked={txtbox} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No" onClick={() => { setTxtbox(true); }} /></td> */}
                        <td><div className={`form-check form-check-inline ${errors.pms_benificiary_id_radio && "invalid"}`}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value="true"
                                name="pms_benificiary_id_radio"
                                onClick={() => { setTxtbox(true); }}
                            />
                            <label className="form-check-label">Yes</label>
                        </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="false"
                                    name="pms_benificiary_id_radio"
                                    onClick={() => { setTxtbox(false); }}
                                />
                                <label className="form-check-label">No</label>
                            </div></td>
                    </td>
                    <td>
                        {txtbox ? (
                            <a href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://127.0.0.1:8000/api/callback&state=hello">
                                {/* <img src={digi}></img><br /><span>please authorize digilocker account</span> */}
                                <Button variant="info" >authorize digilocker</Button>
                            </a>) : (<a href="https://accounts.digilocker.gov.in/signup/smart_v2">

                                {/* <img src={digi}></img><br />\<span>make digilocker account</span> */}
                                <Button variant="info">make digilocker account</Button>
                            </a>)


                        }
                    </td>
                </tr>

            </>
        )
    }


    const onsubmit = (e) => {
        const message = "Your documents are successfully verified, you will receive a mail regarding the scholarship funds shortly.";
        if (aadhaar_status == true && inc_status == true && creamy_status == true && marksheet10_status == true) {
            <Profile status={message} />
            return navigate('/profile');
        } else {
        }
    };
    if (vpass == 3) {
        const message1 = "You have excedded your automatic verification limit. Please proceed to apply for manual verification!";
            <Profile status={message1}/>
            return navigate('/profile');
    }


    return (
        <>
            <Header />
            <div class="container pt-5">
                <div className="row justify-content-sm-center pt-5">
                    <div className="col-sm-8 shadow round pb-3 ">
                        <h1 className="text-center pt-3 text-secondary">
                            Student Documentation Form
                        </h1>
                        <div className="">
                            <Form.Label></Form.Label>
                            <a href=""></a>
                        </div>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <table className="table table-bordered">

                                    <tbody>
                                        {manu2}
                                        <br />

                                        <tr>
                                            {/* <ReactLoading type="spinningBubbles" color="#0000FF" height={100}  width={50} /> */}
                                            <td><Form.Label>income Certificate</Form.Label><br />
                                                <Form.Text id="passwordHelpBlock" muted>(Please upload certificate in given format, In Case of ITR of family members please merge them in a single file and upload)</Form.Text>
                                            </td>
                                            <td>
                                                {inc_status ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                                {/* <Form.Control type="file" className={`${errors.incomecertificate && "invalid"}`}
                                                    {...register("incomecertificate", {
                                                        required: "Required",
                                                    })} />
                                                {errors.incomecertificate && (
                                                    <small className="text-danger">
                                                        {errors.incomecertificate.message}
                                                    </small>
                                                )} */}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Category/Cast Certificate (non Crimilayar)</Form.Label></td>
                                            <td>
                                                {creamy_status ? (<Form.Label className="text-success">&#10004; (your Document is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in DigiLocker )</Form.Label>)}
                                                {/* <BootstrapSwitchButton checked={true} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No"/> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><Form.Label>10th MarkSheet</Form.Label></td>
                                            <td>

                                                {marksheet10_status ? (<h2 className="text-success">&#10004;</h2>) : (
                                                    <Form.Label className="text-danger"> &#10008;(Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>12th MarkSheet (if 12th completed)</Form.Label></td>
                                            <td>
                                                {marksheet12_status ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>


                                        {/* <tr>
                                            <td className="pt-4">
                                                <Form.Label>Income Certificate</Form.Label>
                                                <br />
                                                <Form.Text id="passwordHelpBlock" muted>
                                                    (Please upload the certificate in a given format, In
                                                    Case of ITR of family members please merge them into a
                                                    single file and upload)
                                                </Form.Text>
                                            </td>
                                            <td className="pt-4">
                                                {doc1 ? (
                                                    <Form.Label className="text-success">
                                                        &#10004; (Your document is successfully submitted)
                                                    </Form.Label>
                                                ) : (
                                                    <Form.Label className="text-danger">
                                                        <h2>&#10008;</h2> (Please upload this document in
                                                        DigiLocker)
                                                    </Form.Label>
                                                )}
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <td><Form.Label>currunt Address Proof</Form.Label></td>
                                            <td>
                                                {aadhaar_status ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        {/* <tr>
                                            <td className="pt-4">
                                                <Form.Label>Permanent Address Proof</Form.Label>
                                            </td>
                                            <td className="pt-3">
                                                {doc1 ? (
                                                    <Form.Label className="text-success">
                                                        &#10004; (Your document is successfully submitted)
                                                    </Form.Label>
                                                ) : (
                                                    <Form.Label className="text-danger">
                                                        <h2>&#10008;</h2> (Please upload this document in
                                                        DigiLocker)
                                                    </Form.Label>
                                                )}
                                            </td>
                                        </tr> */}

                                        {/* <tr>
                                            <td className="pt-4">
                                                <Form.Label>Current Address Proof</Form.Label>
                                            </td>
                                            <td className="pt-3">
                                                {doc1 ? (
                                                    <Form.Label className="text-success">
                                                        &#10004; (Your document is successfully submitted)
                                                    </Form.Label>
                                                ) : (
                                                    <Form.Label className="text-danger">
                                                        <h2>&#10008;</h2> (Please upload this document in
                                                        DigiLocker)
                                                    </Form.Label>
                                                )}
                                            </td>
                                        </tr> */}
                                        <Form.Group>
                                            <label className="col-form-label">
                                                Are you "Differently abled"?
                                            </label>

                                            <div
                                                className={`${errors.disablity && "invalid"}`}
                                            >
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="Yes"
                                                        name="disablity"
                                                        
                                                        onClick={() => { setTxtbox(true); }}
                                                    />
                                                    <label className="form-check-label">Yes</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        value="No"
                                                        name="disablity"
                                                
                                                        onClick={() => { setTxtbox(false); }}
                                                    />
                                                    <label className="form-check-label">No</label>
                                                </div>
                                            </div>
                                        </Form.Group>
                                        {txtbox &&
                                            <tr>
                                                <td className="pt-4">
                                                    <Form.Label>
                                                        Disability Certificate (If required)
                                                    </Form.Label>
                                                </td>
                                                <td className="pt-3">
                                                    {disability_status ? (
                                                        <Form.Label className="text-success">
                                                            <h2>&#10008;</h2> (Your document is successfully submitted)
                                                        </Form.Label>
                                                    ) : (
                                                        <Form.Label className="text-danger">
                                                            <h2>&#10008;</h2> (Please upload this document in DigiLocker)
                                                        </Form.Label>
                                                    )}
                                                </td>
                                            </tr>
                                        }
                                        {manu1}
                                    </tbody>
                                </table>
                            </Form.Group>
                            <input
                                type="submit"
                                className="btn btn-primary btn-lg mt-3 mb-2"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default StuDoc;
