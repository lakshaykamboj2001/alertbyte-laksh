import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    company_name: "",
    git_name: "",
    user_name: "",
    select: "",
    date: "",
    key: "sendemailtest2023",
  });

  const [emailError, setEmailError] = useState(false);
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in the format "YYYY-MM-DD"
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  // email-validation
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
     let result= await fetch('/mailersend/send.php',{ 
      method:"POST", 
      body: JSON.stringify(formData),
      headers:{
          "Content-Type":"application/json",
          Accept:"application/json"
      },    
   }); 
      setFormSubmitted(true);
      router.push('/thank-you'); 
      console.log("formData clicked");
    } else {
      setEmailError(true);
      //router.push('/thank-you');
    }
  };



  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Form className="cu-form" onSubmit={handleFormSubmit}>

      <h4 className="form-head">Request a Quote</h4>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email<span>*</span></Form.Label>
        <Form.Control type="email" placeholder="" name="email" value={formData.email} onChange={handleFormChange} isInvalid={emailError} />
        <Form.Control.Feedback type="invalid"> Please provide a valid email address. </Form.Control.Feedback>
      </Form.Group>

      {formSubmitted && ( <div className="alrt-text">Thank you! Your data has been submitted. We will get back to you soon.</div>)}
       
      <Button className="btn btn-fill" type="submit">Submit</Button>

    </Form>
  );
};

export default LoginForm;