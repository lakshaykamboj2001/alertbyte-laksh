import Link from 'next/link';
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import StatusContext from '@/store/status-context';
import Moralis from "moralis";
import { useMoralis, useMoralisCloudFunction  } from "react-moralis";
import { useRouter } from 'next/router';

const TeleFlow = () => {
  const [error, success, setSuccess, setError] = useContext(StatusContext);
  const { user, setUserData, Moralis, refetchUserData } = useMoralis();
  const [currentStep, setCurrentStep] = useState(1);
  const [telegram, setTelegram] = useState("");
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const ipcode = code.join('');

  const router = useRouter();

  const codeLength = 6;
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  const handleCodeChange = (index, event) => {
    const value = event.target.value;
    const updatedCode = [...Array(codeLength)].map((_, i) =>
      i === index ? value : code[i] || ''
    );
    setCode(updatedCode);
    if (value !== '') {
      if (index < codeLength - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData('text/plain');
    const pasteValues = pasteData.split('').slice(0, 6);
    const updatedCode = [...code];
    pasteValues.forEach((value, index) => {
      if (inputRefs.current[index]) {
        updatedCode[index] = value;
      }
    });
    setCode(updatedCode);
  };
   


// =========================
const randomString = () => Math.random().toString(36).substr(2, 9);

const useStateWithCallbackLazy = (initialValue) => {
  const callbackRef = useRef(null);
  const [state, setState] = useState({
    value: initialValue,
    revision: randomString(),
  });

  
  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state.value);

      callbackRef.current = null;   
    }
  }, [state.revision, state.value]);

  const setValueWithCallback = useCallback((newValue, callback) => {
    callbackRef.current = callback;

    return setState({
      value: newValue,
      // Note: even if newValue is same as the previous value, this random string will re-trigger useEffect()
      // This is intentional
      revision: randomString(),
    });
  }, []);

  return [state.value, setValueWithCallback];
};

const [OTP, setOTP] = useState("");
const [tempchatid, settempchatid] = useStateWithCallbackLazy(0);
const [EnteredOTP, setEnteredOTP] = useState(null);

const generateOTP = (length) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characterCount = characters.length;
  let OTPvalue = "";
  for (let i = 0; i < length; i++) {
    OTPvalue += characters[Math.floor(Math.random() * characterCount)];
  }
  setOTP(OTPvalue);
  return OTPvalue;
};


const Verifytelegram = async () => {
  await fetch(
    "https://api.telegram.org/bot5364673291:AAG-0SnlHvx4ozL5d2APGvTYpQ9-gi-3W-I/getUpdates"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.result);
      // handleSave();
       
      let telegramiddata = data.result.filter(
        (messageBlock) =>
          // if (messageBlock.message.chat.username) {
          messageBlock.message.chat.username === telegram
        // }
      );
      console.log(JSON.stringify(telegramiddata), "tele");

      if (telegramiddata.length === 0) {
        alert("Your Telegram Username is Not verified");
      } else {
        settempchatid(telegramiddata[0].message.chat.id, () => {
          VerifyTeleOTP(telegramiddata[0].message.chat.id);
        });
      }
       // setCurrentStep(currentStep + 1);
      if(currentStep === 2){
       setCurrentStep(currentStep + 1);
      }
     
    })
    .catch((error) => {
      // Show the error message somewhere
      alert("Error: " + error.code + " " + error.message);
    });
};


const VerifyTeleOTP = async (_chat_id_) => {
  const telegram_bot_id = "5364673291:AAG-0SnlHvx4ozL5d2APGvTYpQ9-gi-3W-I";
  let message =
    "Note: " +
    "This Message is for your Telegram Verification with AlertBytes." +
    "\n\n" +
    generateOTP(6) +
    "\n\n" +
    "Please Don't share your OTP!";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify({ chat_id: _chat_id_ * 1, text: message }),
  };
  fetch(
    "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
    requestOptions
  )
    .then((data) => {
      console.log(_chat_id_ + "and" + OTP);

      // setshowOTPInput(true);
      if(currentStep === 3){
        setSuccess((prevState) => ({
          ...prevState,
          title: "Verification OTP resent",
          message:
            "An OTP is resent to your registered Telegram . Please check your Telegram",
          showSuccessBox: true,
        }));
      } else{

        setSuccess((prevState) => ({
          ...prevState,
          title: "Verification OTP sent",
          message:
            "An OTP is sent to your registered Telegram . Please verify your username.",
          showSuccessBox: true,
        }));
      }

    })
    .catch((error) => {
      alert("Error: " + error.code + " " + error.message);
    });
};




const handleSave = async (needid) => {  
  // setshowOTPInput(false);

  // setEnteredOTP();

  setCode(['', '', '', '', '', '']);
  let chatid = needid.toString();


  setUserData({
    telegram: telegram === "" ? undefined : telegram,
    chat_id: chatid === "" ? undefined : chatid,
  });
  setSuccess((prevState) => ({
    ...prevState,
    title: "Profile updated",
    message: "Your profile was updated successfully!",
    showSuccessBox: true,
  }));



  await refetchUserData(); 
};


const televerifiedsuccess = async (_chat_id_) => {
  const telegram_bot_id = "5364673291:AAG-0SnlHvx4ozL5d2APGvTYpQ9-gi-3W-I";
  let successmessage =
    "Note: " +
    "Your Telegram Verification with AlertBytes is Successfully complted and you are logged in !" +
    "\n\n" +
    "From Now on you will be able to recieve updates about your wallet on that same Bot !";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify({ chat_id: _chat_id_ * 1, text: successmessage }),
  };
  fetch(
    "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
    requestOptions
  )
    .then((data) => {
      console.log("telegram verified sent !");
    })
    .catch((error) => {
      alert("Error: " + error.code + " " + error.message);
    });
};



const OTPCHECKS = () => {
  if (ipcode === OTP) {
    handleSave(tempchatid);
    televerifiedsuccess(tempchatid);
    router.push('/dashboard'); 
  } else {
    alert("Error: OTP NOT VERIFIED");
  }
};


// =========================


  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const tflow = () => {
    return (
      <>
       <div className="main-teleflow-div">
       <div className="main-step-div">
        <div className="line">
          <div className={`point ${currentStep >= 1 ? 'completed' : ''}`}> </div>
          <span></span>
          <div className={`point ${currentStep >= 2 ? 'completed' : ''}`}></div>
          <span></span>
          <div className={`point ${currentStep >= 3 ? 'completed' : ''}`}></div>
        </div>
        
        <div className="step-label">
          <p className={`step-text ${currentStep >= 1 ? 'completed' : ''}`}>Step 1</p>
          <p className={`step-text ${currentStep >= 2 ? 'completed' : ''}`}>Step 2</p>
          <p className={`step-text ${currentStep >= 3 ? 'completed' : ''}`}>Step 3</p>
        </div>

      </div>

        {currentStep === 1 && (
          <div className="second-teleflow">
           <p className='teleflow-fs'>Send a massage to our telegram bot</p> 
           <Link className='teleflow-fs link-text text-underline'  href={`https://telegram.me/alertbytes_bot`}
                target="_blank"
                rel="noopener noreferrer">telegram/message</Link>
           <div className="btn-div lg-butns align-lg-butns">
            
            <button className='btn btn-fill' onClick={handleNext}>I Have Done The Above</button>
           </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="">
            <input type="text" value={telegram} placeholder="Enter Username" onChange={(e)=>{setTelegram(e.target.value)}}/>
            <div className="btn-div lg-butns align-lg-butns">
             <button className='btn btn-fill' onClick={Verifytelegram}>Next</button>
            </div>
            {/* <button onClick={handlePrevious}>previous</button> */}
          </div>
        )}
        {currentStep === 3 && (
           <div className="">
           <p className='teleflow-fs'>Enter The Verification Code<span className='d-block'>Send To Your Telegram Account</span></p>
           <div className="code-input-div">
             {code.map((value, index) => (
               <input
                 key={index}
                 type="text"
                 maxLength={1}
                 value={value}
                 onChange={(event) => handleCodeChange(index, event)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
               />
             ))}
           </div>
           <div className="btn-div lg-butns align-lg-butns">
             <button className='btn btn-fill' onClick={OTPCHECKS}>Verify</button>
           </div>
           <div className="resend-div">
             <span >Didn't Receive The Code?</span>
             <span className='link-text text-underline d-block' onClick={Verifytelegram}>Resend code</span>
           </div>
           {/* <button onClick={handlePrevious}>previous</button> */}
         </div>
        )}
       </div>
      </>
    );
  };
  return <>{tflow()}</>;
};

export default TeleFlow;