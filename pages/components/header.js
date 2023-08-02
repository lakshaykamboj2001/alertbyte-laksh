import { FaBars, FaTimes, FaMinus } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import MegaMenu from './megamenu'
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Image from 'next/image';
import Accordion from 'react-bootstrap/Accordion';



  // const MobAuditModal = () => {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  //   return (
  //     <>
  //     <div className="btn-div">
  //       <Button className="btn btn-fill btn-outline ex-port-lg" onClick={handleShow}> Request Audit </Button>
  //     </div>
  //       <Modal show={show} onHide={handleClose} centered className="req-audit-modal">
  //         <Button className="ram-close" onClick={handleClose}> <FaTimes /> </Button>
  //         <Modal.Body>
  //           <ContactForm />
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // };


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

  const router = useRouter();
  // const [show, setShow] = useState(false); 
  // const handleClose = () => {
  //   setShow(false);
  // };
  
  // const handleShow = () => setShow(true);

  // Listen for page navigation events and close the Accordion
  useEffect(() => {
    const handleRouteChange = () => { 
      setActiveKey('');
    };
    
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
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
            {(router.pathname == "/") && 
            <>
             <ul className="navbar-nav ms-auto mb-2 mb-lg-0 header-menu">
              <li className="nav-item"> <Link className="nav-link" aria-current="page" href="/"> Home<span></span></Link> </li>
              <BsNavDropdown />
              <li className="nav-item"> <Link className="nav-link" href="/contact-us/"> Contact Us<span></span> </Link> </li>
              <li className="nav-item"> <Link className="nav-link" href="/portfolio/"> Resources<span></span> </Link> </li>
             </ul>
             <div className="header-butns">
              <Link className="btn btn-emp" target="_blank"  href='/signup'>SignUp <span></span></Link>
             </div>  
            </>
            }
           


          
            {/* {isAuthenticated && user ? (
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
               <Link className="btn btn-emp" onClick={handleShow} href='/signup'>SignUp <span></span></Link>
              </div>
            )} */}


             
          </div>

         {/*============================mobile======================== */}
          <div className="faq mobile-menu ">
            <div className="logo-close">
              <a className="navbar-brand" href="/"> <img src="/global/alert-byte-logo.png" alt="" /> </a>
              <div className="mobile-menu-close" > <LiaTimesSolid/></div>
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
    </div>
      </nav>
    </>
  )
}
export default Header;
