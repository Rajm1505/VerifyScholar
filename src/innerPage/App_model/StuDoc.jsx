import React,{useState} from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";

function StuDoc() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();

    const[state, setState] = useState();
    const JsonResponse = (value) => {
        axios.get(`http://127.0.0.1:8000/StuDoc/`)
        .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons);
      }) 
      }

    return (
        <>
            {/* <Header /> */}
            <div class="container pt-5">
                <div className="row justify-content-sm-center pt-5">
                    <div className="col-sm-8 shadow round pb-3">
                        <h1 className="text-center pt-3 text-secondary">
                            Student Documentation Form
                        </h1>
                        <div>
                            <a className="btn btn-success" href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://localhost:8000/callback&state=hello">Authorize Digilocker</a>
                        </div>
                        <div className="">
                            <Form.Label></Form.Label>
                            <a href=""></a>
                        </div>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Category/Cast Certificate </Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>10th MarkSheet</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>12th MarkSheet (if 12th completed)</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>income Certificate</Form.Label>
                                <Form.Label className="small">(Please upload certificate in given format, In Case of ITR of family members please merge them in a single file and upload)</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Self Photograph</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Self Signature</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Permanent Address Proof</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Current Address Proof</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Disability Certificate(if Required)</Form.Label>
                                {/* <Form.Control type="file" /> */}
                            </Form.Group>
                            <hr/>
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
