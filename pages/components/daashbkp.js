import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";


const VerticalTabs = () => {
  // const {
  //   logout,
  //   user,
  //   setUserData,
  //   refetchUserData,
  // } = useMoralis();

  const [activeTab, setActiveTab] = useState(4); 
  const [emailError, setEmailError] = useState(false);
  // const[username,setUsername] = useState("");
  const[aa,setAa] = useState("");
  const[mail,setMail] = useState("");

  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  console.log(username);
  // const[telegram,setTelegram] = useState("");
  // const router = useRouter();

  // const validateEmail = (email) => {
  //   const re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // };


  // const handleLogout = async () => {
  //   // if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
  //   await logout();
  //   if (router.pathname !== "/") router.push("/", undefined, { shallow: true });
  //   // router.reload(window.location.pathname);
  // };
  // const handleTabClick = (tabNumber) => {
  //   setActiveTab(tabNumber);
  // };
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

    return <>
   
      <div className="cu-form profile-form">
          <div className="ipfield-main">
            <span className="d-block prof-ip-label">Name</span>
            <div className="prof-ip-butn">
            
            <input type="text" name="username" value={username}
        onChange={handleUsernameChange}/>
 
    
              <div className="">
                <button className="btn-fill"  onClick={()=>{}}>save</button>
              </div>
            </div>
          </div>
          <div className="ipfield-main">
            <span className="d-block prof-ip-label">Email</span>
            <div className="prof-ip-butn">
              <input placeholder="" type="email" />
              <div className="">
                {/* <button className="btn-fill" onClick={()=>{console.log("clicked")}}>save</button> */}
              </div>
            </div>
          </div>
          <div className="ipfield-main">
            <span className="d-block prof-ip-label">Telegram Id</span>
            <div className="prof-ip-butn">
              <input placeholder="" type="text"  />
              <div className="">
                <button className="btn-fill" onClick={()=>{console.log("clicked")}}>verify now</button>
              </div>
            </div>
          </div>
      </div>
    </>;
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
                            {/* <button className="main-btn" type="button" onClick={handleLogout} >Logout</button> */}
                        </div>
                    </div>
                </div>

                <div className="col-lg-10">
                    {activeTab === 1 && <Tab1 />}
                    {activeTab === 2 && <Tab2 />}
                    {activeTab === 3 && <Tab3 />}
                    {activeTab === 4 && <Tab4 />}
                    {activeTab === 5 && <Tab5 />}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default VerticalTabs;
