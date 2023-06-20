import { FaBars, FaTimes, FaMinus } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ContactForm from './contact-form';
// import MegaMenu from './megamenu'
import Accordion from 'react-bootstrap/Accordion';
import { useRouter } from 'next/router';
import Head from "next/head";
// import GoogleTagManager from './Layout';
import JSXSchema from "jsx-schema";
import LoginForm from './loginForm';

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="btn btn-fill" onClick={handleShow}>Login</Button>
      <Modal show={show} onHide={handleClose} centered className="req-audit-modal">
        <Button className="ram-close" onClick={handleClose}> <FaTimes /> </Button>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

const ConnectWallet = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="btn btn-fill" onClick={handleShow}>Connect Wallet</Button>
      <Modal show={show} onHide={handleClose} centered className="req-audit-modal">
        <Button className="ram-close" onClick={handleClose}> <FaTimes /> </Button>
        <Modal.Body>
          <ContactForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

const MobLoginModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="btn-div">
      <Button className="btn btn-fill btn-outline ex-port-lg" onClick={handleShow}>Login</Button>
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
      <a className="nav-link dropdown-toggle" href="/services/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" > Services </a>
      <div className="dropdown-menu mega-dropdown" aria-labelledby="navbarDropdown">
        {/* <MegaMenu /> */}
      </div>
    </li>
  );
}

 function Header({mdata}) {
  
  const { mval_one, mval_two,mval_three,mval_four,mval_five,mval_six,image_link } = mdata || {};
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('');
  const [activeKeytwo, setActiveKeytwo] = useState('');
  const [activeKeythree, setActiveKeythree] = useState('');

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
    <Head>
    {/*  */}
    
    <title>{mval_one}</title>
    <meta name="description" content={mval_two}/>
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content={mval_three}/>
    <meta property="og:description" content={mval_four}/>
    <meta property="og:image" content={image_link}/>
    <meta property="og:image:alt" content={mval_five}/>
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="912"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta property="og:url" content={mval_six}/>
    <meta property="og:site_name" content="alertbytes" />
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@alertbytes"/>
    <meta name="twitter:creator" content="@alertbytes"></meta>
    <JSXSchema
        type= "ProfessionalService"
        name="alertbytes"
          image= "https://alertbytes.com/blog/wp-content/uploads/2022/07/logo.png"
          url= "https://www.alertbytes.com/"
          telephone= "91 7303699708"
          address={{
            type: "PostalAddress",
            streetAddress: "B1/639 A, Janakpuri, West Delhi, Delhi 110058, India",
            addressLocality: "Delhi",
            postalCode: "110059",
            addressCountry: "IN"
          }}
          geo = {{
            type: "GeoCoordinates",
            latitude: 28.6173865,
            longitude: 77.0644884
          }}
          openingHoursSpecification={{
            type: "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            opens: "10:00",
            closes: "18:30"
          }}
          sameAs = {[
            "https://www.facebook.com/alertbytes",
            "https://twitter.com/alertbytes",
            "https://www.instagram.com/alertbytes/",
            "https://medium.com/@alertbytes",
            "https://www.linkedin.com/company/68154226/admin/",
            "https://github.com/alertbytes",
            "https://www.alertbytes.com/"
          ]}
          department= {{
            type: "LocalBusiness",
            name: "alertbytes",
            image: "https://alertbytes.com/blog/wp-content/uploads/2022/07/logo.png",
            telephone: "+91 73036 99708" 
          }}
      />
      <JSXSchema
        type= "Organization"
        url= "https://www.alertbytes.com/"
        logo= "https://www.alertbytes.com/blog/wp-content/uploads/2022/09/ib-logo-green.png"
        image= "https://alertbytes.com/blog/wp-content/uploads/2022/07/logo.png"
        name="alertbytes"
        telephone= "91 7303699708"
        address={{
            type: "PostalAddress",
            streetAddress: "B1/639 A, Janakpuri, West Delhi, Delhi 110058, India",
            addressLocality: "Delhi",
            postalCode: "110059",
            addressCountry: "IN"
          }}
          sameAs = {[
            "https://www.facebook.com/alertbytes",
            "https://twitter.com/alertbytes",
            "https://www.instagram.com/alertbytes/",
            "https://medium.com/@alertbytes",
            "https://www.linkedin.com/company/68154226/admin/",
            "https://github.com/alertbytes",
            "https://www.alertbytes.com/"
          ]}
      />
   <JSXSchema
      type= "FAQPage"
      mainEntity={[
        {
          "type": "Question",
          "name": "How long does it take to audit a smart contract?  ",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "The time taken to complete an audit usually takes 5-7 days to process the initial audit report, depending upon the nature of the project, the technology stack used, the size of your codebase, the complexity of the code, how tightly the code is integrated, the availability of auditors, etc. However, despite these factors, we take pride in meeting deadlines given by our clients and delivering satisfactory results."
          }
        },
        {
          "type": "Question",
          "name": "How much does an audit cost?",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "The cost of an audit is variable depending on the complexity of the code, the programming language in which the smart contract is written and the lines of code. Once you fill out the form above, a member of our sales team will reach out to you with a quote, and we can take the discussion forward from there onwards."
          }
        },
        {
          "type": "Question",
          "name": "Why is it important to get a smart contract audited?",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "Web3 is a fast-paced industry that involves the movement of digital assets. Malicious entities in the space will always watch out for weaknesses in your application. Audits are one way to ensure the development of a system is secure and robust so that it can’t be exploited."
          }
        },
        {
          "type": "Question",
          "name": "Do you use automated analysis tools for an audit?  ",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "Our auditors do leverage the tools present in the market for automated analysis. Tools such as Slither, Mythril and Echidna are used to chalk out the vulnerabilities present on the surface. However, we also make it a point to assess each finding manually to ensure there is no occurrence of false positives or false negatives."
          }
        },
        {
          "type": "Question",
          "name": "Will I get recommendations on how to fix the detected vulnerabilities?",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "Yes. Our auditors document the issues found along with their remediations in the audit report. We also provide optimisations in terms of gas fees and code complexity."
          }
        },
        {
          "type": "Question",
          "name": "What are the vulnerabilities found in smart contracts?",
          "acceptedAnswer": {
          "type": "Answer",
            "text": "The most common type of vulnerabilities found in smart contracts include:\nRe-entrancy attacks\nFront-running\nInteger Overflow/Underflow\nTimestamp dependence\nDoS attacks\nPrice Oracle Manipulation"
          }
        },
        {
          "type": "Question",
          "name": "Do I need a smart contract audit?",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "Any enterprise or startup involved in blockchain development or Web3 services should have their code audited. This is an industry standard and helps you build a stronger market value. While blockchain is secure, its applications are always prone to hacks."
          }
        },
        {
          "type": "Question",
          "name": "Why is it important to optimize gas in smart contracts?",
          "acceptedAnswer": {
            "type": "Answer",
            "text": "Gas optimization is the process of making smart contract code less expensive to execute, which becomes increasingly important as projects scale. Techniques for gas optimization include:\nEnabling language compiler optimizer, which helps in minimizing the code.\nMinimizing the amount of on-chain data required.\nFreeing up unused storage space."
          }
        }
      ]}
/>
    </Head>
    <header className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/alertbytes-icon.svg" alt="" />
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
            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
              <li className="nav-item"> <Link className="nav-link" aria-current="page" href="/"> Home </Link> </li>
              <li className="nav-item"> <Link className="nav-link" href="/blockchain-tools/"> Services </Link> </li>
              <li className="nav-item"> <Link className="nav-link" href="/contact-us/"> Contact Us </Link> </li>
              <li className="nav-item"> <Link className="nav-link" href="/portfolio/"> Resources </Link> </li>
            </ul>
            <LoginModal />
            <ConnectWallet />
          </div>

          {/* mobile menu */}
          <div className="faq mobile-menu ">
            <div className="logo-close">
              <a className="navbar-brand" href="/"> <img src="/images/alertbytes-icon-white.svg" alt="" /> </a>
              <div className="mobile-menu-close"> <FaTimes /> </div>
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
                          <li className="nav-item">
                            <Accordion flush className="nav-link" activeKey={activeKeytwo} onSelect={(key) => setActiveKeytwo(key)}>
                              <Accordion.Item eventKey="2">
                              <Link className='mm-link' href="/smart-contract-audit/">Smart Contract Audit</Link>
                                <Accordion.Header><div className='acc-icn'><FaMinus className='faq-mns'/><FaMinus /></div></Accordion.Header>
                                <Accordion.Body>
                                   <div className="mob-hv-tab-cont">
                                     <p className='nav-link'>By Type:</p>
                                      <ul>
                                        <li><Link className="mm-link nav-link" href="/defi-smart-contract-audit/"> Defi </Link></li>
                                        <li><Link className="mm-link nav-link" href="/nft-smart-contract-audit/"> NFT </Link></li>
                                        <li><Link className="mm-link nav-link" href="/token-smart-contract-audit/"> Token </Link></li>
                                        <li><Link className="mm-link nav-link" href="/dapp-smart-contract-audit/"> dApp</Link></li>
                                      </ul>
                                   </div>
                                   <div className="mob-hv-tab-cont">
                                     <p className='nav-link'>By Ecosystem:</p>
                                      <ul>
                                      
                                        <li><Link className="mm-link nav-link" href="/ethereum-smart-contract-audit/"> Ethereum </Link></li>
                                        <li><Link className="mm-link nav-link" href="/bsc-smart-contract-audit/"> BSC </Link></li>
                                        <li><Link className="mm-link nav-link" href="/polygon-smart-contract-audit/"> Polygon </Link></li>
                                        <li><Link className="mm-link nav-link" href="/avalanche-smart-contract-audit/"> Avalache </Link></li>
                                        <li><Link className="mm-link nav-link" href="/near-smart-contract-audit/"> Near </Link></li>
                                        <li><Link className="mm-link nav-link" href="/solana-smart-contract-audit/"> Solana </Link></li>
                                        <li><Link className="mm-link nav-link" href="/aurora-smart-contract-audit/"> Aurora </Link></li>
                                        <li><Link className="mm-link nav-link" href="/arbitrum-smart-contract-audit/"> Arbitrum </Link></li>
                                        <li><Link className="mm-link nav-link" href="/optimism-smart-contract-audit/"> Optimism </Link></li>
                                        <li><Link className="mm-link nav-link" href="/fantom-smart-contract-audit/"> Fantom </Link></li>
                                        <li><Link className="mm-link nav-link" href="/algorand-smart-contract-audit/"> Algorand </Link></li>
                                        <li><Link className="mm-link nav-link" href="/celo-smart-contract-audit/"> Celo </Link></li>
                                        <li><Link className="mm-link nav-link" href="/zksync-era-smart-contract-audit/"> zkSync Era </Link></li>
                                        <li><Link className="mm-link nav-link" href="/cardano-smart-contract-audit/"> Cardano </Link></li>
                                        <li><Link className="mm-link nav-link" href="/polkadot-smart-contract-audit/"> PolkaDOT </Link></li>
                                      </ul>
                                   </div>
                                   <div className="mob-hv-tab-cont">
                                     <p className='nav-link'>By Language:</p>
                                      <ul>
                                        <li><Link className="mm-link nav-link" href="/solidity-smart-contract-audit/"> Solidity </Link></li>
                                        <li><Link className="mm-link nav-link" href="/rust-smart-contract-audit/"> Rust </Link></li>
                                        <li><Link className="mm-link nav-link" href="/teal-smart-contract-audit/"> Teal </Link></li>
                                        <li><Link className="mm-link nav-link" href="/haskell-smart-contract-audit/"> Haskell </Link></li>
                                      </ul>
                                   </div>
                                   
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/blockchain-security-audit-services/"> Blockchain Security Services </Link></li>
                          <li className="nav-item">
                           <Accordion flush className="nav-link" activeKey={activeKeythree} onSelect={(key) => setActiveKeythree(key)}>
                                <Accordion.Item eventKey="3">
                                <Link className='mm-link' href="/penetration-testing-services/" >Penetration Testing</Link>
                                  <Accordion.Header><div className='acc-icn' ><FaMinus className='faq-mns'/><FaMinus /></div></Accordion.Header>
                                
                                  <Accordion.Body>
                                  <div className="mob-hv-tab-cont">
                                        <ul>
                                          <li><Link className="mm-link nav-link" href="/mobile-app-penetration-testing-services/" > Mobile App </Link></li>
                                          <li><Link className="mm-link nav-link" href="/web-app-penetration-testing-services/"> Web App </Link></li>
                                        </ul>
                                    </div>
                                  </Accordion.Body>
                              
                                </Accordion.Item>
                              </Accordion>
                            
                          </li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/web3-security-consulting-services/"> Web 3 Security Consulting </Link></li>
                          <li className="nav-item mm-link"><Link className="nav-link" href="/digital-assets-security-services/"> Digital Asset Security </Link></li>
                        </ul>
                      </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/blockchain-tools/"> Tools </Link> </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/portfolio/"> Portfolio </Link> </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/about-us/"> About Us </Link> </li>
                <li className="nav-item mm-link"> <Link className="nav-link" href="/contact-us/"> Contact Us </Link> </li>
              </ul>
              {/* <div className="btn-div">
                <button className="btn btn-fill btn-outline ex-port-lg" type="button">Request Audit</button>
              </div> */}
              <MobLoginModal/>
          </div>
        </div>
      </nav>
    </header>
    </>
  )
}
export default Header;