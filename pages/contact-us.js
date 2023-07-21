import React from 'react'
import Header from './components/header'
import ContactForm from './components/contact-form'
import Newsletter from './components/newsletter-mod'




export default function Home() {
  

  return (
    <>
    <main className="contact-us">
    <ContactForm/>
    <Newsletter/>
    </main>
    </>
  )
}
