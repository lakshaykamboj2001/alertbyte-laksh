import React from 'react'
import ThankBanner from './components/thank/thank-banner'
import Header from './components/header'


export default function DigitalSecurity() {
  const mdata = {
    mval_one: 'Thank You - alertbytes',
    mval_two: "Thank You For Choosing Our Services - alertbytes",
    mval_three: 'Thank You - alertbytes',
    mval_four: "Thank You For Choosing Our Services - alertbytes",
    mval_five: 'Thank You - alertbytes',
    mval_six: 'https://www.alertbytes.com/thank-you/',
    image_link:"https://www.alertbytes.com/blog/wp-content/uploads/2022/09/ib-logo-green.png",
  };
  return (
    <>
    <Header mdata={mdata} />
    <main className="main-services">
    <ThankBanner />
    </main>
    </>
  )
}
