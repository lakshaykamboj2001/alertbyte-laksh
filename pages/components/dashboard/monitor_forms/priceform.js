import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import StatusContext from "@/store/status-context";
import {FaArrowRight} from "react-icons/fa"



const priceform = () => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
    } = useMoralis();
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const { Moralis, isAuthenticated } = useMoralis();

  const [searchedvalue , setSearchedvalue] = useState("");
  const [alldataresult, setalldataresult] = useState([]);
  const [showcrptosearch, setShowcrptosearch] = useState(false);
  const [showpriceform, setShowpriceform] = useState(false);
  


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




  const fetchsearcheddata = async () =>{
    let params = {searchvalue:searchedvalue}
    await Moralis.Cloud.run("getsearchedcryptos",params)
    .then(async (data) => {
      console.log("data from user ",data)
      setalldataresult(data.data.data)
      // setloading(false)
      setShowcrptosearch(true);
      return
      
    })
    .catch((error) => {
      console.log(JSON.stringify("🚫 Error Occures 🚫"+error, 0, 2,));
      return
    });
  }

  const [cryptoslug, setcryptoslug] = useState("")
  const [currentdata, setcurrentdata] = useState(null)
  const [current_volume, setcurrent_volume] = useState(null)
  const [current_circulating_supply, setcurrent_circulating_supply] = useState(null)
  const [current_fully_diluted_market_cap, setcurrent_fully_diluted_market_cap] = useState(null)


  const handlecryptoclicked = async (data) => {

    console.log(data);
    let params = {searchvalue:data}
    await Moralis.Cloud.run("getcryptodata", params)
    .then(async (data) => {
    let res = Object.values(data.data.data)[0];
    console.log("data from user searched crypto",res)
    setcryptoslug(res.slug)
    setcurrentdata(res.quote.USD.price.toFixed(3))
    setcurrent_volume(res.quote.USD.volume_24h.toFixed(3))
    setcurrent_circulating_supply(res.circulating_supply)
    setcurrent_fully_diluted_market_cap(res.quote.USD.fully_diluted_market_cap)
  })
  .catch((error) => {
    console.log(JSON.stringify("🚫 Error Occures 🚫"+error, 0, 2,));
  });
  }
//  calling this function in  every 3 sec cause we have to update the value of searched crypto but ....
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //   console.log(paramdata)
  //   handlecryptoclicked(paramdata);
  //   }, 3000);
  
  //   return () => clearInterval(intervalId);
  // }, []);
  


  const [currentStep, setCurrentStep] = useState(1);
  const flow = () =>{
    switch (currentStep) {
      case 1:
        return (
          <>
          <div className="title-btn-div"> 
            <span className="title">Add Alert: <span>Price Alert</span></span>
          </div>
          <div className="main-searcrypto-div">
            <div className="price-crypto-search">
              <div className="cu-form search-form ">
              <input type="text" placeholder="Search Cryptocurrency" value={searchedvalue} onChange={(e)=>{setSearchedvalue(e.target.value)}} />
              </div>
              <button className='btn-fill' onClick={fetchsearcheddata}>Go</button>
            </div>
            {showcrptosearch && (
              <>
                <div className="search-result">
                  {alldataresult? alldataresult.map((d)=> <>
                  {/* handlecryptoclicked */}
                        <div className="single-result" onClick={()=>{handlecryptoclicked(d.slug) ;  setShowpriceform(true); setShowcrptosearch(false);}}>
                          <span className="crypto-name"> {d.name} </span>
                          <div className="symbol"> {d.symbol} <FaArrowRight/> </div>
                        </div>
                    </>):null}
                </div>
              </>
            )}
          </div>
      
          { showpriceform && (
            <>
             <div className="monitor-form  price-form">
                <div className="card-content-div ">
                  <div className="title">Set Alert</div>
                  <div className="main-param-div">
      
                    <div className="single-param">
                      <div className="param-name">
                        Price <span>(${currentdata})</span>
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
                        24H Volume <span>(${current_volume})</span>
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
                        Circulating Supply <span>(${current_circulating_supply})</span>
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
                        FDV <span>(${current_fully_diluted_market_cap})</span>
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
                <p className="preview-btn" onClick={()=>{      setCurrentStep(currentStep + 1);}}>Preview</p>
                <div className="mdl-butns lg-butns">
                  <Button className="btn btn-fill"> Save Alert </Button>
                  <Button className="btn btn-emp"  > Cancel </Button>
                </div>
      
             </div>{/* monitor-form end div */}
            </>
          )}
          </>
        )
     case 2:
        return (
          <>
          <div className="title-btn-div"> 
            <span className="title">Preview: <span>Price Alert</span></span>
          </div>
          <div className="main-preview-div">
            <div className="row g-5">
              <div className="col-md-4">
                <div className="card-content-div preview-card price-card ">

                  <div className="status-div">
                    <div className="status-circle"></div>
                    <span className="status-txt">Active</span>
                  </div>
                  <h3 className="wallet-name">My_Wallet</h3>
                  <div className="grey-fill-div">
                    <div className="bchain-value">
                        <div className="bchain-img">
                          <img src="/Icons/erc20.svg" alt="" />
                        </div>
                        <div className="sub-head">Ethereum</div>
                    </div>

                    <div className="main-params-value-div">
                      <div className="param">
                        <div className="param-name">Price :</div>
                        <div className="param-value">$50 </div>
                      </div>
                      <div className="param">
                        <div className="param-name">24H Volume :</div>
                        <div className="param-value">$50 </div>
                      </div>

                    </div>

                  </div>
                  <div className="alert-method">
                  <img src="/Icons/notifications.svg" alt="" />
                      <span>Telegram</span>
                  </div>

                  <div className="notification-count">3 Notification Sent</div>
                </div>{/* card-content-div end */}
                <div className="mdl-butns lg-butns">
                 <Button className="btn btn-fill" >Done</Button>
                </div>
              </div>
            </div>
          </div>

          </>
        )
      default:
      return null;
    }
  }
  return (
    <>
    {flow()}
    </>

  )
}

export default priceform
