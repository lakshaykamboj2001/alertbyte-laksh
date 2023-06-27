import React, { useState } from "react";
import Image from 'next/image';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import { useRouter } from "next/router";


import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const {
    isAuthenticated,
    authenticate,
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();
  
  const [authwithemail, setauthwithemail] = useState(false);
  const [usermainId, setusermainId] = useState("");


  const router = useRouter();

  const [emailError, setEmailError] = useState(false);
  const [mail,setmail]=useState("")

  async function addPolygonTestnetNetwork() {
    const { ethereum } = window;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }], // Hexadecimal version of 80001, prefixed with 0x
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x1", // Hexadecimal version of 80001, prefixed with 0x
                chainName: "ETH",
                nativeCurrency: {
                  name: "ETHEREUM",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://mainnet.infura.io/v3/155b30e35b1d4a5cb4f2288e57dd7a62",
                ],
                blockExplorerUrls: ["https://etherscan.io/"],
                iconUrls: [""],
              },
            ],
          });
        } catch (addError) {
          console.log("Did not add network");
        }
      }
    }
  }
  
  const metamaskLogin = async () => {
    await addPolygonTestnetNetwork();
    await authenticate({ signingMessage: "AlertBytes Authentication" })
      .then(function (user) {
        // Do something if user is logged in
        console.log("hello ")
      })
      .catch(function (error) { 
        console.log("Metamask authentication error:", error);
      });
  };

  const GetData = async () => {
    if (validateEmail(mail)) {
      setEmailError(false); 

      await authenticate({
        provider: "magicLink",
        email: mail,
        apiKey: "pk_live_B0A4A365CE0E89A5",
        network: "mainnet",
      })
        .then(function (user) {
          console.log(isAuthenticated, "auth or not");
          setauthwithemail(true);
          setusermainId(user.id); 
          console.log(user.id)
          
        })
        .catch(function (error) {
          console.log("Metamask authentication error:", error);
        });
    } else {
      setEmailError(true);
    }
  }
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
       <Button className="btn btn-fill" onClick={GetData}>Send Magic Link</Button>
        <span>OR</span>
       <Button className="btn btn-fill" onClick={() => metamaskLogin()}>Connect Wallet</Button>
      </div>
      <p className="tos-txt">By continuing, you agree to AlertBytes<span>Terms of Service, Privacy Policy</span></p>
   </div>
  );
};

export default LoginForm;