import React, { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const URL = './userRegister';




export default function RegisterForm() {
    const [id, setId] = useState('');
    const [name, setFirstname] = useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [password,setPassword]=useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpVerified,setOtpVerified]=useState(false);
    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact || !password  ) {
          alert('Please fill out all required fields.');
          return;
        }
        const method = "POST";
        try{      
            const data = {name,email,contact,password};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess,handleException);
        }catch(e){
        console.error(e);}
        } 

        const handleSuccess = (data) => {         
            console.log(data);
            alert("registered successfully");
            navigate('/Login');   
        }
    
        const handleException = (data) => {
            console.log(data);
        }
    
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
      
        const handleVerifyOtp = async () => {
          try {
              const response = await axios.post('http://localhost:3006/api/email/verify', {
                  email,
                  otp, // Make sure 'otp' and 'email' are the values you want to send
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
      <Container component="main" maxWidth="xs" sx={{marginLeft:'800px',height:'600px'}}>
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
          <b style={{color:'black'}}>Sign up</b>
        </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  value={name}
                  onChange={(e) => { setFirstname(e.target.value)}}
                  autoFocus
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
                    style: { color: 'black' ,bgcolor:'rgb(255,255,255,0.0)'}, // Change to the desired label color
                  }}
                />
              </Grid>
              <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          width: '100%',
        }}
      >
        <TextField
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          endIcon={<SendIcon/>}
          
          onClick={handleSendOtp}
          variant="outlined"
          loadingIndicator={
            <CircularProgress
              size={30} 
              borderRadius={15}// Match the icon size
              sx={{ color: 'white' }} // Customize the loading icon color
            />
          }
        >
          <span>Request</span>
        </LoadingButton>
      </Box>
    </Grid>
    {otpSent && 
     <Grid item>
     <Box
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         gap: 1,
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
   </Grid>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Phone number"
                  name="email"
                  autoComplete="email"
                  value={contact}
                  disabled={!otpVerified}
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
                  onChange={(e) => { setContact(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  disabled={!otpVerified}
                  autoComplete={false}
                  value={password}
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
                  onChange={(e) => { setPassword(e.target.value)}}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, mb: 2,
                background:"#226B80", 
                height:"50px",
                '&:hover': {
                   background: "#35B0AB", // Change to the desired hover color
                   color:"white"
                },
                
              }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Login" variant="body2" style={{ color: 'purple' }}>
                  <b style={{color:'blue'}}>Return To Login?</b>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </div>
  );
}