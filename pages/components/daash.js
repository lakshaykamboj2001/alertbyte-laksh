import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Moralis from "moralis-v1";
import TeleFlow from "./more-details/tele-flow";

const VerticalTabs = () => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();
  const [activeTab, setActiveTab] = useState(4); 
  const router = useRouter();



  const handleLogout = async () => {
    // if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
    await logout();
    if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
    // router.reload(window.location.pathname);
  };
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const Tab1 = () => {
    return <>
        <h2>this is tab1</h2>
    </>;
  };
  
  const Tab2 = () => {
    return <>
        <h2>this is tab2</h2>
    </>;
  };
  
  const Tab3 = () => {
    return <>
        <h2>this is tab3</h2>
    </>;
  };
  const Tab4 = () => {
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [telegram, setTelegram] = useState("");

    useEffect(() => {
      if (user) {
        setMail(user.get("email"));
        setUsername(user.get("username"))
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
              <button className="btn-fill" onClick={handlemail}>save</button>
            </div>
          </div>
        </div>
        <div className="ipfield-main">
          <span className="d-block prof-ip-label">Telegram Id</span>
          <div className="prof-ip-butn">
            <input placeholder="" type="text" value={telegram} onChange={(e) => { setTelegram(e.target.value) }} />
            <div className="">
              <button className="btn-fill" onClick={handltele}>verify now</button>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };

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
                            <button className="main-btn" type="button">wallet Content</button>
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
