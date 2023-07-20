import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
// import { GoogleAnalytics } from "nextjs-google-analytics";
import { MoralisProvider } from "react-moralis";
import StatusContext from '@/status-context';
import Moralis from "moralis";



export default function App({ Component, pageProps }) {

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
  
  useEffect(() => {
  console.log("started");
  Moralis.start({
    appId: MORALIS_APP_ID,
    serverUrl: MORALIS_SERVER_URL,
  }).then(() => {
    console.log("Moralis server connected successfully"); //moralis cholche kina dekhar jonno
  }).catch((error) => {
    console.error("Moralis server connection failed:", error);
  });
}, []);


  return (
    <>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <StatusContext.Provider value={[error, success, setSuccess, setError]}>
     <Component {...pageProps} />
    </StatusContext.Provider>
    </MoralisProvider>
     {/* <Layout/> */}
    </>
  )
}


  