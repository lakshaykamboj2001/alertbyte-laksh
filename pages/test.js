import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

const MyFormComponent = () => {
  const [formDivs, setFormDivs] = useState([{}]);

  const handleAddFormDiv = () => {
    setFormDivs([...formDivs, {}]);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tele:""
  });
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {formDivs.map((formDiv, index) => (
        <div key={index}>
          <Form.Group controlId="formBasicName" className="form-grp">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formBasicName" className="form-grp">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formBasicName" className="form-grp">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group controlId="formBasicName" className="form-grp">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
              </Form.Group>
        </div>
      ))}
      <button type="button" onClick={handleAddFormDiv}>+</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormComponent;
