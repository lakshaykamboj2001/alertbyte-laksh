import Link from 'next/link';
import React, { useState, useEffect, useContext } from "react";
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Image from 'next/image';
import Moralis from 'moralis';
import StatusContext from '/home/webninjaz-developer/Desktop/new/store/status-context';
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

  // useEffect(() => {
  //   if (user) {
  //     refetchUserData();
  //     console.log("fetched")
  //   }
  //   if (currentStep === 2 && user.attributes.emailVerified) {
  //    router.push("/dashboard", undefined, { shallow: true })
  //   }
  //   if (currentStep === 3 && user.attributes.emailVerified) {
  //    router.push("/dashboard", undefined, { shallow: true })
  //   }
  // }, [currentStep, user.attributes.emailVerified, router]);
  



  
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



const emailadd = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);
    if (mail !== user.attributes.email) {
      console.log('1')
      setUserData({
        email: mail === "" ? undefined : mail,
      });
      await refetchUserData();
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
          // Show the error message somewhere
          alert("Error: " + error.code + " " + error.message);
        }
      } else {
        console.log('3')
        if (mail === user.attributes.email && user.attributes.emailVerified) {
          alert("Email Already Exist" );
        }
      }
    }
    await refetchUserData();
  } else {
    setEmailError(true);
  }
};

useEffect(() => {
  const handleUserDataChange = async () => {
    await refetchUserData();

    // Perform the desired action or call the function
    // based on the updated user data
    // For example:
    if (user.attributes.emailVerified) {
      console.log('Email has been verified!');
    }
  };

  handleUserDataChange();
}, [user]);
// delete
const deleteUser = async () => {
  const currentUser = Moralis.User.current();
  
  if (currentUser) {
    try {
      // Delete the user
      await currentUser.destroy();
      console.log('User deleted successfully.');
      
      // Perform any necessary actions after user deletion
      // For example, redirect to a login page or display a success message
      
    } catch (error) {
      console.log('Error deleting user:', error);
      // Handle the error appropriately
    }
  } else {
    console.log('No user is currently logged in.');
    // Handle the case when no user is logged in
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
              <button className='btn btn-emp' onClick={async ()=>{ await refetchUserData();}}>Go Back</button>
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
                <button className='btn btn-emp' onClick={async ()=>{ await refetchUserData();}}>Go Back</button>
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
