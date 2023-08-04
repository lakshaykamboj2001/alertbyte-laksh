import React, { useState,useEffect,useRef,useContext } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Link from 'next/link';
import {FaChevronDown} from 'react-icons/fa';
import StatusContext from '@/store/status-context';
import Personalform  from "./personal/personalform";





const Firsttab = ({networks,states, updateStates} ) => {

  const router = useRouter();
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const [showContent, setShowContent] = useState(false);
  const [showFilterExpand, setShowFilterExpand] = useState(false);
  const filterRef = useRef(null);


// Access the states from the props
const { showcards, showalertfor, showpersonalform, showpreview } = states;



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
      {/*  showcards*/}
      {showcards && (
        <>
        <div className="title-btn-div"> 
          <span className="title">All Alerts</span>
          <div className="">
            <button className="btn-fill" onClick={()=>{updateStates({showalertfor:true ,showcards:false  });} }>+ Add Alert</button>
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
              <div className="card-content-div personal-card cc-active">

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
                  <button className="btn-fill" onClick={()=>{updateStates({showalertfor:false ,showpersonalform:true  });} } >+ Add Alert</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-content-div">
                <h5 className="alert-title">Community Monitor</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque ipsum purus.</p>
                <div className="title-btn-div ">
                  <button className="btn-fill" >+ Add Alert</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-content-div">
                <h5 className="alert-title">Price Alert</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque ipsum purus.</p>
                <div className="title-btn-div ">
                  <button className="btn-fill" >+ Add Alert</button>
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

    </div>
    </>
    );
  };

  export default Firsttab;