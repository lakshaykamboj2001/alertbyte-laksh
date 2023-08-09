import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Link from 'next/link';
import {FaChevronDown} from 'react-icons/fa';
import StatusContext from '@/store/status-context';
import Personalform  from "./monitor_forms/personalform";
import Communityform from "./monitor_forms/communityform"
import Priceform from "./monitor_forms/priceform"
import {BiSolidRightArrow , BiSolidLeftArrow} from 'react-icons/bi';





const Firsttab = ({networks, showcards, setShowcards,  showalertfor, setShowalertfor, showpersonalform , setShowpersonalform,showcommunityform,setShowcommunityform,showpriceform,setShowpriceform} ) => {

  const router = useRouter();
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const [showContent, setShowContent] = useState(false);
  const [showFilterExpand, setShowFilterExpand] = useState(false);
  const filterRef = useRef(null);


// Access the states from the props
// const { showcards, showalertfor, showpersonalform, showpreview } = states;
// const { showcards = false, showalertfor = false, showpersonalform = false} = states;


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
     
      {showcards && (
        <>
        <div className="title-btn-div"> 
          <span className="title">All Alerts</span>
          <div className="">
            <button className="btn-fill" onClick={()=>{setShowalertfor(true),setShowcards(false)} }>+ Add Alert</button>
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
        </div> {/* filter-main-div end */}
        <div className="main-cards-div">
          <div className="row g-5">
            <div className="col-md-4">
              <div className="card-content-div preview-card ">

                <div className="status-div">
                  <div className="status-circle"></div>
                  <span className="status-txt">Active</span>
                </div>
                <h3 className="wallet-name">My_Wallet</h3>
                <span className="wallet-adress">0X85...3445</span>

                <div className="bchain-value-div">
                  <div className="bchain-value">
                    <div className="bchain-img">

                    </div>
                    <div className="sub-head">Ethereum</div>
                  </div>
                  <div className="bchain-value">
                    <div className="bchain-img">

                    </div>
                    <div className="sub-head">Polygon</div>
                  </div>
                </div>

                <div className="main-value-direction-div">
                  <div className="sub-head">Personal Monitor for</div>
                  <div className="value-dir">
                  <div className="value">&lt;$50</div>
                    <div className="value">IN</div>
                  </div>
                </div>
                <div className="notification-count">3 Notification Sent</div>

              </div>{/* card-content-div end */}
            </div>

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
            </div>

            
            
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
         <Priceform networks={networks}/>
        </>
      )}

    </div>
    </>
    );
  };

  export default Firsttab;