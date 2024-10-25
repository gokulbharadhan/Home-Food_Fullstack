import React, { useState } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import axios from '../../../../api/axios';
import ApplicationStore from '../../../../utils/localStorageUtil';

export default function AddAddress({ handleGoBack, refreshData }) {
  const empid = ApplicationStore().getStorage("empid");
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.title = title ? "" : "Title is required.";
    temp.country = country ? "" : "Country is required.";
    temp.state = state ? "" : "State is required.";
    temp.city = city ? "" : "City is required.";
    temp.street = street ? "" : "Street is required.";
    temp.pin = pin.length === 6 ? "" : "PIN must be a 6-digit number.";
    
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  };

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    setCountry("India");
    setState("Karnataka");
    setCity("Mangalore");
    e.preventDefault();
    
    if (validate()) {
      const method = "POST";
      const data = { title, country, state, city, street, pin, userid: empid };
      const mainURL = `./address/add`;
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }
  };

  const handleSuccess = (data) => {
    setTitle('');
    setState('');
    setCountry('');
    setCity('');
    setStreet('');
    setPin('');
    refreshData();
    alert("Address successfully added");
  };

  const handleException = (data) => {
    alert(data);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        <h1 className="heading1" style={{ fontSize: '30px', color: 'white' }}>Add Address</h1>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="family-name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                value="India"
                error={!!errors.country}
                helperText={errors.country}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value="Karnataka"
                error={!!errors.state}
                helperText={errors.state}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value="Mangalore"
                error={!!errors.city}
                helperText={errors.city}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                name="street"
                label="Street"
                type="street"
                id="street"
                autoComplete=""
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ sx: { color: 'white' } }}
                InputLabelProps={{ sx: { color: 'white' } }}
                required
                fullWidth
                name="pin"
                label="PIN"
                type="number"
                id="pin"
                autoComplete=""
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                error={!!errors.pin}
                helperText={errors.pin}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sm={6} sx={{ mt: 3, mb: 2 }}>
            ADD
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <p onClick={handleGoBack} style={{ color: '#ADD8E6' }}>Go back?</p>
      </Box>
    </>
  );
}
