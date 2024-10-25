import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import ApplicationStore from '../../../utils/localStorageUtil';
import ForgotDialogue from './ForgotDialogue';
const URL = './email';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [dataList,setDataList]=useState([]);
  const [emailExist,setEmailExist]=useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpVerified,setOtpVerified]=useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3006/api/email/register', {
        email,
      });
      setOtpSent(true);
      setLoading(false);
      alert("OTP sent successfully");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
};
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const mainUrl=URL+"/"+email+"/forgot";
      const response = await axios.get(mainUrl);
      if (response.data.status === 401) {
          setDataList([]);
          handleException(response.data.data);
      } else {
        setEmailExist(true);
          setDataList(response.data.data);
          handleSuccess(response.data.data);
          
      }
  } catch (err) {
      if (!err?.response) {
          console.log("No server response");
      } else {
          console.log(err?.response.data);
      }


    
  } 
    
  }
  const handleSuccess = (data) => {
    handleSendOtp();          
}
const handleVerifyOtp = async () => {
  try {
    alert(otp);
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

const handleException = (data) => {
    alert(data);
}
  return (
    <div style={{
      backgroundImage: 'url(/food4.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#98d4d2',
      borderRadius: '8px',
      padding: '30px',
      border: '1px solid black',
    }}>
    <Container component="main" maxWidth="xs"  sx={{marginLeft:'800px',height:'600px'}}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#226B80' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          <b style={{color:'black'}}>Forgot Password?</b>
        </Typography>
        <Grid container style={{ padding:'25px' }} justifyContent="center">
          <Grid item xs>
          <h5>Please enter the email address associated with your account and We will email you a link to reset your password.</h5>
          </Grid>
        </Grid>

        <Box component="form"  sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            sx={{
              '& .MuiInputLabel-root': { color: '#226B80' }, // Label color
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#226B80' }, // Default border color
                '&:hover fieldset': { borderColor: 'black' }, // Hover border color
                '&.Mui-focused fieldset': { borderColor: '#226B80' }, // Focused border color
                '& input': { color: 'black' } // Text color
              }
            }}
            InputLabelProps={{
              style: { color: 'black',bgcolor:'rgb(255,255,255,0.0)' }, // Change to the desired label color
            }}
            required
          />

<LoadingButton
          loading={loading}
          fullWidth
          
          sx={{
            height: '55px',
            background:"#226B80",
            color:"white", 
            fontSize: '12px', // Reduce text size
            '& .MuiButton-endIcon': {
              '& svg': {
                fontSize: '16px', // Reduce icon size
              },
            },
          '&:hover': {
                   background: "#35B0AB", // Change to the desired hover color
                   color:"white"
                },
          }}
          endIcon={<SendIcon/>}
          
          onClick={handleSave}
          variant="outlined"
          loadingIndicator={
            <CircularProgress
              size={30} 
              borderRadius={15}
              sx={{ color: 'white' }}
            />
          }
        >
          <span>Request</span>
        </LoadingButton>
        {otpSent &&  <Grid item xs={12}>
     <Box
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         gap: 1,
         mt:'20px',
         width: '100%',
       }}
     >
       <TextField
         required
         id="otp"
         label="otp"
         
         name="otp"
         value={otp}
         onChange={(e) => setOtp(e.target.value)}
         sx={{
           flexGrow: 1,
           minWidth: '200px',
           '& .MuiInputLabel-root': { color: '#226B80' },
           '& .MuiOutlinedInput-root': {
             '& fieldset': { borderColor: '#226B80' },
             '&:hover fieldset': { borderColor: 'black' },
             '&.Mui-focused fieldset': { borderColor: '#226B80' },
             '& input': { color: 'black' },
           },
         }}
         InputLabelProps={{
           style: { color: 'black', bgcolor: 'rgba(255,255,255,0.0)' },
         }}
       />
       <LoadingButton
         loading={loading}
         
         
         sx={{
           height: '55px',
           width: '85px',
           flexShrink: 0,
           whiteSpace: '2',
           background:"#226B80",
           color:"white", 
           fontSize: '12px', // Reduce text size
           '& .MuiButton-endIcon': {
             '& svg': {
               fontSize: '16px', // Reduce icon size
             },
           },
         '&:hover': {
                  background: "#35B0AB", // Change to the desired hover color
                  color:"white"
               },
         }}
         
         onClick={handleVerifyOtp}
         variant="outlined"
         loadingIndicator={
           <CircularProgress
             size={30} 
             borderRadius={15}// Match the icon size
             sx={{ color: 'white' }} // Customize the loading icon color
           />
         }
       >
         <span>Verify</span>
       </LoadingButton>
     </Box>
   </Grid>
          }
          <Grid container>            
            <Grid item xs>
              <Link href="login" variant="body2" style={{ color: 'purple' }}>
                <b style={{color:'blue'}}>Return To Sign Up?</b>
              </Link>
            </Grid>
          </Grid>
        </Box>
        <ForgotDialogue
        setOpen={setOtpVerified}
        open={otpVerified}
        email={email}
        />
      </Box>
    </Container>
    </div>
  );
};
export default ForgotPassword;