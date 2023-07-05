import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Image from 'next/image';

import Moralis from 'moralis';

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

const signupComp = () => {
  const {
    isAuthenticated,
    authenticate,
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();

// ===============================================================================================================



const [authwithemail, setauthwithemail] = useState(false);
const [usermainId, setusermainId] = useState("");
const [mail,setmail]=useState("")


const [emailError, setEmailError] = useState(false);
const router = useRouter();

 



const [lnCnt , setLnCnt] = useState(true);

const metamaskLogin = async () => {
  await addPolygonTestnetNetwork();
  await authenticate({ signingMessage: "AlertBytes Authentication" })
    .then(function (user) {
      router.push("/more-details")
    })
    .catch(function (error) {
      console.log("Metamask authentication error:", error);
    });
};  


// const emaillogin = async () => {
//   if (validateEmail(mail)) {
//     setEmailError(false); 

//     await authenticate({
//       provider: "magicLink",
//       email: mail,
//       apiKey: "pk_live_B0A4A365CE0E89A5",
//       network: "mainnet",
//     })
//       .then(function (user) {
//         console.log(isAuthenticated, "auth or not");
//         setauthwithemail(true);
//         setusermainId(user.id); 
//         router.push("/settings")
        
//       })
//       .catch(function (error) {
//         console.log("Metamask authentication error:", error);
//       });
//   } else {
//     setEmailError(true);
//   }
// }

const emaillogin = async () => {
  if (validateEmail(mail)) {
    setEmailError(false);

    try {
      // Send magic link to the user's email
      const magicLink = await Moralis.User.requestEmailVerification(mail);
      console.log('Magic link sent:', magicLink);

      // Authenticate the user with Moralis
      const user = await Moralis.User.logInWithMagicLink(mail);
      console.log('User authenticated:', user);

      // Perform necessary actions after successful verification
      setauthwithemail(true);
      setusermainId(user.id);
      router.push('/settings');
    } catch (error) {
      console.log('Email verification errorrr:', error);
      // console.log(Moralis.User.requestEmailVerification)
    }
  } else {  
    setEmailError(true);
  }
};



const validateEmail = (email) => {                        
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};



const { fetch: verifyusermail } = useMoralisCloudFunction(
  "verifyusermail",
  { mainid: usermainId },
  {
    autoFetch: false,
  }
);


useEffect(() => {
  if (authwithemail) {
    setUserData({
      email: mail,
    });
    refetchUserData();
    verifyusermail({
      onSuccess: async (object) => {
        console.log("Email Verified");
      },
      onError: (error) => {
        console.log("Email verification Error:", error);
      },
    });
    console.log("done with the new state set");
  }
}, [isAuthenticated]);




const handleLogout = async () => {
  // if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
  await logout();
  if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
  router.reload(window.location.pathname);

};



//===============================================================================================================

  return (
    <>
      <div className="container">
 
      <div className="md-cnt t-center">
        {lnCnt ? (
          <p onClick={()=>{setLnCnt(false)}} className="intr-p">Already Have An Account?<span> Login</span></p>
          ) :(
            <p onClick={()=>{setLnCnt(true)}} className="intr-p">New to AlertBytes?<span> Sign Up</span></p>
          )
        }
        
        <div className="img-div id-icon">
          <Image src="/global/user-icn.png" width={145} height={145} alt="" />
        </div>
        {lnCnt ? (
          <h2 className="mdl-title">Sign Up</h2>
          ) :(
            <h2 className="mdl-title">Login</h2>
          )
        }

        { lnCnt ? (
          <>
            <div className="sign-up-ip">
              <input type="email" placeholder="Enter Email" isInvalid={emailError} />
            </div>
          </>
        ):(
          <>
            <p className="sub-txt">Get a magic link sent to your email that'll sign you in instantly</p>
          </>
        )}

        <div>
          {lnCnt ? (
            <>
              <div className="mdl-butns lg-butns">
              <Button className="btn btn-fill" onClick={()=>{console.log("jo")}}>
                Submit
              </Button>
              <span>OR</span>
              <Button className="btn btn-fill" onClick={metamaskLogin}>
                Connect Wallet
              </Button>
              </div>
            </>
            ) :(
              <>
                <input
                  type="email"
                  name="login-email"
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                  id="login-email"
                  placeholder="Enter Email"
                  isInvalid={emailError}
                />
            
                <div className="mdl-butns lg-butns">
                  <Button className="btn btn-fill" onClick={emaillogin}>
                    Send Magic Link
                  </Button>
                  <span>OR</span>
                  <Button className="btn btn-fill" onClick={metamaskLogin}>
                    Connect Wallet
                  </Button>
                </div>
                
              </>
            )
          }
        </div>
        <p className="tos-txt">By continuing, you agree to AlertBytes<span className='main-span'><span><Link href='/'>Terms of Service</Link></span>,  <span><Link href='/'> Privacy Policy</Link></span></span></p>
      </div>
             
      </div>
    </>
  )
}

export default signupComp
