import React ,{useState} from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import digi from "../../images/digilocker.png"
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Header from "../../login/Header";



function StuDoc() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

const doc1=true;
const doc2=false;
const [txtbox, setTxtbox] = useState(false);

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
                                                    <a href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://localhost:8000/callback&state=hello">
                                                        <img src={digi}></img><br />
                                                        <span>please authorize digilocker account</span>
                                                    </a>) : (<a href="#">
                                                        <img src={digi}></img><br />
                                                        <span>make digilocker account</span>
                                                    </a>)
                                                }
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>

                                            <td></td>
                                            <td><Form.Label>your document is submited in digilocker or not !</Form.Label></td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Category/Cast Certificate </Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                                {/* <BootstrapSwitchButton checked={true} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No"/> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><Form.Label>10th MarkSheet</Form.Label></td>
                                            <td>
                                                {doc2 ? (<h2 className="text-success">&#10004;</h2>) : (
                                                    <Form.Label className="text-danger"> &#10008;(Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>12th MarkSheet (if 12th completed)</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>income Certificate</Form.Label><br />
                                                <Form.Text id="passwordHelpBlock" muted>(Please upload certificate in given format, In Case of ITR of family members please merge them in a single file and upload)</Form.Text>
                                            </td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Self Photograph</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Self Signature</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Permanent Address Proof</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Current Address Proof</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Disability Certificate(if Required)</Form.Label></td>
                                            <td>
                                                {doc1 ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
export default StuDoc;
