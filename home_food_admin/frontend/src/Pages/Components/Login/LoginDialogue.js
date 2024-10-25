import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid, Menu } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import ForgotDialogue from './ForgotDialogue';
import { useAuthContext } from '../../../context/AuthContext';
import axios from "../../../api/axios";
import ApplicationStore from "../../../utils/localStorageUtil";
import LoadingButton from '@mui/lab/LoadingButton';
import './AuthForm.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = './auth/login';

const LoginDialogue = ({ open=true, setOpen, rowData, setRefreshData}) => {
   
  const [timeLeft, setTimeLeft] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [name, setName] = useState('');
  const [otpSent,setOtpSent]=useState(false);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [otp, setOtp] = useState('');
  const [forgotPassword,setForgotPassword]=useState(false);
  const [message, setMessage] = useState("");
  const [changePassword,setChangePassword]=useState(false);
  const { Login } = useAuthContext();
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    let timerId;

    if (timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
    }

    return () => clearTimeout(timerId);
  }, [timeLeft]);
 

  const handleClick = () => {
    if (!isDisabled) {
      setTimeLeft(60); 
      setIsDisabled(true);
    }
    handleSendOtp();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(1);
    setMessage("Loading ...")
    try {
      const data = { email, password };
      const response = await axios.post(LOGIN_URL, data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const dataResponse = response.data;

      var i = 0;
      function myTimer() {
        console.log("hello " + i);
        i++;
        if (i == 2 && dataResponse.success === 1) {
          setLoading(2);
          setEmail('');
          setPassword('');
          setMessage("Login successfull");
        }

        if (i == 4 && dataResponse.success === 1) {
          clearInterval(intervalId);

          const userData = {
            userToken: dataResponse.data.userToken,
            userRole: dataResponse.data.userRole,
            email: dataResponse.data.email,
            // companyCode: dataResponse.data.userCompany,
            empid: dataResponse.data.empid,
            empDetails: dataResponse.data.empDetails,
            username:dataResponse.data.username
          };
          setEmail('');
          setPassword('');
          Login(userData);
          const store = ApplicationStore();
          store.setStorage('userId', dataResponse.data.empid);
         if (dataResponse.data.userRole == "admin") {
            navigate('/Dashboard');
            
          }else if (dataResponse.data.userRole == "cheff") {
              navigate('/CustHome');
            } 
            else if (dataResponse.data.userRole == "user") {
              navigate('/CustHome');
            } 
           else {
            navigate('');
          }
          
        }
      }

      var intervalId = setInterval(myTimer, 1000);

    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
        var i = 0;
        var intervalId;

        function myCatchTimer() {
          console.log("catch timer " + i);
          i++;
          if (i == 3) {
            clearInterval(intervalId);
            setMessage("Something Went Wrong!");
            setLoading(3);

            // Add any additional error handling logic here.
          }
        }
        intervalId = setInterval(myCatchTimer, 1000);
      }
    }
  }
  const handleSendOtp = async () => {
  // if (!name || !email || !contact || !password  ) {
  //   alert('Please fill out all required fields.');
  //   return;
  // }
    try {
      
      const response = await axios.post('http://localhost:3006/api/email/register', {
        email,
      });
      setOtpSent(true);
      setLoading1(false);
      // setIsRightPanelActive(false);
      alert("OTP sent successfully");
    } catch (error) {
      setLoading1(false);
      setEmail('');
      alert(error);
    }
};
const handleVerifyOtp = async () => {
  try {
      const response = await axios.post('http://localhost:3006/api/email/verify', {
          email,
          otp, // Make sure 'otp' and 'email' are the values you want to send
      });
      if (response.status === 200) {
        setOtp('');
        handleRegister();
          alert("Email verified successfully");
      } else {
        setOtp('');
          alert(response.data.message);
      }
  } catch (error) {
    setOtp('');
      alert(error.response.data || 'OTP verification failed!');
  }
};

const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
  try{
      const response = await axios.post(mainURL,data);
      return handleSuccess(response.data);  
  }catch(err){
      if(!err?.response){
          alert("No server response");                
      }else{                
          return handleException(err.response.data);
      }
  }                  
};

const handleRegister = () => {
  if(forgotPassword){
    setOtp('');
    setOtpSent(false);
    setForgotPassword(false);
    setChangePassword(true);
  }else{
    const method = "POST";
    try{
      const URL = './userRegister';   
        const data = {name,email,contact,password};
        const mainURL = URL+'/add';
        serviceMethod(mainURL,method,data, handleSuccess,handleException);
    }catch(e){
    console.error(e);}
    } 
  }
  

  const handleSuccess = (data) => {         
      console.log(data);
      setEmail('');
      setEmail('');
      setContact('');
      setPassword('');
      setName('');
      setOtpSent(false);
      alert("registered successfully");
      
  }

  const handleException = (error) => {
    setEmail('');
    setContact('');
    setPassword('');
    setName('');
    setOtpSent(false);

    // Check for a message in data or a general message
    let errorMessage = "An unexpected error occurred.";
    if (error.data && typeof error.data === 'object') {
        if (error.data.message) {
            errorMessage = error.data.message;
        } else if (Object.keys(error.data).length > 0) {
            errorMessage = JSON.stringify(error.data);
        }
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
    
    alert(errorMessage);
};

const emailCheck = async (e) => {
  e.preventDefault();
  try {
    const URL = './email';
    const mainUrl = `${URL}/${email}/forgot`;
    const response = await axios.get(mainUrl);
    
    
    if (response.data.status === 401) {
      handleEmail(false); // Pass false for non-existent email
    } else {
      handleEmail(true);  // Pass true for existing email
    }
  } catch (err) {
     // Treat errors as non-existent email
    if (!err?.response) {
      alert("No server response");
    } else {
      handleEmail(false); 
    }
  }
};

const handleEmail = (emailExists) => {
  if (emailExists && !forgotPassword) {
    alert("Email already exists");
  } else if (!emailExists && !forgotPassword) {
    alert("hellow")
    setLoading1(true);
    handleSendOtp();
  } else if (emailExists && forgotPassword) {
    alert("saddi")
    setLoading1(true);
    handleSendOtp();
  } else {
    setEmail('');
    alert("Email doesn't exist");
  }
};





  const handleSignUpClick = () => {
    setForgotPassword(false);
    setOtpSent(false);
    setOtp('');
    setEmail('');
    setPassword('');
    setLoading1(false);
    setLoading(false);
   
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setForgotPassword(false);
    setOtpSent(false);
    setEmail('');
    setOtp('');
    setLoading1(false);
    setLoading(false);
    setPassword('');
    setIsRightPanelActive(false);
  };


    return (
        <Dialog
            
            maxWidth = ""
            sx = {{'& .MuiDialog-paper':{width: '30%', maxHeight: '100%' }}
            }
            open={open}
        >

          
            <DialogTitle>
               Change the passsword
            </DialogTitle>   
            <form style={{width:'400px',height:'400px'}}> 
            <DialogContent>    
            <div className={`containers ${isRightPanelActive ? 'right-panel-active' : ''}`} id="containers">
 
      <div className="form-containers sign-up-containers">
      
      {!otpSent && !forgotPassword && (

    <> <form action="#" className="forms" onSubmit={emailCheck}>
  
      <h1 className="heading1">Create Account</h1>
      {/* <div className="social-container">
        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
      </div> */}
      <span className="span1">Use your email for registration</span>
      <input type="text" placeholder="Name" className="inputs" required value={name}  onChange={(e)=>setName(e.target.value)} />
      <input type="email" placeholder="Email" className="inputs"required value={email}  onChange={(e)=>setEmail(e.target.value)} />
      <input type="number" placeholder="Contact" className="inputs" required value={contact} onChange={(e)=>setContact(e.target.value)} />
      <input type="password" placeholder="Password" className="inputs" required value={password} onChange={(e)=>setPassword(e.target.value)} />
      <LoadingButton
  className="buttons"
  type="submit"
  loading={loading1} // This should be a state variable that tracks the loading state
  loadingPosition="center" // Position the loader in the center of the button
  loadingIndicator={
    <CircularProgress
      size={16}
      sx={{ color: '#FFFFFF' }} // Customize the loading spinner color
    />
  }
  sx={{
    borderRadius: '20px',
    border: '1px solid #FF4B2B',
    backgroundColor: '#FF4B2B',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '12px 45px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'transform 80ms ease-in',
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&:hover':{
        color:'#FF4B2B'
    },
    '&:focus': {
      outline: 'none',
    },
  }}
  // startIcon={loading ? <CircularProgress size={16} sx={{ color: '#FFFFFF' }} /> : null} // Disable the button while loading
>
  Sign Up
</LoadingButton>
</form>
    </>
  )}
   {otpSent && !forgotPassword &&(

<> <form action="#" className="forms" onSubmit={handleVerifyOtp}>
      <h1 className="heading1">Otp has been sent in your gmail</h1>
      <span className="span1">Enter the otp</span>
      <input type="number" placeholder="Otp" className="inputs" value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
      <a
        href="#"
        onClick={handleClick}
        style={{
          pointerEvents: isDisabled ? 'none' : 'auto',
          color: isDisabled ? 'gray' : '#696969',
          textDecoration: 'none',
          cursor: isDisabled ? 'default' : 'pointer'
        }}
      >
        {timeLeft > 0 ? `Resend the otp in ${timeLeft} seconds` : 'Resend?'}
      </a>
      <button className="buttons" type='submit'>Verify</button>
      </form>
    </>
  )}


      </div>
      <div className="form-containers sign-in-containers">
       {!forgotPassword && (
        <>
        <form action="#" className='forms'  onSubmit={handleSave}>
          <h1 className='heading1'>Sign in</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          <span className='span1'>use your account</span>
          <input type="email" placeholder="Email" className='inputs' value={email}  onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" className='inputs' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <a className="alink"href="#" onClick={(e)=>{
            e.preventDefault();
            setForgotPassword(true)
            setEmail('')}}>Forgot your password?</a>
          <LoadingButton
       
        loading={loading === 1}
          type='submit' 
        sx={{
          borderRadius: '20px',
          border: '1px solid #FF4B2B',
          backgroundColor: '#FF4B2B',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '12px 45px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          transition: 'transform 80ms ease-in',
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&:hover':{
              color:'#FF4B2B'
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        loadingIndicator={
          <CircularProgress
            size={16}
            sx={{ color: '#FFFFFF' }} // Customize the loading spinner color
          />
        }
      >
        {loading === 2
          ? 'Login Success'
          : loading === 3
          ? 'Login Failed'
          : 'Sign In'}
      </LoadingButton>
          
          
        </form>
        </>
       )} 
       {forgotPassword && (
        <>
        <form action="#" className='forms' >
          <h1 className='heading1'>Forgot password?</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          <span className='span1'>Enter your gmail</span>
          <input type="email" placeholder="Email" className='inputs' value={email}  onChange={(e) => setEmail(e.target.value)} required/>
          {otpSent && (<><input type="number" placeholder="Otp" className="inputs" value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
          
          <a
        href="#"
        onClick={handleClick}
        style={{
          pointerEvents: isDisabled ? 'none' : 'auto',
          color: isDisabled ? 'gray' : '#696969',
          textDecoration: 'none',
          cursor: isDisabled ? 'default' : 'pointer'
        }}
      >
        {timeLeft > 0 ? `Resend the otp in ${timeLeft} seconds` : 'Resend?'}
      </a> 
          
          </>)}
          
          <a className="alink"href="#"  onClick={(e) => {
    e.preventDefault(); // Prevent the default action of the anchor link
    setForgotPassword(false);
    setOtpSent(false);
    setEmail('');
  }}>back to login?</a>
          {!otpSent && (<LoadingButton
       
        loading={loading1}
          onClick={emailCheck} 
        sx={{
          borderRadius: '20px',
          border: '1px solid #FF4B2B',
          backgroundColor: '#FF4B2B',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold',
          padding: '12px 45px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          transition: 'transform 80ms ease-in',
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&:hover':{
              color:'#FF4B2B'
          },
          '&:focus': {
            outline: 'none',
          },
        }}
        loadingIndicator={
          <CircularProgress
            size={16}
            sx={{ color: '#FFFFFF' }} // Customize the loading spinner color
          />
        }
      >
        Request
      </LoadingButton>)}
      
      {otpSent && (<button className="buttons" onClick={handleVerifyOtp}>Verify</button>)}
 
      </form>
      
      
          
        
     
        </>
           
       )} 
      
      </div>
   
      <div className="overlay-containers">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className='heading1'>Welcome Back!</h1>
            <p className='paragraph'>To keep connected with us please login with your personal info</p>
            <button className="ghost buttons" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className='heading1'>Hello, Friend!</h1>
            <p className='paragraph'>Enter your personal details and start your journey with us</p>
            <button className="ghost buttons" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
      <ForgotDialogue
        setOpen={setChangePassword}
        open={changePassword}
        email={email}
        />
       
    </div>
    </DialogContent>  
    </form>       
    </Dialog>
    );
}

export default LoginDialogue;