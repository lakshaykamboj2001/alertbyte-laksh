import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const HelpForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    message: "",
    key: "sendemailtest2023",
  });

  const [emailError, setEmailError] = useState(false);
  const router = useRouter();
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // email-validation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
      let result= await fetch('/mailersend/help.php',{
        method:"POST", 
        body: JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },    
     });
     setFormSubmitted(true);
     router.push('/thank-you'); 
      console.log("form fields are OK, now write code for submission");
    } else {
      setEmailError(true);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <section>
      <div className="container">
        <div className="border-div">
          <Form className="cu-form" onSubmit={handleFormSubmit}>

          <h1 className="form-head">Contact Us</h1>

            <div className="fl-name">
              <Form.Group controlId="formBasicName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" name="last_name" value={formData.last_name} onChange={handleFormChange} />
              </Form.Group>
          </div>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="" name="email" value={formData.email} onChange={handleFormChange} isInvalid={emailError} />
            <Form.Control.Feedback type="invalid"> Please provide a valid email address. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea"  rows={8} placeholder="" name="message" value={formData.message} onChange={handleFormChange} />
          </Form.Group>
          {formSubmitted && ( <div className="alrt-text">Thank you! Your data has been submitted. We will get back to you soon.</div>)}

          <Button className="btn btn-fill" type="submit">Submit</Button>
        </Form>
        </div>
      </div >
    </section>

  );
};

export default HelpForm;