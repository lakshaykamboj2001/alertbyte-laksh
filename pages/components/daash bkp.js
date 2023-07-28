import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Moralis from "moralis-v1";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Link from 'next/link';
import { IoMdArrowRoundUp} from 'react-icons/io';
import {BsFillTriangleFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';
import {FaChevronDown} from 'react-icons/fa';
import StatusContext from '@/store/status-context';


const MainMoralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const VerticalTabs =() => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();
  const [activeTab, setActiveTab] = useState(3); 
  const router = useRouter();
  const [error, success, setSuccess, setError] = useContext(StatusContext);


  const handleLogout = async () => {
    await logout();
    if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
  };
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // =====================DASHBOARD================== //
  const Tab1 = () => {
  const [showContent, setShowContent] = useState(false);
  const [showFilterExpand, setShowFilterExpand] = useState(false);
  const filterRef = useRef(null);

  const handleFilterButtonClick = () => {
    setShowFilterExpand(!showFilterExpand);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilterExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
    
    return (
    <>
     <div className="main-dash-tab">
        <div className="title-btn-div"> 
          <span className="title">All Alerts</span>
          <div className="">
            <button className="btn-fill">+ Add Alert</button>
          </div>
        </div>
        <div className="filter-main-div">
          <div className="filter-sub-div inout-sec" ref={filterRef}>
            <span className="head dropdowntoggle" onClick={handleFilterButtonClick}>Filter {!showFilterExpand && <FaChevronDown/>}</span>
            {showFilterExpand && (
              <div className="filter-expand">
                <p className="clr-all">
                  <span>Filter</span>
                  <span>Clear All</span>
                </p>
                <div className="radios">
                  <span>Direction</span>
                  <div>
                    <input
                      type="radio"
                      id="in"
                      name="in-out"
                      value="in"
                      
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="in">IN</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="out"
                      name="in-out"
                      value="out"
                    
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="out">OUT</label>
                  </div>
                </div>
                <div className="">
                  <span >Blockchain</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* filter-main-div end */}
        <div className="main-cards-div">
          <div className="row">
            <div className="col-md-4">
              <div className="card-content-div">

              </div>
            </div>
          </div>
        </div>
     </div>
    </>
    );
  };
  

 // ===================NOTIFICATIONS============== //
  const Tab2 = () => {
  const [radioValue, setRadioValue] = useState(''); 
  const [showContent, setShowContent] = useState(false);
  const [showFilterExpand, setShowFilterExpand] = useState(false);
  const filterRef = useRef(null);

  const handleFilterButtonClick = () => {
    setShowFilterExpand(!showFilterExpand);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilterExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
    return (
      <>
      <div className="filter-main-div">
        <div className="filter-sub-div inout-sec" ref={filterRef}>
          <span className="head dropdowntoggle" onClick={handleFilterButtonClick}>Filter {!showFilterExpand && <FaChevronDown/>}</span>
          {showFilterExpand && (
        <div className="filter-expand">
          <p className="clr-all">
            <span>Filter</span>
            <span>Clear All</span>
          </p>
          <div className="radios">
            <span>Direction</span>
            <div>
              <input
                type="radio"
                
                name="in-out"
                value="in"
                checked={radioValue === 'in'}
                onChange={handleRadioChange}
              />
              <label htmlFor="in">IN</label>
            </div>
            <div>
              <input
                type="radio"
                
                name="in-out"
                value="out"
                checked={radioValue === 'out'}
                onChange={handleRadioChange}
              />
              <label htmlFor="out">OUT</label>
            </div>
          </div>
          <div className="">
            <span >Blockchain</span>
          </div>
        </div>
        )}
        </div>

        <div className="filter-sub-div sort-sec">
         <span className="head">Sort By:</span>
        </div>
      </div>
      <Tabs defaultActiveKey="first" className="monitor-btn">
        <Tab eventKey="first" title="Personal Monitor">
          <div className="notification-tbl">
          <div class="tbl">
            <div class="tbl-row tb-head">
              <div class="tbl-cell">Date</div>
              <div class="tbl-cell">Amount</div>
              <div class="tbl-cell">From</div>
              <div class="tbl-cell blank"></div> 
              <div class="tbl-cell">To</div>
              <div class="tbl-cell">Alert</div>
              <div class="tbl-cell">Trx. Hash</div>
              <div class="tbl-cell blank"></div>
            </div>

            <div className="tmain-body">

            <div class="tbl-row row-cnt" onClick={() => setShowContent(!showContent)}>
              <div className="tb-body-r" >
                <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                <div className="tbl-cell blank mod-bk">In</div>
                <div className="tbl-cell">0Xe9...</div>
                <div className="tbl-cell">My Alert</div>
                <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                <div className="tbl-cell blank notice-arrow"><BsFillTriangleFill/></div>
              </div>
              <div className={`note-div ${showContent ? '' : 'd-none'}`}>
                <p>Note:</p>
                <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam Ipsum Eros, Mattis A Dui
                Orem Viverra, At Commodo Lorem Porttitor.</p>
              </div>
            </div>
             <div class="tbl-row row-cnt" onClick={() => setShowContent(!showContent)}>
              <div className="tb-body-r" >
                <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                <div className="tbl-cell blank mod-bk">In</div>
                <div className="tbl-cell">0Xe9...</div>
                <div className="tbl-cell">My Alert</div>
                <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                <div className="tbl-cell blank notice-arrow"><BsFillTriangleFill/></div>
              </div>
              <div className={`note-div ${showContent ? '' : 'd-none'}`}>
                <p>Note:</p>
                <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam Ipsum Eros, Mattis A Dui
                Orem Viverra, At Commodo Lorem Porttitor.</p>
              </div>
            </div>

            <div class="tbl-row row-cnt" onClick={() => setShowContent(!showContent)}>
              <div className="tb-body-r" >
                <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                <div className="tbl-cell blank mod-bk">In</div>
                <div className="tbl-cell">0Xe9...</div>
                <div className="tbl-cell">My Alert</div>
                <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                <div className="tbl-cell blank notice-arrow"><BsFillTriangleFill/></div>
              </div>
              <div className={`note-div ${showContent ? '' : 'd-none'}`}>
                <p>Note:</p>
                <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam Ipsum Eros, Mattis A Dui
                Orem Viverra, At Commodo Lorem Porttitor.</p>
              </div>
            </div>


             <div class="tbl-row row-cnt" onClick={() => setShowContent(!showContent)}>
              <div className="tb-body-r" >
                <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                <div className="tbl-cell blank mod-bk">In</div>
                <div className="tbl-cell">0Xe9...</div>
                <div className="tbl-cell">My Alert</div>
                <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                <div className="tbl-cell blank notice-arrow"><BsFillTriangleFill/></div>
              </div>
              <div className={`note-div ${showContent ? '' : 'd-none'}`}>
                <p>Note:</p>
                <p>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nullam Ipsum Eros, Mattis A Dui
                Orem Viverra, At Commodo Lorem Porttitor.</p>
              </div>
            </div>
            </div>
          </div>
            <div className="lm-btn">
              <button>Load More<BsChevronDown/></button>
            </div>
          </div>
        </Tab>
        {/* =================================================================================================================== */}
        {/* =============================================COMMUNITY MONITOR TAB================================================= */}
        {/* =================================================================================================================== */}
        <Tab eventKey="second" title="Community Monitor">
        <div className="notification-tbl">
          <div class="tbl">
            <div class="tbl-row tb-head">
              <div class="tbl-cell">Date & Time</div>
              <div class="tbl-cell">Violation</div>
              <div class="tbl-cell">From</div>
              <div class="tbl-cell">To</div>
              <div class="tbl-cell">Trx. Hash</div>
            </div>

            <div className="tmain-body">
              <div class="tbl-row row-cnt" >
                <div className="tb-body-r" >
                  <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                  <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                  <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                  <div className="tbl-cell">0Xf4...<span className="d-block">...1520</span></div>
                  <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                </div>
              </div>

              <div class="tbl-row row-cnt" >
                <div className="tb-body-r" >
                  <div className="tbl-cell">23-06-2022<span className="d-block">08:06:12</span></div>
                  <div className="tbl-cell">0.0071ETH<span className="d-block">~$76.92</span></div>
                  <div className="tbl-cell">0Xe9...<span className="d-block">...9876</span></div>
                  <div className="tbl-cell">0Xe9...</div>
                  <div className="tbl-cell hasharrow-icn "><IoMdArrowRoundUp></IoMdArrowRoundUp></div>
                </div>
              </div>

            </div>
          </div>
          <div className="lm-btn">
            <button>Load More<BsChevronDown/></button>
          </div>
          </div>
        </Tab>
        <Tab eventKey="third" title="Price Alert">
          tab3
        </Tab>
      </Tabs>
      </>
    );
  };

  
  
  // ============WALLET CONTENTS=========== //
  const Tab3 = () => {  
  const { authenticate, isInitialized, Moralis } = useMoralis();
   const [chain, setChain] = useState("eth");
   if (isInitialized) {
    console.log("is done with the initializzarion");
  }
  const [alldataresult, setalldataresult] = useState([]);
  const [searchedvalue, setsearchedvalue] = useState();
  const [priceamount, setpriceamount] = useState("");



  const mainnets = {
    chains: {
      eth: "Ethereum Mainnet",
      bsc: "BSC Mainnet",
      matic: "Polygon (Matic) Mainnet",
      avalanche: "Avalanche Mainnet",
    },
  };
  const networks = mainnets;
  function chainChanged(event) {
    setChain(event);
  }
  function latestTime(tokenad) {
    return new Promise(function (resolve, success) {
      const chain = EvmChain.ETHEREUM;
      
      const response = MainMoralis.EvmApi.token.getTokenPrice({
        address: tokenad,
        chain,
      });

      response
        .then(function (result) {
          // console.log(result.toJSON().usdPrice); // Returns a primitive

          resolve(result.toJSON().usdPrice);
        })
        .catch((e) => resolve(0));
    });
  }


  const { fetch: tokencheckedinput } = useMoralisCloudFunction(
    "tokencheck",
    {},
    {
      autoFetch: false,
    }
  );

const handlesearch = async () => {

  Moralis.Cloud.run("gettokentrails").then(async () => {

      const address = searchedvalue;

      // const chain = EvmChain.ETHEREUM;

      const evmchainvalue =
        chain == "eth"
          ? EvmChain.ETHEREUM
          : chain == "bsc"
          ? EvmChain.BSC
          : chain == "matic"
          ? EvmChain.POLYGON
          : chain == "avalanche"
          ? EvmChain.AVALANCHE
          : EvmChain.ETHEREUM;
    
      const chainforsend =
        chain == "eth"
          ? "0x1"
          : chain == "bsc"
          ? "0x38"
          : chain == "matic"
          ? "0x89"
          : chain == "avalanche"
          ? "0xa86a"
          : "0x1";

      const headers = {
        accept: "application/json",
        "X-API-Key":
          "GomgxLzN3uLVh5BqJH1qR2yOaQip4EHYzzhnBmAf60G840xQWbGmgPhrjmVP1JQ8",
      };

      fetch(
        "https://deep-index.moralis.io/api/v2/" +
          address +
          "/balance?chain=" +
          chainforsend,
        { headers }
      )
        .then((response) => response.json())

        .then(async (data) => {
          setpriceamount((data.balance / 1e18).toFixed(2));
          console.log("price total:",priceamo);
        })
        .catch((error) => {
          window.alert(JSON.stringify("🚫 Error Occures 🚫", 0, 2));
        });

      const response = await MainMoralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain: evmchainvalue,
      });

      setalldataresult(
        await Promise.all(
          response.toJSON().map(async (a) => {
            return {
              balance: "6000000000",
              decimals: 9,
              name: a.name,
              symbol: a.symbol,
              quantity: Number(a.balance) / Math.pow(10, a.decimals),
              token_address: a.token_address,
              price: Number(await latestTime(a.token_address)).toFixed(3),
              valueinusd:
                "$" +
                " " +
                (
                  (await latestTime(a.token_address)) *
                  (Number(a.balance) / Math.pow(10, a.decimals))
                ).toFixed(3),
            };
          })
        )
      );
      console.log("weee:", alldataresult);

      tokencheckedinput({
        onSuccess: async (object) => {
          console.log("succedd");
        },
        onError: (error) => {
          console.log("nftchecked Error:", error);
        },
      });

    
  });
};



    return (
    <>
    <Form className="cu-form search-form" onSubmit={(event) => { event.preventDefault(); handlesearch(); }}>
      <Form.Group >
        <Dropdown  id="blockchain" name="blockchain"  onSelect={(e) => chainChanged(e)} > 
          <Dropdown.Toggle className="select-type2">
            {networks.chains[chain] ? networks.chains[chain] : "Network"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Object.keys(networks.chains).map((chain) => (
              <Dropdown.Item eventKey={chain} data-chainlookupvalue={chain} key={chain} >
                {networks.chains[chain]}
              </Dropdown.Item>  
            ))}
          </Dropdown.Menu>
         </Dropdown>
      </Form.Group>
      <Form.Group >
        <Form.Control type="text" placeholder="Enter Wallet Address"  onChange={(e) => setsearchedvalue(e.target.value)} />
      </Form.Group>
      <Button className="btn btn-fill" type="submit" >Search</Button>
    </Form>
    { alldataresult.length != 0 && (
      <>
       <div className="main-search-content">
         <p className="adress-title"><span>Address: </span>0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB</p>
         <div className="data-div">
            <p className="title">Summary</p>
            <div className="row">
              <div className="col-md-3">
                <div className="card-content-div">
                  <span className="c-title">Total Balance</span>
                  <h2>$7587</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-content-div">
                  <span className="c-title">ETH Balance</span>
                  <h2>0.2359 ETH<span className="d-block">(1,867.67 USD)</span></h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-content-div">
                  <span className="c-title">Token Balance</span>
                  <h2>$75.87</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-content-div">
                <span className="c-title">Number Of NFTs</span>
                  <h2>23</h2>
                </div>
              </div>
            </div>
         </div>

         <div className="data-div">
          <p className="title">ERC20</p>
            <div className="row">
              <div className="col-md-3">
               <div className="card-content-div">
                  <span className="c-title">Total Number Of Assets</span>
                  <h2>1589</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card-content-div">
                  <span className="c-title">Total Value In USD</span>
                  <h2>$987</h2>
                </div>
              </div>
            </div>
            <div className="erc-tale">

            </div>
         </div>
       </div>
      </>
    )}


    </>
    )
  };


  // ======================PROFILE======================== //
  const Tab4 = () => {
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [ismailverified, setIsmailverified] = useState("")

    useEffect(() => {
      if (user) {
        setMail(user.get("email"));
        setUsername(user.get("ethAddress"))
        setTelegram(user.get("telegram"))
      }
    }, [user]);

    const handlemail = ()=>{
      if(mail == undefined){
        router.push('/more-details?fromDashmail=true');
      }
      if(mail == user.attributes.email){
        alert("email already exist")
      }else{
        router.push('/more-details?fromDashmail=true');
      }
    }
    const handltele = ()=>{
      if(telegram == undefined){
        router.push('/more-details?fromDash=true');
      }
      if(telegram == user.attributes.email){
        alert("email already exist")
      }else{
        router.push('/more-details?fromDash=true');
      }
    }
  

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    

    return (
      <>
      <div className="cu-form profile-form">
        <div className="ipfield-main">
          <span className="d-block prof-ip-label">Name</span>
          <div className="prof-ip-butn">
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <div className="">
              <button className="btn-fill" onClick={() => { console.log(username) }}>save</button>
            </div>
          </div>
        </div>
        <div className="ipfield-main">
          <span className="d-block prof-ip-label">Email</span>
          <div className="prof-ip-butn">
            <input placeholder="" type="email" value={mail} onChange={(e) => { setMail(e.target.value) }} />
            <div className="">
              <button className="btn-fill" onClick={handlemail}>{ mail ? 'save' : 'verify now'}</button>
            </div>
          </div>
        </div>
        <div className="ipfield-main">
          <span className="d-block prof-ip-label">Telegram Id</span>
          <div className="prof-ip-butn">
            <input placeholder="" type="text" value={telegram} onChange={(e) => { setTelegram(e.target.value) }} />
            <div className="">
              <button className="btn-fill" onClick={handltele}>{ telegram ? 'save' : 'verify now'}</button>
            </div>
          </div>
        </div>
      </div>
      
    </>
    );
  };


  // ============LEARN=========== //
  const Tab5 = () => {
    return <>
        <h2 onClick={()=>{}}>this is tab5</h2>
    </>;
  };




  return (
    <>
    <div className="container">
        <div className="main-tab-div">
            <div className="row">
                <div className="col-lg-2">
                    <div className="tabs-butns">
                        <div className={`vertical-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                            <button className="main-btn" type="button">Dashboard</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                            <button className="main-btn" type="button">Notification</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>
                            <button className="main-btn" type="button">wallet Contents</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>
                            <button className="main-btn" type="button">Profile</button>
                        </div>
                        <div className={`vertical-tab ${activeTab === 5 ? 'active' : ''}`} onClick={() => handleTabClick(5)}>
                            <button className="main-btn" type="button">Learn</button>
                        </div>
                        <div className={`vertical-tab dash-logout`}>
                            <button className="main-btn" type="button" onClick={handleLogout} >Logout</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-10">
                  <div className="tab-side-content">
                    {activeTab === 1 && <Tab1 />}
                    {activeTab === 2 && <Tab2 />}
                    {activeTab === 3 && <Tab3 />}
                    {activeTab === 4 && <Tab4 />}
                    {activeTab === 5 && <Tab5 />}
                  </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default VerticalTabs;