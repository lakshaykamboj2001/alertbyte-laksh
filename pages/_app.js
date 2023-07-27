import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
import { MoralisProvider } from "react-moralis";
import StatusContext from '@/store/status-context';
import Moralis from "moralis";
import Layout from "./components/Layout/Layout";


export default  function App({ Component, pageProps }) {
  const [account, setAccount] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("mainnets");
  const testnets = {
    chains: {
      "matic testnet": "Mumbai (Matic Testnet)",
      ropsten: "Ropsten Testnet",
      "bsc testnet": "BSC Testnet",
      "avalanche testnet": "Avalanche Testnet",
    },
  };


  const mainnets = {
    chains: {
      eth: "Ethereum Mainnet",
      bsc: "BSC Mainnet",
      matic: "Polygon (Matic) Mainnet",
      avalanche: "Avalanche Mainnet",
      eth_token: "Ethereum Token",
      btc_token: "BSC Token",
      matic_token: "Polygon (Matic) Token",
      ava_token: "Avalanche Token",
    },
  };
  // "rinkeby": "Rinkeby",
  // "goerli": "Goerli",
  // "kovan": "Kovan",

  const networks = currentNetwork === "testnets" ? testnets : mainnets;
  
  const MORALIS_APP_ID = "IQYq9tbIpBBRcnh0bNnMoDUeXTgd20POBtbvmnb9";
  const MORALIS_SERVER_URL = "https://qivfsortzjjk.grandmoralis.com:2053/server";

  const [error, setError] = useState({
    title: "",
    message: "",
    showErrorBox: false,
  });
  const [success, setSuccess] = useState({
    title: "",
    message: "",
    showSuccessBox: false,
  });

 if (!Moralis.Core.isStarted) {
  Moralis.start({
      apiKey: "GomgxLzN3uLVh5BqJH1qR2yOaQip4EHYzzhnBmAf60G840xQWbGmgPhrjmVP1JQ8",
    });
  }

  
  return (
    <>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL} >
      <StatusContext.Provider value={[error, success, setSuccess, setError]}>
      <Layout setCurrentNetwork={setCurrentNetwork}>
        <Component {...pageProps} account={account} networks={networks} setAccount={setAccount} />
        </Layout>
      </StatusContext.Provider>
    </MoralisProvider>
    </>
  )
}


  