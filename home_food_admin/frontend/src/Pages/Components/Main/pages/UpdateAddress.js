import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from '../../../../api/axios';

export default function UpdateAddress({ handleGoBack, refreshData, data }) {
  const [id, setId] = useState(data?.id || '');
  const [title, setTitle] = useState(data?.title || '');
  const [country, setCountry] = useState(data?.country || '');
  const [state, setState] = useState(data?.state || '');
  const [city, setCity] = useState(data?.city || '');
  const [street, setStreet] = useState(data?.street || '');
  const [pin, setPin] = useState(data?.pin || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.title = title ? "" : "Title is required.";
    temp.country = country ? "" : "Country is required.";
    temp.state = state ? "" : "State is required.";
    temp.city = city ? "" : "City is required.";
    temp.street = street ? "" : "Street is required.";
    temp.pin = pin.toString().length === 6 ? "" : "PIN must be a 6-digit number.";
    
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
        return handleException(err);
      }
    }
  };

  const serviceMethodforDelete = async (mainURL, handleSuccess, handleException) => {
    try {
      const response = await axios.delete(mainURL);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSubmit = () => {
    setCountry("India");
    setState("Karnataka");
    setCity("Mangalore");
    if (validate()) {
     
      const method = "POST";
      try {
        const data = { title, country, state, city, street, pin };
        const mainURL = `./address/${id}/update`;
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleDelete = () => {
    const mainURL = `./address/${id}/delete`;
    serviceMethodforDelete(mainURL, handleSuccessForDelete, handleException);
  };

  const handleSuccessForDelete = () => {
    refreshData();
    alert("Address successfully deleted");
    handleGoBack();
  };

  const handleSuccess = () => {
    refreshData();
    alert("Address successfully updated");
    handleGoBack();
  };

  const handleException = (data) => {
    alert(data);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '550px',
        }}
      >
        <h1 className="heading1" style={{ fontSize: '30px', color: 'white' }}>Update Address</h1>
        <Box component="form" noValidate sx={{ mt: '10px' }}>
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
                type="text"
                id="street"
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
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                error={!!errors.pin}
                helperText={errors.pin}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            mt: '20px',
          }}
        >
          <p onClick={handleGoBack} style={{ color: '#ADD8E6' }}>Go back?</p>
        </Box>
      </Box>
    </>
  );
}
