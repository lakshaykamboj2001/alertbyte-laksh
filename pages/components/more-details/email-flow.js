import React, { useState } from 'react';
import Image from 'next/image';
import Moralis from 'moralis';

const EmailFlow = ({ onGoBack,onhidetitle }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [mail, setMail] = useState('');
  const [emailError, setEmailError] = useState(false);

 
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePreviousMod = () => {
    setCurrentStep(currentStep - 1);
    onGoBack(); // Invoke the callback function passed from the parent component to update the state
  };

const emaillogin = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);
   
    setCurrentStep(currentStep + 1);
   
  //   try {
  //     // Send magic link to the user's email
  //     const magicLink = await Moralis.User.requestEmailVerification(mail);
  //     console.log('Magic link sent:', magicLink);

  //     // Authenticate the user with Moralis
  //     const user = await Moralis.User.logInWithMagicLink(mail);
  //     console.log('User authenticated:', user);

  //     // Perform necessary actions after successful verification
  //     setCurrentStep(currentStep + 1);
  //   } catch (error) {
  //     console.log('Email verification errorrr:', error);
  //     // console.log(Moralis.User.requestEmailVerification)
  //   }
  } else {  
    setEmailError(true);
  }
};

const emailloginwithhide = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);
    console.log("first rend")
    onhidetitle()
    setCurrentStep(currentStep + 1);
   
    // try {
    //   // Send magic link to the user's email
    //   const magicLink = await Moralis.User.requestEmailVerification(mail);
    //   console.log('Magic link sent:', magicLink);

    //   // Authenticate the user with Moralis
    //   const user = await Moralis.User.logInWithMagicLink(mail);
    //   console.log('User authenticated:', user);

    //   // Perform necessary actions after successful verification
    //   setCurrentStep(currentStep + 1);
    // } catch (error) {
    //   console.log('Email verification errorrr:', error);
    //   // console.log(Moralis.User.requestEmailVerification)
    // }
  } else {  
    setEmailError(true);
  }
};


const validateEmail = (email) => {                        
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

  
  const flow = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
          <div className="second-mflow ">
            <input type="text" value={mail} placeholder="Enter Email" isInvalid={emailError} onChange={(e) => { setMail(e.target.value); }}></input>
            <div className="btn-div lg-butns align-lg-butns">
              <button className='btn btn-fill' onClick={emaillogin}>Verify Now</button>
              <button className='btn btn-emp' onClick={handlePreviousMod}>Go Back</button>
            </div>
          </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="md-cnt t-center ">
              <div className="img-div id-icon">
                <Image src="/global/mail-icn.png" width={200} height={200} alt="" />
              </div>
              <h2 className="mdl-title">Please Verify Your Email</h2>
              <div className="main-vari-p">
                <div className='vari-p'>we have sent an email to <span className='user-mail'> {mail} </span><span className='d-block'>click on the link to complete your signup</span></div>
                <div className='vari-p'>Still cant find the email? No Problem.</div>
              </div>
              <div className="btn-div lg-butns align-lg-butns">
                <button className='btn btn-fill' onClick={emailloginwithhide}>Resend Verification Email</button>
                <button className='btn btn-emp' onClick={handlePrevious}>Go Back</button>
              </div>
            </div>
          </>
        );

      case 3:
        return (
         <>
         <div className="md-cnt t-center ">
         <p className="intr-p">New to AlertBytes?<span> Sign Up</span></p>
              <div className="img-div id-icon">
                <Image src="/global/mail-icn.png" width={200} height={200} alt="" />
              </div>
              <h2 className="mdl-title">An Email Is On Its Way!</h2>
              <div className="main-vari-p">
                <div className='vari-p'>we have sent an email to <span className='user-mail'> {mail} </span><span className='d-block'>you'll find a magic link that will log you in</span></div>
                <div className='vari-p'>the link expires in 24hours, <span className='d-block'>so be sure to use it soon</span></div>
                <h2 className="mdl-title">Go Check Your Email!</h2>
              </div>
              <div className="btn-div lg-butns align-lg-butns">
                <button className='btn btn-fill' onClick={()=>{console.log("clicked")}}>Resend Verification Email</button>
                <button className='btn btn-emp' onClick={handlePrevious}>Go Back</button>
              </div>
            </div>
         </>
        )
      default:
        return null;
    }
  };

  return (
    <>
    <div className="main-emailflow-div">
      {flow()}
    </div>
    </>
  );
};

export default EmailFlow;
