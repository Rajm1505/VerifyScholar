import { Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import digi from "../../images/digilocker.png";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";

import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Header from "../../login/Header";

function StuDoc() {
    const bgc = { backgroundColor: "#f2f2f2" };
    const doc1 = true;
    const doc2 = true;
    const [aadhar, setAadhar] = useState();
    const [incomecertificate, setIncomecertificate] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const [txtbox, setTxtbox] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await fetch('http://127.0.0.1:8000/api/userdoclist/', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            let content = await response.json();
            setAadhar(content.aadhar)
            setIncomecertificate(content.incomecertificate)
            console.log(content);
        }
        )();
    });



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
                                                    <a href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://127.0.0.1:8000/api/callback&state=hello">
                                                        <img src={digi}></img><br />
                                                        <span>please authorize digilocker account</span>
                                                    </a>) : (<a href="https://accounts.digilocker.gov.in/signup/smart_v2">
                                                        <img src={digi}></img><br />
                                                        <span>make digilocker account</span>
                                                    </a>)
                                                }
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td><Form.Label>Category/Cast Certificate </Form.Label></td>
                                            <td>
                                                {aadhar ? (<Form.Label className="text-success">&#10004; (your Document is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in DigiLocker )</Form.Label>)}
                                                {/* <BootstrapSwitchButton checked={true} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No"/> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><Form.Label>10th MarkSheet</Form.Label></td>
                                            <td>
                                                {incomecertificate ? (<h2 className="text-success">&#10004;</h2>) : (
                                                    <Form.Label className="text-danger"> &#10008;(Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>12th MarkSheet (if 12th completed)</Form.Label></td>
                                            <td>
                                                {aadhar ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td><Form.Label>income Certificate</Form.Label><br />
                                                <Form.Text id="passwordHelpBlock" muted>(Please upload certificate in given format, In Case of ITR of family members please merge them in a single file and upload)</Form.Text>
                                            </td>
                                            <td>
                                                {incomecertificate ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
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
                                        </tr>

                                        <tr>
                                            <td className="pt-4">
                                                <Form.Label>Self Photograph</Form.Label>
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
                                        </tr>

                                        <tr>
                                            <td><Form.Label>Permanent Address Proof</Form.Label></td>
                                            <td>
                                                {aadhar ? (<Form.Label className="text-success">&#10004; (your Documente is successfully submitted)</Form.Label>) : (
                                                    <Form.Label className="text-danger"><h2>&#10008;</h2> (Please Upload this document in Digi Locker )</Form.Label>)}
                                            </td>
                                        </tr>

                                        <tr>
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
                                        </tr>

                                        <tr>
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
                                        </tr>

                                        <tr>
                                            <td className="pt-4">
                                                <Form.Label>
                                                    Disability Certificate (If required)
                                                </Form.Label>
                                            </td>
                                            <td className="pt-3">
                                                {doc1 ? (
                                                    <Form.Label className="text-success">
                                                        &#10004; (Your document is successfully submitted)
                                                    </Form.Label>
                                                ) : (
                                                    <Form.Label className="text-danger">
                                                        &#10008; (Please upload this document in DigiLocker)
                                                    </Form.Label>
                                                )}
                                            </td>
                                        </tr>
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
