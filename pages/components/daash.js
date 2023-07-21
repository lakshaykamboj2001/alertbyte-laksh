import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Moralis from "moralis-v1";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Link from 'next/link';
import { IoMdArrowRoundUp} from 'react-icons/io';
import {BsFillTriangleFill} from 'react-icons/bs';
import {BsChevronDown} from 'react-icons/bs';

const VerticalTabs =() => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();
  const [activeTab, setActiveTab] = useState(2); 
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

  // ============DASHBOARD=========== //
  const Tab1 = () => {
    return <>
        <h2>this is tab1</h2>
    </>;
  };
  

 // ============NOTIFICATIONS=========== //
  const Tab2 = () => {
  const [showContent, setShowContent] = useState(false);
    return (
      <>
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
        <Tab eventKey="second" title="Community Monitor">
          tab2
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
   const [walletadress, setWalletadress] = useState("");
   const[bchain,setBchain] = useState("");
   const [showdata,setShowdata] = useState(false)

   const handlesearch = async () => {
    console.log(walletadress)
    // const ethBalance = await Moralis.Web3API.account.getNativeBalance({ address: walletadress });
    // console.log("ETH Balance:", ethBalance.balance);
    
    // // Print the created user's other balance (e.g., ERC20 token balance)
    // const tokenBalances = await Moralis.Web3API.account.getTokenBalances({ address: walletadress });
    // console.log("Token Balances:", tokenBalances);

    const nfts = await Moralis.Web3API.account.getNFTs({ address: walletadress });
    console.log(nfts);
    // // 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
   }




    return (
    <>
    <Form className="cu-form search-form">
      <Form.Group >
        <Form.Control as="select" placeholder="Select Blockchain"  value={bchain} onChange={(e)=>{setBchain(e.target.value)}} > 
          <option value="">Please Select</option>
          <option value="ethereum" >Ethereum</option> 
          <option value="tether">Tether</option>
          <option value="BNB" >BNB</option> 
          <option value="USD">USD Coin</option>
          <option value="XRP" >XRP</option> 
          <option value="others">Others</option>
         </Form.Control>
      </Form.Group>
      <Form.Group >
        <Form.Control type="text" placeholder="Enter Wallet Address" value={walletadress} onChange={(e)=>{setWalletadress(e.target.value)}} />
      </Form.Group>
      <Button className="btn btn-fill" type="button" onClick={handlesearch}>Search</Button>
    </Form>
    {showdata && (
      <>
        
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
