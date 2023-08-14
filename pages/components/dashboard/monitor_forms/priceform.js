import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import StatusContext from "@/store/status-context";
import {FaArrowRight} from "react-icons/fa"



const priceform = ({paramdata, setParamdata}) => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
    } = useMoralis();
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const { Moralis, isAuthenticated } = useMoralis();
  const router = useRouter();
  const [searchedvalue , setSearchedvalue] = useState("");
  const [alldataresult, setalldataresult] = useState([]);
  const [showcrptosearch, setShowcrptosearch] = useState(false);
  const [showpriceform, setShowpriceform] = useState(false);

  // const [ispriceChecked, setIspriceChecked] = useState(true);
  // const [isvolumeChecked, setIsvolumeChecked] = useState(false);
  // const [issupplyChecked, setIssupplyChecked] = useState(false);
  // const [isfdvChecked, setIsfdvChecked] = useState(false);

  const [cryptoslug, setcryptoslug] = useState("")
  const [currentdata, setcurrentdata] = useState(null)
  const [current_volume, setcurrent_volume] = useState(null)
  const [current_circulating_supply, setcurrent_circulating_supply] = useState(null)
  const [current_fully_diluted_market_cap, setcurrent_fully_diluted_market_cap] = useState(null)

  // const [userprice, setuserprice] = useState("");
  // const [uservolume, setuservolume] = useState("");
  // const [user_circulating_supply, setuser_circulating_supply] = useState("");
  // const [user_fully_diluted_market_cap, setuser_fully_diluted_market_cap] = useState("");

  const [alertOption, setAlertOption] = useState("");


  const [ismailChecked, setIsmailChecked] = useState(true);
  const [isteleChecked, setIsteleChecked] = useState(true);
  const handleMailCheckboxChange = () => {
    if (telegram) {
        setIsmailChecked(!ismailChecked);
    } else {
        setIsmailChecked(true);
    }
  };
  
  const handleTeleCheckboxChange = () => {
    if (mail) {
        setIsteleChecked(!isteleChecked);
    } else {
        setIsteleChecked(true);
    }
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



  useEffect(() => {
    const assignAlertOptions = () => {
      if (ismailChecked && isteleChecked && mail && telegram) {
        setAlertOption('both');
      } else if (ismailChecked ) {
        setAlertOption('email');
      } else if (isteleChecked ) {
        setAlertOption('telegram');
      } else {
        setAlertOption('');
      }
    };
    assignAlertOptions();
  }, [ismailChecked, isteleChecked, mail, telegram]);

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



  const handlecryptoclicked = async (data) => {

    console.log(data);
    let params = {searchvalue:data}
    await Moralis.Cloud.run("getcryptodata", params)
    .then(async (data) => {
    let res = Object.values(data.data.data)[0];
    console.log("data from user searched crypto",res)
    setcryptoslug(res.slug)
    setcurrentdata(res.quote.USD.price.toFixed(2))
    setcurrent_volume(res.quote.USD.volume_24h.toFixed(2))
    setcurrent_circulating_supply(res.circulating_supply.toFixed(2))
    setcurrent_fully_diluted_market_cap(res.quote.USD.fully_diluted_market_cap.toFixed(2))
  })
  .catch((error) => {
    console.log(JSON.stringify("🚫 Error Occures 🚫"+error, 0, 2,));
  });
  }
//  calling this function in  every 3 sec cause we have to update the value of searched crypto but ....
useEffect(() => {
  const intervalId = setInterval(async () => {
    console.log(paramdata);

    try {
      await handlecryptoclicked(paramdata);
    } catch (error) {
      console.log("🚫 Error Occurred 🚫", error);
    }

  }, 3000);

  return () => clearInterval(intervalId);
}, [paramdata]);

  const [userInput, setUserInput] = useState([]);

  const handleChange = (fieldName, value, isChecked) => {
    if (isChecked) {
      const existingFieldIndex = userInput.findIndex(item => item.conditionField === fieldName);

      if (existingFieldIndex !== -1) {
        setUserInput(prevInput => {
          const updatedInput = [...prevInput];
          updatedInput[existingFieldIndex].conditionValue = value;
          return updatedInput;
        });
      } else {
        setUserInput(prevInput => [
          ...prevInput,
          {
            conditionField: fieldName,
            conditionValue: value
          }
        ]);
      }
    } else {
      setUserInput(prevInput => prevInput.filter(item => item.conditionField !== fieldName));
    }
  };

  const createdata = async () => {
    // if(userprice === "" && uservolume === "" && user_circulating_supply === "" && user_fully_diluted_market_cap === ""){
    //   window.alert("Please add a value for the alert !"); 
    //   return
    // } 
    if (!isAuthenticated) {
      setError((prevState) => ({
        ...prevState,
        title: "Signup/Login required",
        message: "You must be signed in to add an address to your watchlist",
        showErrorBox: true,
      }));

      return;
    }  else {
      // setloading(true);
      try {

        
        if (alertOption == "telegram" && !user.attributes.telegram) {
          setError((prevState) => ({
            ...prevState,
            title: "Telegram username not provided",
            message:
              "You must set up your Telegram username in your Profile page in order to proceed.",
            showErrorBox: true,
          }));
          // setloading(false);

          return;
        } else if (
          alertOption == "email" &&
          (!user.attributes.email || !user.attributes.emailVerified)
        ) {
          setError((prevState) => ({
            ...prevState,
            title: "Email not provided and/or verified",
            message:
              "You must set up your email in your Profile page in order to proceed.",
            showErrorBox: true,
          }));
          // setloading(false);

          return;
        } else if (
          alertOption == "both" &&
          (!user.attributes.email ||
            !user.attributes.emailVerified ||
            !user.attributes.telegram)
        ) {
          setError((prevState) => ({
            ...prevState,
            title: "Email/Telegram not set up",
            message:
              "You must set up your email/telegram in your Profile page in order to proceed.",
            showErrorBox: true,
          }));
          console.log("kngaksn");
          // setloading(false);
          
          return;
        }



        // const _market = await Moralis.Cloud.run("getMarketCapAddresses");
        // console.log(_market);

        // let userdata = conditionvalue == "price"?userprice:conditionvalue == "volume"?uservolume:conditionvalue == "circulating_supply"?user_circulating_supply:conditionvalue == "fully_diluted_market_cap"?user_fully_diluted_market_cap:undefined
        // let livedata = conditionvalue == "price"?currentdata:conditionvalue == "volume"?current_volume:conditionvalue == "circulating_supply"?current_circulating_supply:conditionvalue == "fully_diluted_market_cap"?current_fully_diluted_market_cap:undefined
        // const params = {
        //   cryptoslug:cryptoslug,
        //   condition: conditionvalue,
        //   current_value: Number(livedata),
        //   user_value:Number(userdata),
        //   alert_method: alertOption,
        // };
      
        // console.log(params)
        // const watch = await Moralis.Cloud.run("watchMarketCap", params)
        // if (watch) {
        //   // setAddressAddedModalOpen(true);
        //   // setEmail("");
        //   // setTelegram("");
        //   // setAlertOption("email");
        //   // setThreshold("");
        //   console.log("done")
        // } else {
        //   window.alert(
        //     JSON.stringify("🚫 You're already watching this address 🚫", 0, 2)
        //   );
        // }
        // setloading(false);


        await Promise.all(userInput.map(async (item) => {
          const { conditionField, conditionValue } = item;
    
          const _market = await Moralis.Cloud.run("getMarketCapAddresses");
          console.log(_market);

          let userdata = conditionField === "price" ? conditionValue : conditionField === "volume" ? conditionValue : conditionField === "circulating_supply" ? conditionValue : conditionField === "fully_diluted_market_cap" ? conditionValue : undefined;
          let livedata = conditionField === "price" ? currentdata : conditionField === "volume" ? current_volume : conditionField === "circulating_supply" ? current_circulating_supply : conditionField === "fully_diluted_market_cap" ? current_fully_diluted_market_cap : undefined;

          const params = {
            cryptoslug: cryptoslug,
            condition: conditionField,
            current_value: Number(livedata),
            user_value: Number(userdata),
            alert_method: alertOption,
          };

          console.log("params:", params);
          const watch = await Moralis.Cloud.run("watchMarketCap", params);
          if (watch) {
            console.log("done");
          } else {
            window.alert(JSON.stringify("🚫 You're already watching this address 🚫", 0, 2));
          }
        }));

      } catch (error) {
        console.log(error);
        // setloading(false);
      }
    }
  };


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
                        <div className="single-result" onClick={()=>{ setParamdata(d.slug); handlecryptoclicked(d.slug) ;  setShowpriceform(true); setShowcrptosearch(false);}}>
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
                       Price <span className="d-block">(${currentdata})</span>
                      </div>
                      <div className="toggle-field">
                      <div className="verification-status">
                        <input
                          type="checkbox"
                          id="Price"
                          checked={userInput.some(item => item.conditionField === 'price')}
                          onChange={(e) => handleChange('price', '', e.target.checked)}
                        />
                        <label htmlFor="Price">Toggle</label>

                      </div>
                        {userInput.some(item => item.conditionField === 'price') && (
                          <div className="price-ip-field">
                            <span>$</span>
                            <input
                              type="text"
                              value={userInput.find(item => item.conditionField === 'price')?.conditionValue || ''}
                              onChange={(e) => handleChange('price', e.target.value, true)}
                              name="price"
                            />
                          </div>
                        )}
                      </div>
                    </div>
      
                    {/* <div className="single-param">
                      <div className="param-name">
                        24H Volume <span className="d-block">(${current_volume})</span>
                      </div>
                      <div className="toggle-field ">
                        <div className="verification-status">
                         <input type="checkbox" id="Volume"  checked={isvolumeChecked} onChange={()=>{setIsvolumeChecked(!isvolumeChecked)}} /><label for="Volume" >Toggle</label>
                        </div>
                        {isvolumeChecked && (
                          <>
                           <div className="price-ip-field">
                              <span>$</span>
                              <input
                                type="text"
                                value={userInput.find(item => item.conditionField === 'volume')?.conditionValue || ''}
                                onChange={(e) => handleChange('volume', e.target.value)}
                                name="volume"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div> */}

                    <div className="single-param">
                      <div className="param-name">
                        24H Volume <span className="d-block">(${current_volume})</span>
                      </div>
                      <div className="toggle-field">
                      <div className="verification-status">
                        <input
                          type="checkbox"
                          id="volume"
                          checked={userInput.some(item => item.conditionField === 'volume')}
                          onChange={(e) => handleChange('volume', '', e.target.checked)}
                        />
                        <label htmlFor="volume">Toggle</label>

                      </div>
                        {userInput.some(item => item.conditionField === 'volume') && (
                          <div className="price-ip-field">
                            <span>$</span>
                            <input
                              type="text"
                              value={userInput.find(item => item.conditionField === 'volume')?.conditionValue || ''}
                              onChange={(e) => handleChange('volume', e.target.value, true)}
                              name="volume"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                   <div className="single-param">
                      <div className="param-name">
                       Circulating Supply <span className="d-block">(${current_circulating_supply})</span>
                      </div>
                      <div className="toggle-field">
                      <div className="verification-status">
                        <input
                          type="checkbox"
                          id="circulating_supply"
                          checked={userInput.some(item => item.conditionField === 'circulating_supply')}
                          onChange={(e) => handleChange('circulating_supply', '', e.target.checked)}
                        />
                        <label htmlFor="circulating_supply">Toggle</label>

                      </div>
                        {userInput.some(item => item.conditionField === 'circulating_supply') && (
                          <div className="price-ip-field">
                            <span>$</span>
                            <input
                              type="text"
                              value={userInput.find(item => item.conditionField === 'circulating_supply')?.conditionValue || ''}
                              onChange={(e) => handleChange('circulating_supply', e.target.value, true)}
                              name="circulating_supply"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="single-param">
                      <div className="param-name">
                       FDV <span className="d-block">(${current_fully_diluted_market_cap})</span>
                      </div>
                      <div className="toggle-field">
                      <div className="verification-status">
                        <input
                          type="checkbox"
                          id="fully_diluted_market_cap"
                          checked={userInput.some(item => item.conditionField === 'fully_diluted_market_cap')}
                          onChange={(e) => handleChange('fully_diluted_market_cap', '', e.target.checked)}
                        />
                        <label htmlFor="fully_diluted_market_cap">Toggle</label>

                      </div>
                        {userInput.some(item => item.conditionField === 'fully_diluted_market_cap') && (
                          <div className="price-ip-field">
                            <span>$</span>
                            <input
                              type="text"
                              value={userInput.find(item => item.conditionField === 'fully_diluted_market_cap')?.conditionValue || ''}
                              onChange={(e) => handleChange('fully_diluted_market_cap', e.target.value, true)}
                              name="fully_diluted_market_cap"
                            />
                          </div>
                        )}
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
                <p className="preview-btn" onClick={()=>{ setCurrentStep(currentStep + 1);}}>Preview</p>
                <div className="mdl-butns lg-butns">
                  <Button className="btn btn-fill" onClick={createdata}> Save Alert </Button>
                  <Button className="btn btn-emp" onClick={()=>{console.log(userInput)}} > Cancel </Button>
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
                 <Button className="btn btn-fill"onClick={()=>{ setCurrentStep(currentStep - 1)}} >Done</Button>
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
