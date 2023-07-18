import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import Moralis from "moralis-v1";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';




const VerticalTabs =() => {
  const {
    logout,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();
  const [activeTab, setActiveTab] = useState(3); 
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
    return (
      <Tabs defaultActiveKey="first" className="monitor-btn">
        <Tab eventKey="first" title="Personal Monitor">
          <div className="notification-table">
            <table className="table table-striped">
              <thead>
                <tr className='table-div'>
                  <th scope="col">Date</th>
                  <th scope="col">Ammount</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Alert</th>
                  <th scope="col">Trx. Hash</th> 
                </tr>
              </thead>
              <tbody>
                <td>wee</td>
                <td>cdf</td>
                <td>dfd</td>
                <td>4545</td>
                <td>dff4</td>
                <td>dff4ds</td>

              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="second" title="Community Monitor">
          tab2
        </Tab>
        <Tab eventKey="third" title="Price Alert">
          tab3
        </Tab>
      </Tabs>
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



  // const handlesearch = async () => {
  //   console.log(walletadress);

  // // Get all NFT tokens associated with the wallet address
  // const nfts = await Moralis.Web3API.account.getNFTs({ address: walletdress });
  // console.log("Number of NFTs:", nfts.length);

  // // Iterate over the NFTs and log relevant information
  // nfts.forEach((nft) => {
  //   console.log("Token ID:", nft.token_id);
  //   console.log("Contract Address:", nft.token_address);
  //   console.log("Token Name:", nft.name);
  //   console.log("Token Symbol:", nft.symbol);
  //   console.log("------------------------");
  // });
  // }
  

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
