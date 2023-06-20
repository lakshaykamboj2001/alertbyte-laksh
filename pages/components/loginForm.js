import React, { useState } from "react";
import Image from 'next/image';
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {

  return (
   <div className="md-cnt">
      <p className="intr-p">New to AlertBytes?<span>Sign Up</span></p>
      <div className="img-div">
        <Image
          src="/userimg.png"
          width={145}
          height={145}
          alt=""  
        />
      </div>
      <h2 className="mdl-title">Login</h2>
      <p>Get a magic link sent to your email that'll sign you in instantly</p>
      <div className="login-mdl-butns">
       <Button className="btn btn-fill" >Send Magic Link</Button>
        <span>OR</span>
       <Button className="btn btn-fill" >Connect Wallet</Button>
      </div>
      <p>By continuing, you agree to AlertBytes<span>Terms of Service, Privacy Policy</span></p>


   </div>
  );
};

export default LoginForm;