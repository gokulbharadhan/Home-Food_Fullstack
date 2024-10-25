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
import Alert from '@mui/material/Alert';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Notification from '../Alert/Notification';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/login';


function Login() {


  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(0);
  const [message, setMessage] = useState("");
  const { Login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
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
            empDetails: dataResponse.data.empDetails
          };

          Login(userData);
         if (dataResponse.data.userRole == "admin") {
            navigate('/Dashboard');
          }else if (dataResponse.data.userRole == "cheff") {
              navigate('/Home');
            } 
            else if (dataResponse.data.userRole == "user") {
              navigate('/Home');
            } 
           else {
            navigate('');
          }
          setEmail('');
          setPassword('');
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
          <b style={{color:'black'}}>Login</b>
        </Typography>
       
       
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
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
              setUser(e.target.value)
            }}
            
            required
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
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          />
          {
            loading == 1 ? <Notification severity={"info"} message={"Loading...."} firstInfo={"Please wait"} secInfo={message} /> :
              loading == 2 ? <Notification severity={"success"} message={"Login success"} firstInfo={"Thank for waiting"} secInfo={message} /> :
                loading == 3 ? <Notification severity={"error"} message={"Login success"} firstInfo={"Sorry"} secInfo={message} /> : ""
          }
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
            onClick={handleSave}
                  
          >
            Sign In

          </Button>
          <Grid container>
            <Grid item xs>
            <h5>New User ? &nbsp;
                <Link href="RegisterForm" variant="body2" style={{ color: 'blue' }}>
                  <b style={{color:'blue'}}>Sign up here</b>
                </Link>
              </h5> 
              <Link href="ForgotPassword" variant="body2" style={{ color: 'blue' }}>
                <b  style={{color:'blue'}}>Forgot password?</b>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  );
};
export default Login;