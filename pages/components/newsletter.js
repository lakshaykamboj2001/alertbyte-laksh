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
    </div>
      
    </>
  )
}

export default Newsletter
