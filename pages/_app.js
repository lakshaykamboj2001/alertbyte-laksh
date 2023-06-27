import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer'
// import {ApolloProvider} from '@apollo/client/react'
// import {client} from './api/apollo'
import '../styles/globals.css';
// import { GoogleAnalytics } from "nextjs-google-analytics";
// import Layout from './components/Layoutbody'
import { MoralisProvider } from "react-moralis";

export default function App({ Component, pageProps }) {
  const MORALIS_APP_ID = "nq6WDIQNEJh41oin0DQGUiOa2u4iR23xRMcJMPWN";
  const MORALIS_SERVER_URL = "https://wjyaponarwtp.grandmoralis.com:2053/server";
  return (
    <>
    {/* <ApolloProvider client={client} > */}
    {/* <GoogleAnalytics gaMeasurementId={'G-332BYTXFSC'} /> */}
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
     <Component {...pageProps} />
     <Footer /> 
     </MoralisProvider>
     {/* <Layout/> */}
    {/* </ApolloProvider> */}
    </>
  )
}


  