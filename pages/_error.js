import React from 'react'
import Header from './components/header'
import Link from "next/link"

export default function Error() {
  return (
    <>
    <main className="main-error">
    <Header/>
    <section className='err-banner'>
     <div className="container">
        <div className="hero-div">
        <h1 className="sec-title">ERROR 404</h1>
        <div className="img-div">
            <img src="/images/error-404-1.png" alt="error-404" />
        </div>
        <p className='sec-p'>We looked all over, but that page seems to have gotten away from us. Try one of these links to get back on track.</p>
        </div>
        <div className="err-links-div">
            <p><Link className='ot-lnk' href="/contact-us/">Consult the Security of Your Web3 Projects With Us <img src="/images/grad-arr.svg" alt="" /></Link></p>
            <p><Link className='ot-lnk' href="/services/">Explore Our List of Security Audit Services <img src="/images/grad-arr.svg" alt="" /></Link></p>
            <p><Link className='ot-lnk' href="/blog/">Learn More About Blockchains and Web3 <img src="/images/grad-arr.svg" alt="" /></Link></p>
        </div>
        <Link className="btn btn-fill" href="/">Go Back To Homepage</Link>
     </div>
    </section>
    </main>
    </>
  )
}