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
const [signupmail,setsignupmail]=useState("")



const [emailError, setEmailError] = useState(false);
const router = useRouter();

 



const [lnCnt , setLnCnt] = useState(true);
const metamaskLogin = async () => {
  await addPolygonTestnetNetwork();
  try {
    const user = await authenticate({ signingMessage: "AlertBytes Authentication" });
    if (user) {
      router.push("/more-details");
    } else {
      console.log("User denied message signature");
      // Redirect to an error page or show an error message
      // router.push("/login-error");
    }
  } catch (error) {
    if (error.code === -32603 && error.message.includes("User denied message signature")) {
      // User denied the message signature
      console.log("User denied the message signature");
      // Redirect to a different page or show an error message
      // router.push("/signature-denied");
    } else {
      console.log("Metamask authentication error:", error);
    }
  }
};




const emaillogin = async () => {
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
        router.push("/settings")
        
      })
      .catch(function (error) {
        console.log("Metamask authentication error:", error);
      });
  } else {
    setEmailError(true);
  }
}




// const emaillogin = async () => {
//   if (validateEmail(mail)) {
//     setEmailError(false);

//     try {
//       // Create a new user object
//       const user = new Moralis.User();
//       user.setUsername(mail); // Set the email as the username
//       user.setEmail(mail);
//       user.setPassword('xs'); // Set a temporary password

//       await user.signUp();

//       // Send verification email
//       await Moralis.User.requestEmailVerification(mail);
//       console.log('Verification email sent.');

//       // Perform necessary actions after successful verification
//       setauthwithemail(true);
//       setusermainId(user.id);
//       router.push('/settings');
//     } catch (error) {
//       console.log('Email verification error:', error);
//     }
//   } else {  
//     setEmailError(true);
//   }
// };



// const emailsign = async () => {
//   if (validateSEmail(signupmail)) {
//     setEmailError(false);

//     try {
//       // // Generate a random password
//       // const password = '1234';

//       // // Create a new user object
//       const user = new Moralis.User();
//       // user.setUsername(signupmail); // Set the email as the username
//       user.setEmail(signupmail);
//       // user.setPassword(password); // Set the random password

//       // await user.signUp();

//       // Send verification email
//       await Moralis.User.requestEmailVerification(signupmail);
//       console.log('Verification email sent.');

//       // Perform necessary actions after successful verification  
//       setauthwithemail(true);
//       setusermainId(user.id);
//       // Redirect the user to a page with instructions to check their email
//       router.push('/check-email');
//     } catch (error) {
//       console.log('Email verification error:', error);
//     }
//   } else {  
//     setEmailError(true);
//   }
// };



const validateEmail = (email) => {                        
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
const validateSEmail = (signupemail) => {                        
  const re = /\S+@\S+\.\S+/;
  return re.test(signupemail);
};

// login

const loginWithEmail = async () => {
  try {
    // Log in with empty username and password
    await Moralis.User.logIn(`${mail}`, '', { mail });

    // Send verification email
    await Moralis.User.requestEmailVerification(mail);
    console.log('Verification email sent.');

    // Redirect the user to a page with instructions to check their email
    router.push('/check-email');
  } catch (error) {
    if (error.code === Moralis.Error.OBJECT_NOT_FOUND) {
      console.log('No user found with the specified email.');
      // Handle the case when no user is found with the specified email
    } else {
      console.log('Error sending verification email:', error);
      // Handle other errors appropriately
    }
  }
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
            <input
                  type="email"
                  name="signup-email"
                  value={signupmail}
                  onChange={(e) => setsignupmail(e.target.value)}
                  id="signup-email"
                  placeholder="Enter Email"
                  isInvalid={emailError}
                />
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
              <Button className="btn btn-fill" onClick={emaillogin}>
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
