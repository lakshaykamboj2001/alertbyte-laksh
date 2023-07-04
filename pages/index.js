import React from 'react'
import Header from './components/header'
import HomeBanner from './components/home/homebanner'
import HomeServices from './components/home/homeservices'
import Bugs from './components/home/bug'
import Choose from './components/home/choose'
import Twiter from './components/home/twiter'
import Blog from './components/home/blog'
import Newsletter from './components/newsletter'
import Footer from './components/footer'




export default function Home() {
  
  const mdata = {
    mval_one: 'Best Smart Contract Auditing Services | Blockchain Security Auditors - alertbytes',
    mval_two: "Choose alertbytes —One of the World's Leading Web3 / Blockchain Audit Firm—for Auditing Smart Contract Security for ✔Blockchains, ✔Defi, ✔Dapp, ✔Crypto, ✔NFTs and ✔Tokens",
    mval_three: "Best Smart Contract Auditing Services | Blockchain Security Auditors - alertbytes",
    mval_four: "Choose alertbytes —One of the World's Leading Web3 / Blockchain Audit Firm—for Auditing Smart Contract Security for ✔Blockchains, ✔Defi, ✔Dapp, ✔Crypto, ✔NFTs and ✔Tokens",
    mval_five: "Web3 Security Audit Company Company",
    mval_six: "https://www.alertbytes.com/",
    image_link:"https://www.alertbytes.com/blog/wp-content/uploads/2022/09/ib-logo-green.png",

  };

  return (
    <>
    <main className=" main-home">
    <Header mdata={mdata}/>
    <HomeBanner/>
    <HomeServices />
    <Bugs/>
    <Choose/>
    <Twiter/>
    <Blog/>
    <Newsletter/>
    <Footer /> 
    </main>
    </>
  )
}
