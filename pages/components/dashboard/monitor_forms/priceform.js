import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";

const priceform = ({networks}) => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
    } = useMoralis();
  const { Moralis, isAuthenticated } = useMoralis();
  const [ispriceChecked, setIspriceChecked] = useState(false);
  const [isvolumeChecked, setIsvolumeChecked] = useState(false);
  const [issupplyChecked, setIssupplyChecked] = useState(false);
  const [isfdvChecked, setIsfdvChecked] = useState(false);

  const [ismailChecked, setIsmailChecked] = useState(true);
  const [isteleChecked, setIsteleChecked] = useState(true);
  
  const handleMailCheckboxChange = () => {
      setIsmailChecked(!ismailChecked);
  };
  const handleTeleCheckboxChange = () => {
      setIsteleChecked(!isteleChecked);
  };


  // Check user mail and telegram //
  const [mail, setMail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [mainaddresswallet, setmainaddresswallet] = useState("");
  const [watchedAddresses, setWatchedAddresses] = useState(0);

  useEffect(() => {
      if (user) {
      setMail(user.get("email"));
      setTelegram(user.get("telegram"))
      setmainaddresswallet(user.get("ethAddress"))
      }
  }, [user]);
  
  const handlemail = ()=>{
      router.push('/more-details?fromDashmail=true');
  }
  
  const handltele = ()=>{
      router.push('/more-details?fromDash=true');
  }

  return (
    <>
    <div className="title-btn-div"> 
      <span className="title">Add Alert: <span>Price Alert</span></span>
    </div>
    <div className="price-crypto-search">
      <div className="cu-form search-form ">
      <input type="text" placeholder="Select Cryptocurrency" />
      </div>
      <button className='btn-fill'>Go</button>
    </div>
    { true && (
      <>
       <div className="monitor-form  price-form">
          <div className="card-content-div ">
            <div className="title">Set Alert</div>
            <div className="main-param-div">

              <div className="single-param">
                <div className="param-name">
                  Price <span>($123)</span>
                </div>
                <div className="toggle-field ">
                  <div className="verification-status">
                  <input type="checkbox" id="Price" checked={ispriceChecked} onChange={()=>{setIspriceChecked(!ispriceChecked)}}  /><label for="Price" >Toggle</label>
                  </div>
                  {ispriceChecked && (
                      <>
                        <div className="price-ip-field">
                          <input type="text"  />
                        </div>
                      </>
                    )
                  }
                </div>
              </div>

              <div className="single-param">
                <div className="param-name">
                  24H Volume <span>($123)</span>
                </div>
                <div className="toggle-field ">
                  <div className="verification-status">
                   <input type="checkbox" id="Volume"  checked={isvolumeChecked} onChange={()=>{setIsvolumeChecked(!isvolumeChecked)}} /><label for="Volume" >Toggle</label>
                  </div>
                  {isvolumeChecked && (
                    <>
                      <div className="price-ip-field">
                        <input type="text"  />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="single-param">
                <div className="param-name">
                  Circulating Supply <span>($123)</span>
                </div>
                <div className="toggle-field ">
                  <div className="verification-status">
                  <input type="checkbox" id="Supply" checked={issupplyChecked} onChange={()=>{setIssupplyChecked(!issupplyChecked)}} /><label for="Supply" >Toggle</label>
                  </div>
                  {issupplyChecked && (
                    <>
                      <div className="price-ip-field">
                        <input type="text"  />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="single-param">
                <div className="param-name">
                  FDV <span>($123)</span>
                </div>
                <div className="toggle-field ">
                  <div className="verification-status">
                   <input type="checkbox" id="fdv" checked={isfdvChecked} onChange={()=>{setIsfdvChecked(!isfdvChecked)}} /><label for="fdv" >Toggle</label>
                  </div>
                  {isfdvChecked && (
                  <>
                    <div className="price-ip-field">
                      <input type="text"  />
                    </div>
                  </>)}
                </div>
              </div>
            </div>{/* main-param-div end */}

            <div className="price-alert-mode">
              <div className="head input-div">Alert Method</div>
                <div className="mainalert-div">
                  <div className="alrt-cnt">
                    <span className="d-block">Email</span>
                    <span className="d-block">{mail}</span>
                  </div>

                  <div className="verification-status">
                    { mail ? (
                      <>
                      <input type="checkbox" id="switch" checked={ismailChecked} onChange={handleMailCheckboxChange} /><label for="switch" >Toggle</label> </>
                      ):
                      <div className="btn btn-fill" onClick={handlemail}>
                        verify now
                      </div>
                    }
                  </div>
                </div>
                <div className="mainalert-div">
                  <div className="alrt-cnt">
                    <span className="d-block">Telegram</span>
                    <span className="d-block">{telegram}</span>
                  </div>
                  
                  <div className="verification-status">
                  { telegram ? (
                      <>
                      <input type="checkbox" id="switcht" checked={isteleChecked} onChange={handleTeleCheckboxChange} /><label for="switcht">Toggle</label>
                      </>
                      ):
                      <div className="btn btn-fill"  onClick={handltele}>
                        verify now
                      </div>
                    }
                  </div>
                </div>
            </div>
          </div>
          <p className="preview-btn">Preview</p>
          <div className="mdl-butns lg-butns">
            <Button className="btn btn-fill"> Save Alert </Button>
            <Button className="btn btn-emp"  > Cancel </Button>
          </div>

       </div>{/* monitor-form end div */}
      </>
    )}
    </>
  )
}

export default priceform
