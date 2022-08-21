import React, { useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import axios from "axios";
import digi from "../../images/digilocker.png";
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function StuDoc() {
  const bgc = { backgroundColor: "#f2f2f2" };

  const [txtbox, setTxtbox] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const doc1 = true;
  const doc2 = false;

  const onSubmit = (data) => {
    console.table(data);
    const Data1 = JSON.stringify(data);
    console.table(Data1);
    // axios
    //   .post("http://127.0.0.1:8000/api/register/", Data1)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    reset();
  };

  return (
    <>
      {/* <Header /> */}
      <div className="container pt-5 pb-5">
        <div className="row justify-content-sm-center pt-5">
          <div className="col-sm-8 shadow round pb-3 " style={bgc}>
            <h1 className="text-center pt-3 text-secondary">
              Student Documentation Form
            </h1>
            {/* <div className="">
              <Form.Label></Form.Label>
              <a href=""></a>
            </div> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formFile" className="mb-3">
                <table className="table table-hover table-bordered">
                  <tbody>
                    <tr>
                      <td className="pt-3">
                        <FormLabel>
                          Do you have a DigiLocker account or not ?
                        </FormLabel>
                        <br />
                        {/* <td><BootstrapSwitchButton checked={txtbox} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No" onClick={() => { setTxtbox(true); }} /></td> */}
                        <div
                          className={`form-check-inline ${
                            errors.pms_benificiary_id_radio && "invalid"
                          }`}
                        >
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input pr-3"
                              type="radio"
                              value="true"
                              name="pms_benificiary_id_radio"
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
                              value="false"
                              name="pms_benificiary_id_radio"
                              onClick={() => {
                                setTxtbox(false);
                              }}
                            />
                            <label className="form-check-label">No</label>
                          </div>
                        </div>
                      </td>
                      <td align="center">
                        {txtbox == true ? (
                          <div>
                            <a
                              href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://localhost:8000/callback&state=hello"
                              className="btn btn-success mt-3"
                            >
                              Authorize DigiLocker
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                        {txtbox == false ? (
                          <div>
                            <a
                              href="https://accounts.digilocker.gov.in/signup/smart_v2"
                              className="btn btn-success mt-3"
                            >
                              Create DigiLocker account
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td className="pt-4">
                        <h5>Document Names</h5>
                      </td>
                      <td className="pt-3">
                        <Form.Label>
                          <div>
                            <h5>Documents submited in DigiLocker or not !</h5>
                          </div>
                        </Form.Label>
                      </td>
                    </tr>

                    <tr>
                      <td className="pt-4">
                        <Form.Label>Category/Cast Certificate </Form.Label>
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
                        {/* <BootstrapSwitchButton checked={true} onstyle="warning" offstyle="danger" size="sm" onlabel="Yes" offlabel="No"/> */}
                      </td>
                    </tr>
                    <tr>
                      <td className="pt-4">
                        <Form.Label>10th MarkSheet</Form.Label>
                      </td>
                      <td className="pt-3">
                        {doc2 ? (
                          <h2 className="text-success">&#10004;</h2>
                        ) : (
                          <Form.Label className="text-danger">
                            {" "}
                            &#10008;(Please upload this document in DigiLocker)
                          </Form.Label>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="pt-4">
                        <Form.Label>
                          12th MarkSheet (if 12th completed)
                        </Form.Label>
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
                      <td className="pt-4">
                        <Form.Label>Self Signature</Form.Label>
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
