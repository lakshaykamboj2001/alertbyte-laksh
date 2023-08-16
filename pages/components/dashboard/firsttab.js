import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Link from 'next/link';
import StatusContext from '@/store/status-context';
import Personalform  from "./monitor_forms/personalform";
import Communityform from "./monitor_forms/communityform"
import Priceform from "./monitor_forms/priceform"
import {BiSolidRightArrow , BiSolidLeftArrow} from 'react-icons/bi';
import Filter from "./dashboard_filter";




const Firsttab = ({networks, showcards, setShowcards,  showalertfor, setShowalertfor, showpersonalform , setShowpersonalform,showcommunityform,setShowcommunityform,showpriceform,setShowpriceform} ) => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
    } = useMoralis();
  const router = useRouter();
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const { Moralis, isAuthenticated } = useMoralis();

  const [paramdata , setParamdata] = useState("");



  const [watchedAddresses, setWatchedAddresses] = useState([]);
  const [marketCapAddresses, setMarketCapAddresses] = useState([]);
  const [communityAddresses, setCommunityAddresses] = useState([]);
  const [categorizedDataArray, setCategorizedDataArray] = useState([]);

  const getWatchedAddresses = async () => {
    try {
      const _watched = await Moralis.Cloud.run("getWatchedAddresses");
      setWatchedAddresses("");
      // user feedback
      if (_watched) {
        _watched.map((item) => {
          // console.log(item);
          setWatchedAddresses((watchedAddresses) => [
            ...watchedAddresses,
            item,
          ]);
        });
      } else {
        window.alert(JSON.stringify("No watched addresses found"));
      }
      return;
    } catch (error) {
      console.log("ERROR-", error);
    }
  };
  
  const getCommunityAddresses = async () => {
    try {
      const _watched = await Moralis.Cloud.run("getCommunityAddresses");
      setCommunityAddresses("");
      // user feedback
      if (_watched) {
        _watched.map((item) => {
          // console.log(item);
          setCommunityAddresses((communityAddresses) => [
            ...communityAddresses,
            item,
          ]);
        });
      } else {
        window.alert(JSON.stringify("No watched addresses found"));
      }
      return;
    } catch (error) {
      console.log("ERROR-", error);
    }
  };

  // const getMarketCapAddresses = async () => {
  //   try {
  //     const _market = await Moralis.Cloud.run("getMarketCapAddresses");
  //     setMarketCapAddresses("");
  //     // user feedback
  //     if (_market) {
  //       // console.log(JSON.stringify(_market));
  //       _market.map((item) => {
  //         console.log(item)
  //         setMarketCapAddresses((watchedAddresses) => [
  //           ...watchedAddresses,
  //           item,
  //         ]);
  //       });
  //     } else {
  //       window.alert(JSON.stringify("No watched addresses found"));
  //     }
  //     return;
  //   } catch (error) {
  //     console.log("ERROR-", error);
  //   }
  // };

  const getMarketCapAddresses = async () => {
     
    try {
      const marketCapAddresses = await Moralis.Cloud.run("getMarketCapAddresses");
      const tempArray = [];

      if(marketCapAddresses){
        // Categorize elements based on cryptoslug
       marketCapAddresses.forEach((parseObject) => {
          const attributes = parseObject.attributes;
          const cryptoslug = attributes.cryptoslug;

          // Find the index for the cryptoslug in the temp array
          const index = tempArray.findIndex(
            (item) =>
              item && item[0] && item[0].attributes.cryptoslug === cryptoslug
          );

          if (index === -1) {
            tempArray.push([parseObject]);
          } else {
            tempArray[index].push(parseObject);
          }
        });
        setCategorizedDataArray(tempArray);
      }else {
        window.alert(JSON.stringify("No watched addresses found"));
      }
    } catch (error) {
      console.log("ERROR-", error);
    }

  };


  useEffect(() => {
    if (user) getWatchedAddresses();
  }, [user]);

  useEffect(() => {
    if (user) getMarketCapAddresses();
  }, [user]);
  useEffect(() => {
    if (user) getCommunityAddresses();
  }, [user]);

  // useEffect(() => {
  //   console.log("getMarketCapAddresses", marketCapAddresses);
  // }, [marketCapAddresses]);

  
  
  return (
    <>
    <div className="main-dash-tab">
     
      {showcards && (
        <>
        <div className="title-btn-div"> 
          <span className="title">All Alerts</span>
          <div className="">
            <button className="btn-fill" onClick={()=>{setShowalertfor(true),setShowcards(false)} }>+ Add Alert</button>
          </div>
        </div>
         <Filter/>
        
        <div className="main-cards-div">
          <div className="row g-5">

            {watchedAddresses.map((item, index) => (
              <div className="col-md-4">
                <div className="card-content-div preview-card ">
                  <div className="status-div">
                    <div className="status-circle"></div>
                    <span className="status-txt">Active</span>
                  </div>
                  <h3 className="wallet-name">{item.attributes.name}</h3>
                  <span className="wallet-adress"> 
                    {item.attributes.address.substring(0,4)+"..."+item.attributes.address.substring(38,42)}
                  </span>
                  <div className="bchain-value-div">
                    <div className="bchain-value">
                      <div className="bchain-img">
                      {item.className === "WatchedPolygon"
                      ? ( <img src="/Icons/polygon.svg" alt="" />)
                      : item.className === "WatchedBsc"
                      ? (<img src="/Icons/binance.svg" alt="" />)
                      : item.className === "WatchedEth"
                      ? (<img src="/Icons/erc20.svg" alt="" />)
                      : item.className === "WatchedAvax"
                      ? (<img src="/Icons/avalanche.svg" alt="" />)
                      : item.className === "WatchedFtm"
                      ? "FTM"
                      : null}
                      </div>
                      <div className="sub-head">
                      {item.className === "WatchedPolygon"
                      ? "Polygon"
                      : item.className === "WatchedBsc"
                      ? "BSC"
                      : item.className === "WatchedEth"
                      ? "Ethereum"
                      : item.className === "WatchedAvax"
                      ? "Avalanche"
                      : item.className === "WatchedFtm"
                      ? "FTM"
                      : null}
                      </div>
                    </div>
                  </div>
                  <div className="main-value-direction-div">
                    <div className="sub-head">Personal Monitor for</div>
                    <div className="value-dir">
                    <div className="value">&lt;${item.attributes.threshold}</div>
                      <div className="value">{item.attributes.conditions}</div>
                    </div>
                  </div>
                  <div className="notification-count">3 Notification Sent</div>

                </div>{/* card-content-div end */}
              </div>
            ))}

            <div className="col-md-4">
              <div className="card-content-div preview-card community-card">
                <div className="status-div">
                  <div className="status-circle"></div>
                  <span className="status-txt">Active</span>
                </div>
                <h3 className="wallet-name">My_Wallet</h3>
                <div className="bchain-value">
                    <div className="bchain-img">
                      <img src="/Icons/erc20.svg" alt="" />
                    </div>
                    <div className="sub-head">Ethereum</div>
                </div>
                <span className="wallet-adress">0X85...3445</span>
                <div className="alert-method">
                 <img src="/Icons/notifications.svg" alt="" />
                    <span>Telegram</span>
                </div>
                <div className="input-div child-wallets">
                  <div className="child-wallet-cnt">
                    <img src="/Icons/community_monito_total_wallets.svg" alt="" />
                    <span>24</span>
                  </div>
                  <div className="child-wallet-cnt">
                    <img src="/Icons/community_monitor_total_budget.svg" alt="" />
                    <span>$824</span>
                  </div>
                </div>
                <div className="main-wallet-cnt-div">
                  <div className="grey-fill-div">
                    <div className="hb-stats">
                      <div className="hbs">
                        <span>0Xe9...5522</span>
                      </div>
                      <div className="hbs">
                        <span>$50</span>
                      </div>
                      <div className="hbs">
                        <span>28.06.2023</span>
                      </div>
                    </div>
                    <div className="note-div">
                      <div className="note-first">Note:</div>
                      <div className="note-info">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. </div>
                    </div>
                  </div>
                  <div className="slide-btn-div">
                    <span className="slide-btn"> <BiSolidLeftArrow/> </span>
                    <span className="slide-btn"> <BiSolidRightArrow/> </span>
                  </div>
                </div>
                <div className="notification-count">3 Notification Sent</div>
              </div>{/* card-content-div end */}
            </div>

            {categorizedDataArray .map((category, index) => (
              <div className="col-md-4" key={index}>
                <div className="card-content-div preview-card price-card ">
                  <div className="status-div">
                    <div className="status-circle"></div>
                    <span className="status-txt">Active</span>
                  </div>
                  <h3 className="wallet-name">My_Wallet</h3>
                  <div className="grey-fill-div">
                    <div className="bchain-value">
                        <div className="bchain-img">
                          {
                          category[0].attributes.cryptoslug.includes("ethereum") ? <img src="/Icons/erc20.svg" alt="" /> :
                          category[0].attributes.cryptoslug.includes("bsc") ? <img src="/Icons/binance.svg" alt="" /> :
                          category[0].attributes.cryptoslug.includes("ava") ? <img src="/Icons/avalanche.svg" alt="" /> :
                          category[0].attributes.cryptoslug.includes("matic") ? <img src="/Icons/polygon.svg" alt="" /> :
                          category[0].attributes.cryptoslug
                          }
                        </div>
                        <div className="sub-head">{category[0].attributes.cryptoslug}</div>
                    </div>
                    <div className="main-params-value-div">
                      {category.map((item, subIndex) => (
                        <div className="param" key={subIndex}>
                          <div className="param-name">{item.attributes.condition} :</div>
                          <div className="param-value">${item.attributes.user_value}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                  <div className="alert-method">
                  <img src="/Icons/notifications.svg" alt="" />
                      <span>{category[0].attributes.alertMethod}</span>
                  </div>

                  <div className="notification-count">3 Notification Sent</div>
                </div>{/* card-content-div end */}
              </div>
            ))}
            
          </div>
        </div>
        </>
      )}

       {/* showalertfor */}
      { showalertfor && (
        <>
        <div className="title-btn-div"> 
          <span className="title">Add Alert For</span>
        </div>
        <div className="addalert-btn-boxes">
          <div className="row g-5">
            <div className="col-md-4">
              <div className="card-content-div">
                <h5 className="alert-title">Personal Monitor</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque ipsum purus.</p>
                <div className="title-btn-div ">
                  <button className="btn-fill" onClick={()=>{setShowalertfor(false); setShowpersonalform(true)} } >+ Add Alert</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-content-div">
                <h5 className="alert-title">Community Monitor</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque ipsum purus.</p>
                <div className="title-btn-div ">
                  <button className="btn-fill" onClick={()=>{setShowalertfor(false); setShowcommunityform(true) }} >+ Add Alert</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-content-div">
                <h5 className="alert-title">Price Alert</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque ipsum purus.</p>
                <div className="title-btn-div ">
                  <button className="btn-fill" onClick={()=>{setShowalertfor(false); setShowpriceform(true) }}>+ Add Alert</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      
      { showpersonalform && (
        <>
         <Personalform networks={networks}/>
        </>
      )}
      { showcommunityform && (
        <>
         <Communityform networks={networks}/>
        </>
      )}
      { showpriceform && (
        <>
         <Priceform paramdata ={paramdata} setParamdata = {setParamdata} />
        </>
      )}

    </div>
    </>
    );
  };

  export default Firsttab;