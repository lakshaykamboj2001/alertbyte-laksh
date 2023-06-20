import React, { useState } from "react";
import Image from 'next/image';
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [emailError, setEmailError] = useState(false);
  const [mail,setmail]=useState("")

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  return (
   <div className="md-cnt">
      <p className="intr-p">New to AlertBytes?<span> Sign Up</span></p>
      <div className="img-div id-icon">
        <Image src="/global/user-icn.png" width={145} height={145} alt="" />
      </div>
      <h2 className="mdl-title">Login</h2>
      <p className="sub-txt">Get a magic link sent to your email that'll sign you in instantly</p>
      <input type="email" name="login-email" value={mail} onChange={(e)=>{setmail(e.target.value)}}  id="login-email" placeholder='Enter Email' isInvalid={emailError}></input>
      <div className="mdl-butns">
       <Button className="btn btn-fill" >Send Magic Link</Button>
        <span>OR</span>
       <Button className="btn btn-fill" >Connect Wallet</Button>
      </div>
      <p className="tos-txt">By continuing, you agree to AlertBytes<span>Terms of Service, Privacy Policy</span></p>
   </div>
  );
};

export default LoginForm;