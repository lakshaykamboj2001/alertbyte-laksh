import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

const TeleFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [telegram, setTelegram] = useState("");
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index, event) => {
    const value = event.target.value;
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
  };

// =========================

const CodeSent = async () => {
  
  try {
    await fetch('/api/telegramVerification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( telegram ),
    });
    // Success, handle the next steps (e.g., show a verification code input field)
    console.log("code sent to this username",telegram)
  } catch (error) {
    console.error('Error submitting form:', error);
    if (error.response) {
      console.log('Telegram API error:', error.response.data);
    }
    // Handle the error accordingly
  }
  
  
};




// =========================





  const handleVerify = () => {
    const verificationCode = code.join('');
    console.log('Verification code:', verificationCode);
    // Perform verification logic with the code
  };



  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const tflow = () => {
    return (
      <>
       <div className="main-teleflow-div">
       <div className="main-step-div">
        <div className="line">
          <div className={`point ${currentStep >= 1 ? 'completed' : ''}`}> </div>
          <span></span>
          <div className={`point ${currentStep >= 2 ? 'completed' : ''}`}></div>
          <span></span>
          <div className={`point ${currentStep >= 3 ? 'completed' : ''}`}></div>
        </div>
        
        <div className="step-label">
          <p className={`step-text ${currentStep >= 1 ? 'completed' : ''}`}>Step 1</p>
          <p className={`step-text ${currentStep >= 2 ? 'completed' : ''}`}>Step 2</p>
          <p className={`step-text ${currentStep >= 3 ? 'completed' : ''}`}>Step 3</p>
        </div>

      </div>

        {currentStep === 1 && (
          <div className="second-teleflow">
           <p className='teleflow-fs'>Send a massage to our telegram bot</p> 
           <Link className='teleflow-fs link-text text-underline'  href={`https://telegram.me/alertbytes_bot`}
                target="_blank"
                rel="noopener noreferrer">telegram/message</Link>
           <div className="btn-div lg-butns align-lg-butns">
            
            <button className='btn btn-fill' onClick={handleNext}>I Have Done The Above</button>
           </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="">
            <input type="text" value={telegram} placeholder="Enter Username" onChange={(e)=>{setTelegram(e.target.value)}}/>
            <div className="btn-div lg-butns align-lg-butns">
             <button className='btn btn-fill' onClick={CodeSent}>Next</button>
            </div>
            {/* <button onClick={handlePrevious}>previous</button> */}
          </div>
        )}
        {currentStep === 3 && (
           <div className="">
           <p className='teleflow-fs'>Enter The Verification Code<span className='d-block'>Send To Your Telegram Account</span></p>
           <div className="code-input-div">
             {code.map((value, index) => (
               <input
                 key={index}
                 type="text"
                 maxLength={1}
                 value={value}
                 onChange={(event) => handleCodeChange(index, event)}
               />
             ))}
           </div>
           <div className="btn-div lg-butns align-lg-butns">
             <button className='btn btn-fill' onClick={handleVerify}>Verify</button>
           </div>
           <div className="resend-div">
             <span>Didn't Receive The Code?</span>
             <span className='link-text text-underline d-block'>Resend code</span>
           </div>
           {/* <button onClick={handlePrevious}>previous</button> */}
         </div>
        )}
       </div>
      </>
    );
  };

  return <>{tflow()}</>;
};

export default TeleFlow;
