import Link from 'next/link';
import React, { useState, useEffect, useContext } from "react";
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Image from 'next/image';
import Moralis from 'moralis';
import StatusContext from '@/store/status-context';
import { useRouter } from "next/router";


const EmailFlow = ({ onGoBack,onhidetitle }) => {
  const { user, setUserData, Moralis, refetchUserData } = useMoralis();
  const [currentStep, setCurrentStep] = useState(1);
  const [mail, setMail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const router = useRouter();

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePreviousMod = () => {
    setCurrentStep(currentStep - 1);
    onGoBack(); // Invoke the callback function passed from the parent component to update the state
  };




  const VerificationEmail = async () => {
    await Moralis.User.requestEmailVerification(user.attributes.email)
      .then((e) => {
        setCurrentStep(currentStep + 1);
        console.log(e);
        setSuccess((prevState) => ({
          ...prevState,
          title: "Verification email sent",
          message:
            "An email is sent to your registered email address. Please verify your email.",
          showSuccessBox: true,
        }));
      })
      .catch((error) => {
        alert("Error: " + error.code + " " + error.message);
      });
  };
  
  useEffect(() => {
    const gotodash= () => {
      console.log("Inside gotodash");
    //  if(user){
       refetchUserData();
       if(currentStep === 2 && user.attributes.emailVerified == true){
         console.log("jii");
         router.push('/dashboard')
       }
       if(currentStep === 3 && user.attributes.emailVerified == true){
         console.log("jiiww");
         router.push('/dashboard')
       }
    //  }
    }
     gotodash();
     const interval = setInterval(gotodash, 4000);
     return () => {
       clearInterval(interval);
     };
   }, [currentStep, user, router, refetchUserData]);


const emailadd = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);
    if (mail !== user.attributes.email) {
      console.log('1')
      setUserData({
        email: mail === "" ? undefined : mail,
      });
      refetchUserData();
      VerificationEmail();
      await refetchUserData();
    } else {
      if (mail === user.attributes.email && !user.attributes.emailVerified) {
        console.log('2')
        try {
          await Moralis.User.requestEmailVerification(user.attributes.email);
          setSuccess((prevState) => ({
            ...prevState,
            title: "Verification email sent",
            message: "An email is sent to your registered email address. Please verify your email.",
            showSuccessBox: true,
          }));
          setCurrentStep(currentStep + 1);
        } catch (error) {
          alert("Error: " + error.code + " " + error.message);
        }
      } else {
        console.log('3')
        if (mail === user.attributes.email && user.attributes.emailVerified) {
            alert("Email Already Exist");
        }
      }
    }
    await refetchUserData();
  } else {
    setEmailError(true);
  }
};




const emailloginwithhide = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);
    onhidetitle();
    VerificationEmail();
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
              <button className='btn btn-fill' onClick={emailadd}>Verify Now</button>
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
                <button className='btn btn-emp' onClick={async ()=>{handlePrevious}}>Go Back</button>
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
