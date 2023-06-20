import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';

const ContactForm = () => {
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

      <div className="fl-name">
        <Form.Group controlId="formBasicName">
          <Form.Label>First Name<span>*</span></Form.Label>
          <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Last Name<span>*</span></Form.Label>
          <Form.Control type="text" placeholder="" name="last_name" value={formData.last_name} onChange={handleFormChange} />
        </Form.Group>
      </div>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email<span>*</span></Form.Label>
        <Form.Control type="email" placeholder="" name="email" value={formData.email} onChange={handleFormChange} isInvalid={emailError} />
        <Form.Control.Feedback type="invalid"> Please provide a valid email address. </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Company Name<span>*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="company_name" value={formData.company_name} onChange={handleFormChange} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>GitHub Link/Smart Contract Address<span>*</span></Form.Label>
        <Form.Control type="text" placeholder="" name="git_name" value={formData.git_name} onChange={handleFormChange} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Username- Telegram/Skype/Twitter</Form.Label>
        <Form.Control type="text" placeholder="" name="user_name" value={formData.user_name} onChange={handleFormChange} />
      </Form.Group>

      <Form.Group controlId="formBasicSelect">
        <Form.Control as="select" name="select" className="cu-audit" value={formData.select} onChange={handleFormChange} > 
          <option value="">Type Of Audit Service (Required)</option> 
          <option value="smart contract Audit">Smart Contract Audit</option> 
          <option value="Blockchain security Audit">Blockchain Security Audit</option> 
          <option value="Penetration Testing">Penetration Testing</option> 
          <option value="Web3 Security Consulting">Web3 Security Consulting</option> 
          <option value="Digital asset Security">Digital Asset Security</option> 
         </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicDate">
      <Form.Label>What is Your Timeline for the Completion of the Audit?  </Form.Label>
        <Form.Control type="date" name="date" placeholder="dd-mm-YYYY" value={formData.date} min={currentDate} onChange={handleFormChange} />
      </Form.Group>
       
      {formSubmitted && ( <div className="alrt-text">Thank you! Your data has been submitted. We will get back to you soon.</div>)}

       
      <Button className="btn btn-fill" type="submit">Submit</Button>
    </Form>
  );
};

export default ContactForm;