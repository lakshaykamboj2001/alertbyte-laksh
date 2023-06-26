import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Footer() {
  const [emailError, setEmailError] = useState(false);
  const [mail,setmail]=useState("")
  const router = useRouter();
  const GetData = async () => {
    if (validateEmail(mail)) {
      setEmailError(false); // Reset the emailError state to false
      let result = await fetch('api_link', {
        method: "POST",
        body: JSON.stringify(mail),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      router.push('/thank-you');
 
      console.log(result);
    } else {
      setEmailError(true);
    }
  }
  
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
    <footer className="footer">
      <div className="container">
        <div className="foot-subscribe">
          <div className="row">
            <div className="col-lg-6">
                <div className="subs-cont">
                  <div className="img-div">
                    <img src="/global/home-subs.png" alt="" />
                  </div>
                  <div className="row-text">
                    <h3 className='nsub-head'>Subscribe To Our Newsletter</h3>
                    <p className='nsubs-txt'>Lorem ipsum dolor, sit amet consectetur adipisicing elit Tenetur a quia labore. Dolorem fugit voluptas dolor soluta </p>
                  </div>
                </div>
            </div>
            <div className="col-lg-6">
              <form className="btn-div subs-form">
                  <div className="submaildiv">
                  <input type="email" name="subs-email" value={mail} onChange={(e)=>{setmail(e.target.value)}}  id="subs-email" placeholder='Enter Email Adress' isInvalid={emailError}/> 
                  {emailError && ( <div className="mailalert-txt">Please enter a valid email!</div>)}
                  </div>
                 
                  <button className="btn btn-fill btn-outline" onClick={GetData} type="button">Subscribe</button>
                </form>
            </div>
          </div>
        </div>
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