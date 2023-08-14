import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import * as Moralismain from "moralis";
import StatusContext from "@/store/status-context";

const personalform = ({networks}) => {
    
    const {
    logout,
    user,
    setUserData,
    refetchUserData,
    } = useMoralis();
    const { Moralis, isAuthenticated } = useMoralis();
    const [error, success, setSuccess, setError] = useContext(StatusContext);

    // const [personalformData, setPersonalformData] = useState({
    // name: "",
    // chain: "",
    // walletadress: "",
    // count: 0,
    // direction: "",
    // note: "",
    // ismailchecked: true,
    // istelechecked: true,
    // });
    const router = useRouter();
    
    const [currentStep, setCurrentStep] = useState(1);
    
  
    // personal monitor form value state //
    const[name, setName] = useState("");
    const[chain, setChain] = useState("");
    const[walletadress, setWalletadress] = useState("");
    const [count, setCount] = useState(0);
    const[direction, setDirection] = useState("");
    const[note, setNote] = useState("");
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

    function chainChanged(event) {
        setChain(event);
    }
    
    const handlecountChange = (event) => {
      const newValue = event.target.value;
      if (newValue === '' || /^[0-9]+$/.test(newValue)) {
        setCount(newValue === '' ? 0 : parseInt(newValue));
      }
    };
    const handlePersonalSave = () =>{
      // setPersonalformData({
      // name: name,
      // chain: chain,
      // walletadress: walletadress,
      // count: count,
      // direction: direction,
      // note: note,
      // ismailchecked: ismailChecked,
      // istelechecked: isteleChecked
      // });
      setCurrentStep(currentStep + 1);
    }
    
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

    //~~~~~~~~API WORK~~~~~~~~//
    useEffect(() => {
      if (user) getWatchedAddresses();
    }, [user]);
  
    const getWatchedAddresses = async () => {
      console.log(user.attributes.ethAddress);
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        body: JSON.stringify({ main_wallet: user.attributes.ethAddress }),
      };
      fetch("https://alertbytes.com/getmw", requestOptions)
        .then((response) => response.json())
  
        .then(async (data) => {
          console.log("data from user ");
          setWatchedAddresses(data.msg.length);
  
          console.log(data);
        })
        .catch((error) => {
          window.alert(JSON.stringify("🚫 Error Occures 🚫", 0, 2));
          // setloading(false);
        });
    };

    
    const createMoralisStream = async (walletaddress) => {
      const chainforsend =
        chain == "eth_token"
          ? EvmChain.ETHEREUM
          : chain == "btc_token"
          ? EvmChain.BSC
          : chain == "matic_token"
          ? EvmChain.POLYGON
          : chain == "ava_token"
          ? EvmChain.AVALANCHE
          : EvmChain.ETHEREUM;
  
      const stream = {
        chains: [chainforsend], 
        description: "monitor Bobs wallet", 
        tag: "bob",
        webhookUrl: "https://tokenalerts-ocwyn5798-tusharib.vercel.app/webhook",
        includeNativeTxs: true,
        includeContractLogs: true,
      };
  
      const newStream = await Moralismain.default.Streams.add(stream);
  
      const { id } = newStream.toJSON(); 
      console.log(id);
      const address = walletaddress;
  
      await Moralismain.default.Streams.addAddress({ address, id });
    };


    const onSave = async () => {
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

          let selected_alert_method;
          if (ismailChecked) {
            selected_alert_method = 'email';
          }else if (isteleChecked) {
            selected_alert_method = 'telegram';
          }else if (isteleChecked && ismailChecked){
            selected_alert_method = 'both';
          }else{
            selected_alert_method = 'email';
          }

        
          if (selected_alert_method == "telegram" && !user.attributes.telegram) {
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
            selected_alert_method == "email" &&
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
            selected_alert_method == "both" &&
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
  
          if (
            chain === "eth" ||
            chain == "bsc" ||
            chain == "matic" ||
            chain == "avalanche"
          ) {
            //   let condition = personalformData.direction;
          // let threshold = personalformData.count;
          // let note = personalformData.note;
          // let name = personalformData.name;
          // let walletaddress = personalformData.walletadress.toLowerCase();
  
            // capture address
            const params = {
              name:name,
              address: walletadress.toLowerCase(),
              alert_method: selected_alert_method,
              conditions:direction,
              threshold: count.toString(),
              notes:note,
              chain: chain,
            };
            console.log("params:",params)
  
            const _watched = await Moralis.Cloud.run("getWatchedAddresses");
            console.log(_watched);
            // if (_watched.length > 4) {
            //   window.alert(
            //     "You've exceeded the limit on the free plan. Please upgrade to a paid plan to add more addresses."
            //   );
            //   // setloading(false);
  
            //   return;
            // }
  
            const watch = await Moralis.Cloud.run("watchAddress", params);
            // user feedback
            if (watch) {
              // setPersonalformData({
              //   name: "",
              //   chain: "",
              //   walletadress: "",
              //   count: 0,
              //   direction: "",
              //   note: "",
              //   ismailchecked: true,
              //   istelechecked: false
              //   });
              console.log("hoye gache bhai")
            } else {
              window.alert(
                JSON.stringify("🚫 You're already watching this address 🚫", 0, 2)
              );
            }
            // setloading(false);
          } else if (
            chain == "eth_token" ||
            chain == "btc_token" ||
            chain == "matic_token" ||
            chain == "ava_token"
          ) {
            if (watchedAddresses > 4) {
              window.alert(
                "You've exceeded the limit on the free plan. Please upgrade to a paid plan to add more addresses."
              );
              // setloading(false);
            } else {
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "cache-control": "no-cache",
                },
                body: JSON.stringify({
                  alert_method: selected_alert_method, //korte hobe
                  chain: chain,
                  condition: condition,
                  email_id: mail ? mail : "",
                  main_wallet: mainaddresswallet,
                  name: name,
                  note: note,
                  telegram_id: telegram,
                  threshold: threshold,
                  wallet_address: walletadress.toLowerCase() ,
                }),
              };
              fetch("https://alertbytes.com/put_alert", requestOptions)
                .then((response) => response.json())
                .then(async (data) => {
                  console.log("api hit");
                  await createMoralisStream(walletaddress);
                  console.log(data);
                  // setAddressAddedModalOpen(true);
                  // setPersonalformData({
                  //   name: "",
                  //   chain: "",
                  //   walletadress: "",
                  //   count: 0,
                  //   direction: "",
                  //   note: "",
                  //   ismailchecked: true,
                  //   istelechecked: false
                  //   });
                  console.log("hoye gache bhai dui")
                  // setloading(false);
                })
                .catch((error) => {
                  window.alert(
                    JSON.stringify(`🚫 Error Occures 🚫 + ${error}`, 0, 2)
                  );
                  // setloading(false);
                });
            }
          }
        } catch (error) {
          console.log(error);
          // setloading(false);
        }
      }
    };
  
    const flow = () =>{
      switch (currentStep) {
        case 1:
          return (
            <>
             <div className="title-btn-div"> 
              <span className="title">Add Alert: <span>Personal Monitor</span></span>
              </div>
                
              <div className="monitor-form">
                  <div className="card-content-div ">
                    <div className="first-ip-div">
                      <div className="input-div">
                        <input placeholder="Name" value={name} onChange={(e) => setName( e.target.value)} /> 
                      </div>

                      <div className="input-div">
                          <Dropdown
                            id="blockchain"
                            name="blockchain"
                            onSelect={(e) => chainChanged(e)}
                          >
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
                        <input placeholder="Wallet Address" value={walletadress} onChange={(e)=>{setWalletadress(e.target.value)}} /> 
                      </div>
                    </div>

                    <div className="second-ip-div">
                      <div className="head input-div">Triggers</div>
                      <div className="threshold-div input-div">
                        <span className="head">Threshold Price ($)</span>
                        <div className="price-ip-div">
                          <div className="t-value">
                            <input
                              type="text"
                              value={count}
                              onChange={handlecountChange}
                            />
                          </div>
                          <div className="plus-btn" onClick={() => setCount(count + 1)}>+</div>
                          <div className="m-btn" onClick={() => { if (count > 0) setCount(count - 1); }}>-</div>
                        </div>
                      </div>
                      <div className="direction-div input-div">
                        <select value={direction} onChange={(e)=>{setDirection(e.target.value)}}>
                          <option value="">Direction</option>
                          <option value="send">Send</option>
                          <option value="receive">Receive</option>
                          <option value="both">Both</option>
                        </select> 
                      </div>
                      </div>

                    <div className="third-ip-div">
                    <textarea placeholder="Custom Note" rows={2} value={note} onChange={(e)=>{setNote(e.target.value)}}/> 
                    </div>
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
                  <p className="preview-btn" onClick={handlePersonalSave}>Preview</p>
                  <div className="mdl-butns lg-butns">
                    <Button className="btn btn-fill" onClick={onSave}> Save Alert </Button>
                    <Button className="btn btn-emp" onClick={()=>{console.log(direction)}} > Cancel </Button>
                  </div>
              </div>{/* monitor-form end div */}
            </>
          )
        case 2:
          return (
            <>
             <div className="title-btn-div"> 
             <span className="title">Preview: <span>Personal Monitor</span></span>
            </div>
            <div className="main-preview-div">
                <div className="row g-5">
                    <div className="col-md-4">
                        <div className="card-content-div preview-card ">
                            <div className="status-div">
                            <div className="status-circle"></div>
                            <span className="status-txt">Active</span>
                            </div>
                            <h3 className="wallet-name">{name}</h3>
                            <span className="wallet-adress">{walletadress.substring(0,4)+"..."+walletadress.substring(38,42)}</span>
                            <div className="bchain-value-div">
                            <div className="bchain-value">
                            { 
                              networks.chains[chain] === "Ethereum Mainnet" || 
                              networks.chains[chain] === "Ethereum Token" 
                              ? (
                                <div className="bchain-img">
                                   <img src="/Icons/erc20.svg" alt="" />
                                </div>
                              ) 
                              : null 
                            }
                            { 
                              networks.chains[chain] === "BSC Mainnet" || 
                              networks.chains[chain] === "BSC Token" 
                              ? (
                                <div className="bchain-img">
                                  <img src="/Icons/binance.svg" alt="" />
                                </div>
                              ) 
                              : null 
                            }
                            { 
                              networks.chains[chain] === "Polygon (Matic) Mainnet" || 
                              networks.chains[chain] === "Polygon (Matic) Token" 
                              ? (
                                <div className="bchain-img">
                                  <img src="/Icons/polygon.svg" alt="" />
                                </div>
                              ) 
                              : null 
                            }
                            { 
                              networks.chains[chain] === "Avalanche Mainnet" || 
                              networks.chains[chain] === "Avalanche Token" 
                              ? (
                                <div className="bchain-img">
                                   <img src="/Icons/avalanche.svg" alt="" />
                                </div>
                              ) 
                              : null 
                            }

                              <div className="sub-head">
                                {networks.chains[chain]}
                              </div>
                            </div>
                            </div>

                            <div className="main-value-direction-div">
                            <div className="sub-head">Personal Monitor for</div>
                            <div className="value-dir">
                            <div className="value">&lt;${count}</div>
                              <div className="value">{direction}</div>
                            </div>
                            </div>
                            <div className="notification-count">3 Notification Sent</div>
                        </div>{/* card-content-div end */}
                        <div className="mdl-butns lg-butns">
                        <Button className="btn btn-fill" onClick={()=>{setCurrentStep(currentStep - 1);}} >Done</Button>
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

export default personalform;
