import React from 'react'
import Header from './components/header'
// import HomeBanner from './components/home/home-banner'
// import HomeServices from './components/home/home-services'
// import IndustryPartner from './components/industry-partner'
// import HomeLeagueProjects from './components/home/home-league-projects'
// import HomeFeaturedAudits from './components/home/home-featured-audits'
// import Testimonials from './components/testimonials'
// import RecentBlogs from './components/recent-blogs'
// import HomeFaq from './components/homefaq'

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
    {/* <HomeBanner bannerheading="Smart Contract Audits"  />
    <HomeServices />
    <IndustryPartner />
    <HomeLeagueProjects />
    <HomeFeaturedAudits />
    <Testimonials />
    <RecentBlogs />
    <HomeFaq /> */}
    </main>
    </>
  )
}
