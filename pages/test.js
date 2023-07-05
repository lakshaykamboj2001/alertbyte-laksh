// import React, { useState } from 'react';
// import { Form, Button } from "react-bootstrap";

// const MyFormComponent = () => {
//   const [formDivs, setFormDivs] = useState([{}]);

//   const handleAddFormDiv = () => {
//     setFormDivs([...formDivs, {}]);
//   };
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     tele:""
//   });
//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission
//     // ...
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {formDivs.map((formDiv, index) => (
//         <div key={index}>
//           <Form.Group controlId="formBasicName" className="form-grp">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
//               </Form.Group>
//               <Form.Group controlId="formBasicName" className="form-grp">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
//               </Form.Group>
//               <Form.Group controlId="formBasicName" className="form-grp">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
//               </Form.Group>
//               <Form.Group controlId="formBasicName" className="form-grp">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" placeholder="" name="name" value={formData.name} onChange={handleFormChange} />
//               </Form.Group>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddFormDiv}>+</button>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyFormComponent;

import { useState } from 'react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // You can perform validation, make API calls, etc.
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            1st form
            <button type="submit" onClick={handleNext}>Next</button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit}>
            Form 2 fields
            <button onClick={handlePrevious}>Previous</button>
            <button type="submit">Next</button>
          </form>
        );
      // Add more cases for each form step
      // case 3:
      //   return ...
      // case 4:
      //   return ...
      // ...
      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
    </div>
  );
};

export default MultiStepForm;
