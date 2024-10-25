import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../../../api/axios';
import { useAuthContext } from '../../../../context/AuthContext';
import ApplicationStore from '../../../../utils/localStorageUtil';

const URL = './userRegister';

export default function UpdateProfile({ handleBack }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({});
    const [refreshData, setRefreshData] = useState(false);
    const empid = ApplicationStore().getStorage("empid");
    const method = "POST";

    useEffect(() => {   
        loadData();
    }, [refreshData]);

    const loadData = async () => {  
        try {
            const response = await axios.get('auth/getUserById', {
                headers: { 'Content-Type': 'application/json', "empid": empid },          
            }); 
            if (response.data.status === 401) {
                // Handle unauthorized access
            } else {
                setName(response.data.data[0].name);
                setContact(response.data.data[0].contact);
                setEmail(response.data.data[0].email);
            }
        } catch (err) {    
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        }    
    };

    const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
        try {
            const response = await axios.post(mainURL, data);
            return handleSuccess(response.data);  
        } catch (err) {
            if (!err?.response) {
                alert("No server response");                
            } else {                
                return handleException(err);
            }
        }                  
    };

    const handleSuccess = (data) => {         
        alert("Updated successfully");
    };
    
    const handleException = (data) => {
        alert("Failed to update profile");
        console.log(data);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? "" : "Name is required.";
        tempErrors.email = email ? "" : "Email is required.";
        tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "" : "Email is not valid.";
        tempErrors.contact = contact ? "" : "Contact number is required.";
        tempErrors.contact = /^[0-9]{10}$/.test(contact) ? "" : "Contact number is not valid.";

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            try {      
                const data = { name, email, contact };
                const mainURL = 'auth/updateUserByID';
                serviceMethod(mainURL, method, data, handleSuccess, handleException);
            } catch (e) {
                alert("Error occurred during update");
            }
        }
    };
   
    return (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1 className="heading1" style={{ color: 'white' }}>Personal Details</h1>
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
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
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
                      id="contact"
                      label="Phone number"
                      name="contact"
                      autoComplete="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      error={!!errors.contact}
                      helperText={errors.contact}
                    />
                  </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', mt: '-20px' }}>
            <p onClick={() => handleBack()} style={{ color: '#ADD8E6', marginTop: "14px" }}>Go back?</p>
          </Box>
        </>
      );
}
