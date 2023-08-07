import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import * as Moralismain from "moralis";



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
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
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
  // personal monitor form value state //
  const[name, setName] = useState("");
  const[chain, setChain] = useState("");
  const[walletadress, setWalletadress] = useState("");
  const [ismailChecked, setIsmailChecked] = useState(true);
  const [isteleChecked, setIsteleChecked] = useState(true);
  
  const handleMailCheckboxChange = () => {
      setIsmailChecked(!ismailChecked);
  };
  const handleTeleCheckboxChange = () => {
      setIsteleChecked(!isteleChecked);
  };
  function chainChanged(event) {
      setChain(event);
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
              <input placeholder="Wallet Address" value={walletadress} onChange={(e)=>{setWalletadress(e.target.value)}} /> 
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
            const { fullName, threshold, note, date } = data;
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
                      <div className="date-div price-ip-div prinput-div">
                       <input className="custom-date-input" type="date" name="date" placeholder="Choose a date" value={date} onChange={(evnt) => handleChange(index, evnt)}/>
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
                  <input type="checkbox" id="switch" checked={isteleChecked} onChange={handleTeleCheckboxChange} /><label for="switch">Toggle</label>
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
          <Button className="btn btn-fill" onClick={()=>{console.log(inputFields)}}> Save Alert </Button>
          <Button className="btn btn-emp" > Cancel </Button>
        </div>
     </div>{/* monitor-form end div */}
    </>
  )
}

export default communityform
