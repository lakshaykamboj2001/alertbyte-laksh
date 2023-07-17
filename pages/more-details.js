import React, { useEffect, useState } from 'react';
import Header from './components/header';
import EmailFlow from './components/more-details/email-flow';
import TeleFlow from './components/more-details/tele-flow';
import { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');
  const [showtelemail, setShowtelemail] = useState(true);
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const [showteleFlow, setShowteleFlow] = useState(false);
  
  const[hidetitle ,sethidetitle] = useState(true)
  const router = useRouter();
  const teleFlow = () => {
    setShowteleFlow(true);
    setShowtelemail(false);
  };
  const emailFlow = () => {
    setShowEmailFlow(true);
    setShowtelemail(false);
  };


useEffect(()=>{
  // when user come from dashboard for telegram verification teleflow() will automatic execute
  if (router.query.fromDash === 'true') {
    teleFlow();
  }
  if (router.query.fromDashmail === 'true') {
    emailFlow();
  }
},[])

  const handleGoBack = () => {
    setShowEmailFlow(false);
    setShowtelemail(true);
  };

  const handlehidetitle= () =>{
    sethidetitle(false)
  }

  return (
    <>
      <main className="more-details">
        <Header />
        <div className="container">
          <div className="md-cnt t-center">
            {hidetitle && 
             <>
              <h1 className="main-title-mod">More Details</h1>
              <p className="md-sub-head">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis convallis nulla.</p>
             </>
            }
            {showtelemail && (
              <>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div className="">
                  <p className="tele-email-qusn">
                    How Can We Talk?<span>*</span>
                  </p>
                  <div className="tele-email">
                    <div className="opts" onClick={teleFlow}>
                      <span></span>Telegram
                    </div>
                    <div className="opts" onClick={emailFlow}>
                      <span> </span>Email
                    </div>
                  </div>
                </div>
              </>
            )}
            {showteleFlow && <TeleFlow />}
            {showEmailFlow && <EmailFlow onGoBack={handleGoBack} onhidetitle = {handlehidetitle}/>}
          </div>
        </div>
      </main>
    </>
  );
}
