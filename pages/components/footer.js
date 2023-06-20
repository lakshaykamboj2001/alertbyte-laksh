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
      let result = await fetch('/mailersend/subscribe.php', {
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
        <div className="clr-bg ib-proof foot-subscribe">
          <div className="row">
            <div className="col-lg-6">
              <div className="img-div">
                <img src="/images/footer-icn/newsletter.svg" alt="" />
              </div>
              <div className="row-text">
                <h3 className='sub-head'>Subscribe To Our Newsletter</h3>
                <p>Don’t fall behind. Stay current with the latest updates and developments from our experienced professional team on all the topics within the Web3 space. Pace ahead and bid farewell to all the fears of losing your funds to hackers with our services.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="btn-div subs-form">
                  <div className="submaildiv">
                  <input type="email" name="subs-email" value={mail} onChange={(e)=>{setmail(e.target.value)}}  id="subs-email" placeholder='E-mail' isInvalid={emailError}/> 
                  {emailError && ( <div className="mailalert-txt">Please enter a valid email!</div>)}
                  </div>
                 
                  <button className="btn btn-fill btn-outline" onClick={GetData} type="button">Subscribe</button>
                </form>
            </div>
          </div>
        </div>
        <div className="main-foot">
          <div className="foot-links">
            <ul>
              <li>Blogs</li>
              <li>Docs</li>
              <li>Pricing</li>
              <li>Support</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
            </ul>
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