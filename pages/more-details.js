import React, { useState } from 'react';
import Header from './components/header';
import EmailFlow from './components/more-details/email-flow';

export default function Home() {
  const [name, setName] = useState('');
  const [showtelemail, setShowtelemail] = useState(true);
  const [showEmailFlow, setShowEmailFlow] = useState(false);
  const[hidetitle ,sethidetitle] = useState(true)


  const emailFlow = () => {
    setShowEmailFlow(true);
    setShowtelemail(false);
  };

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
                    <div className="opts">
                      <span></span>Telegram
                    </div>
                    <div className="opts" onClick={emailFlow}>
                      <span></span>Email
                    </div>
                  </div>
                </div>
              </>
            )}

            {showEmailFlow && <EmailFlow onGoBack={handleGoBack} onhidetitle = {handlehidetitle}/>}
          </div>
        </div>
      </main>
    </>
  );
}
