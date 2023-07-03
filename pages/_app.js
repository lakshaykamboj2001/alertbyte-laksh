import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer'
import '../styles/globals.css';
// import { GoogleAnalytics } from "nextjs-google-analytics";
import { MoralisProvider } from "react-moralis";
import StatusContext from '../store/status-context';

export default function App({ Component, pageProps }) {
  const MORALIS_APP_ID = "nq6WDIQNEJh41oin0DQGUiOa2u4iR23xRMcJMPWN";
  const MORALIS_SERVER_URL = "https://wjyaponarwtp.grandmoralis.com:2053/server";
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
  return (
    <>
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <StatusContext.Provider value={[error, success, setSuccess, setError]}>
     <Component {...pageProps} />
     <Footer /> 
     </StatusContext.Provider>
     </MoralisProvider>
     {/* <Layout/> */}
    </>
  )
}


  