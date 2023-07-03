import { FaBars, FaTimes, FaMinus } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MegaMenu from './megamenu'
import { useRouter } from 'next/router';
import LoginForm from './loginForm';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';


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

  const MobAuditModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
      <div className="btn-div">
        <Button className="btn btn-fill btn-outline ex-port-lg" onClick={handleShow}> Request Audit </Button>
      </div>
        <Modal show={show} onHide={handleClose} centered className="req-audit-modal">
          <Button className="ram-close" onClick={handleClose}> <FaTimes /> </Button>
          <Modal.Body>
            <ContactForm />
          </Modal.Body>
        </Modal>
      </>
    );
  };


function BsNavDropdown() {
  useEffect(() => {
    // const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownToggle = document.querySelector('.navbar-toggler');
    const mmClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
  
    if (dropdown && dropdownMenu && dropdownToggle) {
      dropdown.addEventListener('mouseenter', () => {
        dropdownMenu.classList.add('show');
      });
      dropdown.addEventListener('mouseleave', () => {
        dropdownMenu.classList.remove('show');
      });
      dropdownToggle.addEventListener('click', () => {
        mobileMenu.style.transform='translateX(0)';
      });
      mmClose.addEventListener('click', () => {
        mobileMenu.style.transform='translateX(100%)';
      });
    }
  }, []);
  return (
    <li className="nav-item dropdown">
      <a className="nav-link" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" > Services<span></span> </a>
      <div className="dropdown-menu mega-dropdown" aria-labelledby="navbarDropdown">
        <MegaMenu />
      </div>
    </li>
  );
}

 function Header() {
  
  const [activeKey, setActiveKey] = useState('');
  const [activeKeytwo, setActiveKeytwo] = useState('');
  const [activeKeythree, setActiveKeythree] = useState('');
// ===============================================================================================================
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
const [mail,setmail]=useState("")
const [emailError, setEmailError] = useState(false);
const router = useRouter();

const [show, setShow] = useState(false);  

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);



const metamaskLogin = async () => {
  await addPolygonTestnetNetwork();
  await authenticate({ signingMessage: "AlertBytes Authentication" })
    .then(function (user) {
      // Do something if user is logged in
    })
    .catch(function (error) {
      console.log("Metamask authentication error:", error);
    });
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
        console.log(user)
        
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
  // router.reload(window.location.pathname);
};

// useEffect(() => {
//   const handleAccountsChanged = (accounts) => {
//     if (accounts.length === 0) {
//       alert('User canceled the request');
//       // Perform additional actions or handle the cancellation as needed
//     } else {
//       // User approved the request, handle the returned accounts
//       console.log(accounts);
//     }
//   };

//   ethereum.on('accountsChanged', handleAccountsChanged);

//   return () => {
//     ethereum.off('accountsChanged', handleAccountsChanged);
//   };
// }, []);

// ===============================================================================================================


  // Listen for page navigation events and close the Accordion
  useEffect(() => {
    const handleRouteChange = () => { 
      setActiveKey('');
      setActiveKeytwo('');
      setActiveKeythree('');
    };
    
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  



  return (
    <>
    <header className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <a className="navbar-brand" href="/">
            <img src="/global/alert-byte-logo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 header-menu ${isAuthenticated && user ? ' logged-in' : ''}`}>
              <li className="nav-item"> <Link className="nav-link" aria-current="page" href="/"> Home<span></span></Link> </li>
              <BsNavDropdown />
              <li className="nav-item"> <Link className="nav-link" href="/contact-us/"> Contact Us<span></span> </Link> </li>
              <li className="nav-item"> <Link className="nav-link" href="/portfolio/"> Resources<span></span> </Link> </li>
            </ul>

            
            {isAuthenticated && user ? (
              <>
              <div className="ln-user">
                <div className="img-div "> 
                <Image src="/global/logged-in.png" width={47} height={47} alt="" /> 
                
                </div>
                <div className="profilemain">
                  <div className="usermain">
                    <div className="imgdv">
                    <Image src="/global/logged-in.png" width={47} height={47} alt="" /> 
                    </div>
                    <div className="usernamecontent">
                      <p className='user-name'>Jack</p>
                    </div>
                  </div>
                  <ul className='profile-ul'>
                    <li><Link href='/'>My Alerts</Link></li>
                    <li><Link href='/settings'>Settings</Link></li>
                    <li><Link href='/' onClick={() => handleLogout()}>Logout</Link></li>
                  </ul>
                </div>
              </div>
                
              </>
            ) :(
              <div className="header-butns">
              <Button className="btn btn-emp" onClick={handleShow}>Login <span></span></Button>
              {/* modal start */}
                <Modal show={show} onHide={handleClose} centered className="login-modal">
                  <Button className="ram-close" onClick={handleClose}> <FaTimes /> </Button>
                  <Modal.Body>
                    <div className="md-cnt">
                      <p className="intr-p">New to AlertBytes?<span> Sign Up</span></p>
                      <div className="img-div id-icon">
                        <Image src="/global/user-icn.png" width={145} height={145} alt="" />
                      </div>
                      <h2 className="mdl-title">Login</h2>
                      <p className="sub-txt">Get a magic link sent to your email that'll sign you in instantly</p>
                      <input type="email" name="login-email" value={mail} onChange={(e)=>{setmail(e.target.value)}}  id="login-email" placeholder='Enter Email' isInvalid={emailError}></input>
                      <div className="mdl-butns">
                      <Button className="btn btn-fill" onClick={emaillogin}>Send Magic Link</Button>
                        <span>OR</span>
                      <Button className="btn btn-fill" onClick={() => metamaskLogin()}>Connect Wallet</Button>
                      </div>
                      <p className="tos-txt">By continuing, you agree to AlertBytes<span>Terms of Service, Privacy Policy</span></p>
                    </div>
                  </Modal.Body>
                </Modal>
                {/* modal end */}
              <Button className="btn btn-emp" onClick={() => metamaskLogin()} >Connect Wallet</Button>
            </div>
            )}
          </div>

           {/* ==========mobile========== */}
          <div className="faq mobile-menu ">
            <div className="logo-close">
              <a className="navbar-brand" href="/"> <img src="/global/alert-byte-logo.png" alt="" /> </a>
              <div className="mobile-menu-close"> <LiaTimesSolid/></div>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item mm-link"> <Link className="nav-link" href="/" > Home </Link> </li>
                <li className="nav-item ">
                  <Accordion flush className="nav-link"  activeKey={activeKey} onSelect={(key) => setActiveKey(key)} > 
                      <Accordion.Item eventKey="1">
                      <Link className='mm-link' href="/services/"  >Services</Link>
                      <Accordion.Header><div className='acc-icn' ><FaMinus className='faq-mns'/><FaMinus /></div></Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/">Personal Monitor</Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/"> Community Monitor </Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/">Search Crypto </Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/">Wallet Check</Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/">NFT Checker</Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/">NFT Details</Link></li>
                        </ul>
                      </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/contact-us/"> Contact Us </Link> </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/contact-us/"> Resources </Link> </li>

              </ul>
              <div className="btn-div">
                <button className="btn btn-fill " type="button">Login</button>
              </div>
          </div>
      </nav>
    </header>
    </>
  )
}
export default Header;
