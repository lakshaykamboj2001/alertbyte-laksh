import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Footer() {
 

  return (
    <>
    <footer className="footer">
      <div className="container">
        
        <div className="main-foot">
          <div className="img-div">
          <img src="/global/footer-logo.png" alt="" />
          </div>
          <div className="foot-links">
            <ul>
              <li>Blogs</li>
              <li>Docs</li>
              <li>Pricing</li>
              <li>Support</li>
              <li>Privacy Policy</li>
              <li>T&C</li>
              <li>Disclaimer</li>
            </ul>
            <div className="foot-social">
            <h5 className="fs-title">Join Us:</h5>
                <Link href="/" className="img-div"><img src="/global/foot-icn-1.png" alt="" /></Link>
                <Link href="/" className="img-div"><img src="/global/foot-icn-2.png" alt="" /></Link>
                <Link href="/" className="img-div"><img src="/global/foot-icn-3.png" alt="" /></Link>
                <Link href="/" className="img-div"><img src="/global/foot-icn-4.png" alt="" /></Link>
              </div>
          </div>
          <div className="foot-btm">
            &copy;2023 alertbytes. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}