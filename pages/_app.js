import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/footer'
// import {ApolloProvider} from '@apollo/client/react'
// import {client} from './api/apollo'
import '../styles/globals.css';
// import { GoogleAnalytics } from "nextjs-google-analytics";
// import Layout from './components/Layoutbody'

export default function App({ Component, pageProps }) {
  return (
    <>
    {/* <ApolloProvider client={client} > */}
    {/* <GoogleAnalytics gaMeasurementId={'G-332BYTXFSC'} /> */}
     <Component {...pageProps} />
     <Footer />
     {/* <Layout/> */}
    {/* </ApolloProvider> */}
    </>
  )
}