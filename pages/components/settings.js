import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const HelpForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tele:""
  });

  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // email-validation
  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateEmail(formData.email)) {
  //     let result= await fetch('/mailersend/help.php',{
  //       method:"POST", 
  //       body: JSON.stringify(formData),
  //       headers:{
  //           "Content-Type":"application/json",
  //           Accept:"application/json"
  //       },    
  //    });
  //    setFormSubmitted(true);
  //    router.push('/thank-you'); 
  //     console.log("form fields are OK, now write code for submission");
  //   } else {
  //     setEmailError(true);
  //   }
  // };

  const getname = (e)=>{
    e.preventDefault();
    console.log(formData.name)


  }
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <section className="">
      <div className="container">
        <div className="border-div">
         <div className="cu-form">

          <h1 className="form-head">Settings</h1>

            <div className="ip-btn">
              <Form.Group controlId="formBasicName" className="form-grp">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>
              <div className="btn-div">
                <button className="btn-emp" onClick={getname} >save</button>
              </div>
            </div>

              <div className="ip-btn">
                <Form.Group controlId="formBasicName" className="form-grp">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="" name="email" value={formData.email} onChange={handleFormChange} />
                </Form.Group>
                <div className="btn-div">
                  <button className="btn-emp" onClick={getname} >save</button>
                </div>
              </div>

            
              <div className="ip-btn">
              <Form.Group controlId="formBasicName" className="form-grp" >
                <Form.Label>Telegram Id</Form.Label>
                <Form.Control type="text" placeholder="" name="tele" value={formData.tele} onChange={handleFormChange} />
              </Form.Group>
                <div className="btn-div">
                  <button className="btn-emp" onClick={getname} >save</button>
                </div>
              </div>
        </div>
        </div>
      </div >
    </section>

  );
};

export default HelpForm;