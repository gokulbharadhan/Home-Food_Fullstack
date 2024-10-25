import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ForgotPassword from './ForgotPassword';
import axios from '../../../../api/axios';
import { useAuthContext } from '../../../../context/AuthContext';
import ApplicationStore from '../../../../utils/localStorageUtil';
const URL = './userRegister';
const LOGIN_URL = './auth/changePassword';
export default function Security({handleBack} ) {
    const [password,setPassword]=useState('');
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    
    const [forgotPassword,setFrogotPassword]=useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const empid = ApplicationStore().getStorage("empid");
    const method = "POST";
    useEffect(() => {   
        loadData();
      },[]);
      const loadData = async () => {  
          try{
                const response = await axios.get('auth/getUserById',{
                  headers: {'Content-Type':'application/json', "empid":empid },          
               }); 
                  if(response.data.status == 401){    
                  }else{
                    setPassword(response.data.data[0].password);
                    setName(response.data.data[0].name);
                    setEmail(response.data.data[0].email);
                  }
                
            }catch(err){    
              if(!err?.response){
                  console.log("No server response");
              }else{
                    console.log(err?.response.data);
              }
          }    
     };
     const HandleBackForgot=()=>{
      setFrogotPassword(false);
     }
const handleSubmit=async(e)=>{
    e.preventDefault();
    if(oldPassword!=password){
      alert("old password is wrong");
    }else if(newPassword!=confirmPassword){
      alert("Confirm password is not matching with new password");
    }else{
      try{
        const data = {username:name,email:email,newPassword,oldPassword,confirmPassword:confirmPassword};  
        

        const response = await axios.post( LOGIN_URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){     
        setConfirmPassword('');
        setNewPassword('');
        setOldPassword('');
           alert("Password Updated Successfully");
       }      
     
    }catch(err){
        if(!err?.response){
          setConfirmPassword('');
          setNewPassword('');
          setOldPassword('');
          console.log("No server response");
        }else{  
          setConfirmPassword('');
          setNewPassword('');
          setOldPassword('');      
          console.log(err?.response.data);
        
          alert("Something Went Wrong");
           
        }      
      }     
    }
   
}
   
    return (
        <>
       {!forgotPassword &&<Box>
       <Box
            sx={{
            
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* ... Avatar, Typography, and other elements ... */}
            <h1 className="heading1" style={{color:'white'}} >Change Password</h1>
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    InputProps={{
                      sx: {
                        color: 'white', // Text color
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: 'white', // Label color
                      },
                    }}
                    required
                    fullWidth
                    id="oldpassword"
                    label="Old Password"
                    name="password"
                    autoComplete="password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                     InputProps={{
                      sx: {
                        color: 'white', // Text color
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: 'white', // Label color
                      },
                    }}
                      required
                      fullWidth
                      id="new"
                      label="New password"
                      name="new"
                      autoComplete="new"
                      value={newPassword}
                      type='password'
                      
                      onChange={(e) => { setNewPassword(e.target.value)}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                     InputProps={{
                      sx: {
                        color: 'white', // Text color
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: 'white', // Label color
                      },
                    }}
                      required
                      fullWidth
                      id="confrim"
                      label="Confirm password"
                      name="confrim"
                      autoComplete="confrim"
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value)}}
                    />
                  </Grid>
                 
              </Grid>
              <p onClick={()=>setFrogotPassword(true)} style={{color:'#ADD8E6'}}>Forgot password</p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{  mb: 2 }}
              >
                Change
              </Button>
            </Box>
          </Box>
          <Box    sx={{
            
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width:'100%',
            mt:'-20px'
          }}>

    <p onClick={()=>handleBack()} style={{color:'#ADD8E6',marginTop:"14px"}}>Go back?</p>
          </Box>
          </Box>}
          {forgotPassword &&
          <ForgotPassword
          email={email}
          
          send={forgotPassword}
          handleBack={HandleBackForgot}
          />
          
          }
      
      
        </>
      );
}
