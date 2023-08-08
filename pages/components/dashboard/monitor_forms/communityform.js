import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import * as Moralismain from "moralis";
import {BiSolidRightArrow , BiSolidLeftArrow} from 'react-icons/bi';



const communityform = () => {
  const { logout, user, setUserData, refetchUserData } = useMoralis();
  const { Moralis, isAuthenticated } = useMoralis();
  const router = useRouter();

  const mainnets = {
    chains: {
      eth: "Ethereum Mainnet",
      bsc: "BSC Mainnet",
      matic: "Polygon (Matic) Mainnet",
      avalanche: "Avalanche Mainnet",
    },
  };
  const networks = mainnets;
  
  const [inputFields, setInputFields] = useState([
    {
      fullName: "",
      threshold: 0,
      date: "",
      note: "",
    },
  ]);

  const addInputField = () => {
      setInputFields([
        ...inputFields,
        {
          fullName: "",
          threshold: 0,
          date: "",
          note: "",
        },
      ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  // const handleChange = (index, evnt) => {
  //   const { name, value } = evnt.target;
  //   const list = [...inputFields];
  //   list[index][name] = value;
  //   setInputFields(list);
  // };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  
    if (name === 'date') {
      list[index]['visualDateValue'] = value;
      setInputFields(list);
    }
  };
 
  const handleIncrement = (index) => {
    const list = [...inputFields];
    list[index].threshold += 1;
    setInputFields(list);
  };
  
  const handleDecrement = (index) => {
    const list = [...inputFields];
    if (list[index].threshold > 0) {
      list[index].threshold -= 1;
      setInputFields(list);
    }
  };

  const calculateTotalThreshold = () => {
    return inputFields.reduce((total, field) => total + field.threshold, 0);
  };








  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % inputFields.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? inputFields.length - 1 : prevIndex - 1
    );
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


  // personal monitor form value state //
  const[name, setName] = useState("");
  const[chain, setChain] = useState("");
  const [mainaccount, setmainaccount] = useState("");
  const [ismailChecked, setIsmailChecked] = useState(true);
  const [isteleChecked, setIsteleChecked] = useState(true);
  const [alertOption, setAlertOption] = useState("");

useEffect(() => {
  const assignAlertOptions = () => {
    if (ismailChecked && isteleChecked ) {
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

  
  const handleMailCheckboxChange = () => {
      setIsmailChecked(!ismailChecked);
  };
  const handleTeleCheckboxChange = () => {
      setIsteleChecked(!isteleChecked);
  };
  function chainChanged(event) {
      setChain(event);
  }


 




  const createdata = async () => {
    if (!isAuthenticated) {
      setError((prevState) => ({
        ...prevState,
        title: "Signup/Login required",
        message: "You must be signed in to add an address to your watchlist",
        showErrorBox: true,
      }));
      return;
    } else {
      // setloading(true);
      try {
        let adminaddress = mainaccount;
        // let threshold = document.getElementById("threshold").value;
        // let note = document.getElementById("note").value;
        // let name = document.getElementById("name").value;
  
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
  
        const _market = await Moralis.Cloud.run("getCommunityAddresses");
        console.log("market",_market);

        // if (_market.length > 4) {
        //   window.alert(
        //     "You've exceeded the limit on the free plan. Please upgrade to a paid plan to add more addresses."
        //   );
        //   setloading(false);
  
        //   return;
        // }
  
        // if (inputFields.length - _market.length > 4) {
        //   window.alert(
        //     "You've cannot add that many addresses on the free plan. Please upgrade to a paid plan to add more addresses."
        //   );
        //   setloading(false);
  
        //   return;
        // }
  
        {
          inputFields.map(async (data, index) => {
            setTimeout(() => {
              const params = {
                admin_address: adminaddress.toLowerCase(),
                user_address: data.fullName.toLowerCase(),
                threshold: data.threshold,
                alert_method: alertOption,
                note: data.note,
                expiredate: data.date,
                chain: chain,
              };
  
              console.log(params);
              const watch = Moralis.Cloud.run("watchcommunitypool", params);
  
              if (watch) {

                console.log("done");
              } else {
                window.alert(
                  JSON.stringify(
                    "🚫 You're already watching this address 🚫",
                    0,
                    2
                  )
                );
              }
            }, index * 100);
          });
        }
  
        setTimeout(() => {
          // setloading(false);
        }, inputFields.length * 100);
      } catch (error) {
        console.log(error);
        // setloading(false);
      }
    }
  };

 const [currentStep, setCurrentStep] = useState(1);
 const flow = ()=>{
   switch(currentStep) {
    case 1:
      return (
        <>
        <div className="title-btn-div"> 
          <span className="title">Add Alert: <span>Community Monitor</span></span>
        </div>
        <div className="monitor-form community-monitor-form">
            <div className="card-content-div ">
              <div className="first-ip-div">
                <div className="input-div">
                  <input placeholder="Name" value={name} onChange={(e) => setName( e.target.value)} /> 
                </div>

                <div className="input-div">
                  <Dropdown id="blockchain" name="blockchain" onSelect={(e) => chainChanged(e)} >
                    <Dropdown.Toggle className="select-type2">
                      {networks.chains[chain]
                        ? networks.chains[chain]
                        : "Network  "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Object.keys(networks.chains).map((chain) => (
                        <Dropdown.Item
                          eventKey={chain}
                          data-chainlookupvalue={chain}
                          key={chain}
                        >
                          {networks.chains[chain]}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                
                <div className="input-div">
                  <input placeholder="Wallet Address" value={mainaccount} onChange={(e)=>{setmainaccount(e.target.value.toLowerCase())}} /> 
                </div>
                <div className="input-div child-wallets">
                  <div className="child-wallet-cnt">
                    <img src="/Icons/community_monito_total_wallets.svg" alt="" />
                    <span>{inputFields.length}</span>
                  </div>
                  <div className="child-wallet-cnt">
                    <img src="/Icons/community_monitor_total_budget.svg" alt="" />
                    <span>${calculateTotalThreshold()}</span>
                  </div>
                </div>
              </div>

              {inputFields.map((data, index) => {
                const { fullName, threshold, note, date, visualDateValue } = data;
                return(
                  <>
                    <div className="flex-form">
                      <div className="second-ip-div">
                        <div className="input-div whitelist-adr-div">
                        <input required type="text" onChange={(evnt) => handleChange(index, evnt)} value={fullName} name="fullName"   placeholder={`Enter Whitelist Address ${index+1}`} />
                        </div>
                        <div className="head input-div">Triggers</div>

                        <div className="threshold-div">
                          <span className="head">Budget ($)</span>
                          <div className="price-ip-div input-div">
                            <div className="t-value">{inputFields[index].threshold}</div>
                            <div className="plus-btn" onClick={() => handleIncrement(index)}>+</div>
                            <div className="m-btn" onClick={() => handleDecrement(index)}>-</div>
                          </div>
                        </div>
                        <div className="threshold-div exp-date">
                          <span className="head">Expiry</span>
                          <div className="date-div price-ip-div input-div">
                          {/* <input className="visual-date" type="text" name="" id="" placeholder="Choose a date" disabled/>
                          <input className="custom-date-input" type="date" name="date" placeholder="" value={date} onChange={(evnt) => {handleChange(index, evnt); } }/> */}
                          <input className="visual-date" type="text" name="" id="" placeholder="Choose a date" value={visualDateValue || ''} disabled />
                          <input className="custom-date-input" type="date" name="date" placeholder="" value={date} onChange={(evnt) => handleChange(index, evnt)} />
                          </div>    
                        </div>
                          <textarea placeholder="Custom Note" rows={2}  onChange={(evnt) => handleChange(index, evnt)} value={note}  name="note" /> 
                      </div>

                      {index !== inputFields.length - 1 &&(
                      <>
                        <div className="add-btn" onClick={removeInputFields}>
                          <img src="/Icons/subtract.svg" alt="" />
                        </div>
                      </>
                      )}
                      {index === inputFields.length - 1  && (
                        <>
                        <div className="add-btn" onClick={addInputField}>
                          <img src="/Icons/add.svg" alt="" />
                        </div>
                        </>
                      )}
                    </div>
                  </>
                )
              })}

              <div className="second-ip-div">
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
            <p className="preview-btn" onClick={()=>{setCurrentStep(currentStep + 1);}}>Preview</p>
            <div className="mdl-butns lg-butns">
              <Button className="btn btn-fill" onClick={()=>{console.log(inputFields)}}> Save Alert </Button>
              <Button className="btn btn-emp"  onClick={()=>{console.log(alertOption)}} > Cancel </Button>
            </div>
        </div>{/* monitor-form end div */}
        </>
      )
    case 2:
      return(
        <>
          <div className="title-btn-div"> 
            <span className="title">Preview: <span>Community Monitor</span></span>
          </div>
          <div className="main-preview-div">
            <div className="row g-5">
              <div className="col-md-4">
                <div className="card-content-div preview-card community-card">

                  <div className="status-div">
                    <div className="status-circle"></div>
                    <span className="status-txt">Active</span>
                  </div>
                  <h3 className="wallet-name">{name}</h3>
                  <div className="bchain-value">
                      <div className="bchain-img">
                        <img src="/Icons/erc20.svg" alt="" />
                      </div>
                      <div className="sub-head">{chain}</div>
                  </div>
                  <span className="wallet-adress">{mainaccount.substring(0,4)+"..."+ mainaccount.substring(38,42)}</span>

                  <div className="alert-method">
                    <img src="/Icons/notifications.svg" alt="" />
                    <span>{alertOption}</span>
                  </div>

                  <div className="input-div child-wallets">
                    <div className="child-wallet-cnt">
                      <img src="/Icons/community_monito_total_wallets.svg" alt="" />
                      <span>{inputFields.length}</span>
                    </div>
                    <div className="child-wallet-cnt">
                      <img src="/Icons/community_monitor_total_budget.svg" alt="" />
                      <span>${calculateTotalThreshold()}</span>
                    </div>
                  </div>

                  <div className="main-wallet-cnt-div">
                  <div className="grey-fill-div">
                    <div className="hb-stats">
                      <div className="hbs">
                        {/* <span>0Xe9...5522</span> */}
                        <span>{inputFields[currentIndex].fullName.substring(0,4) + "..."+ inputFields[currentIndex].fullName.substring(38,42)}</span>

                      </div>
                      <div className="hbs">
                        <span>{inputFields[currentIndex].threshold}</span>
                      </div>
                      <div className="hbs">
                        <span>{inputFields[currentIndex].date}</span>
                      </div>
                    </div>
                    <div className="note-div">
                      <div className="note-first">Note:</div>
                      <div className="note-info">{inputFields[currentIndex].note} </div>
                    </div>
                  </div>
                    <div className="slide-btn-div">
                      <span className="slide-btn" onClick={handlePrevClick}> <BiSolidLeftArrow/> </span>
                      <span className="slide-btn" onClick={handleNextClick}> <BiSolidRightArrow/> </span>
                    </div>
                  </div>

                  <div className="notification-count">3 Notification Sent</div>

                </div>{/* card-content-div end */}
                <div className="mdl-butns lg-butns">
                 <Button className="btn btn-fill" onClick={createdata} >Done</Button>
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

export default communityform
