import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from '../../../../api/axios';
import ForgotDialogue from '../../Login/ForgotDialogue';

function ForgotPassword({ email, send,handleBack}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [datas,setDatas]=useState('');

  // Ref to track whether OTP has already been sent
  const otpSentRef = useRef(false);

  useEffect(() => {
    if (send && !otpSentRef.current) {
      handleSendOtp();
      otpSentRef.current = true; // Mark that OTP has been sent
    }
  }, [send]);

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

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3006/api/email/register', {
        email,
      });
      setOtpSent(true);
      setLoading(false);
      alert("OTP sent successfully");
      setDatas('auth');
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3006/api/email/verify', {
        email,
        otp,
      });
      if (response.status === 200) {
        setOtpSent(false);
        setOtpVerified(true);
        alert("Email verified successfully");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data || 'OTP verification failed!');
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      setTimeLeft(60);
      setIsDisabled(true);
    }
    handleSendOtp();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 className="heading1" style={{ color: 'white' }}>Change Password</h1>
      <p style={{color:'black',marginTop:'10px'}}>OTP has been sent to your registered email {email}</p>
      <Box noValidate  sx={{  width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                sx: {
                  color: 'white',
                },
              }}
              InputLabelProps={{
                sx: {
                  color: 'white',
                },
              }}
              required
              fullWidth
              id="OTP"
              label="OTP"
              name="OTP"
              autoComplete="OTP"
              type="number"
              value={otp}
              onChange={(e)=>{setOtp(e.target.value)}}
            />
          </Grid>
        </Grid>
        <p onClick={()=>handleBack()} style={{color:'#ADD8E6',marginBottom:'-2px'}}>Go back?</p>
        <a
          onClick={handleClick}
          style={{
            marginBottom:'10px',
            pointerEvents: isDisabled ? 'none' : 'auto',
            color: isDisabled ? 'gray' : '#696969',
            textDecoration: 'none',
            cursor: isDisabled ? 'default' : 'pointer',
          }}
        >
          {timeLeft > 0 ? `Resend the OTP in ${timeLeft} seconds` : 'Resend?'}
        </a>
        <Button
          onClick={handleVerifyOtp}
          fullWidth
          variant="contained"
          sx={{ mt:'10px'}}
        >
          Varify OTP
        </Button>
      </Box>
      <ForgotDialogue
        setOpen={setOtpVerified}
        open={otpVerified}
        email={email}
        handleBack={handleBack}
        datas={datas}
      />
    </Box>
  );
}

export default ForgotPassword;
