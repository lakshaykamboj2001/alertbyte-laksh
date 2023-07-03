import React,{useState} from 'react'


const Newsletter = () => {
  const [emailError, setEmailError] = useState(false);
  const [mail,setmail]=useState("")

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
    <div className="container">
      <div className="nl-mod-div border-div">
        <h1 className=''>Newsletter</h1>
        <p className='fw-light p-sz-tw'>Subscribe to our newsletter for AlertBytes development updates.</p>
        <div className="img-div">
         <img src="/global/subscribe-img.png" alt="" />
        </div>
        <div className="main-form-div">
        <form className="btn-div subs-form">
          <div className="subs-ip-section">
          <input className='main-ip' type="email" name="subs-email" value={mail} onChange={(e)=>{setmail(e.target.value)}}  id="subs-email" placeholder='Email Adress' isInvalid={emailError}/> 
          {emailError && ( <div className="mailalert-txt">Please enter a valid email!</div>)}
          </div>
        </form>
        <div>

        <button className="nl-sub-btn" onClick={GetData} type="button">Subscribe</button>
        </div>
        </div>

      </div>
    </div>
      
    </>
  )
}

export default Newsletter
