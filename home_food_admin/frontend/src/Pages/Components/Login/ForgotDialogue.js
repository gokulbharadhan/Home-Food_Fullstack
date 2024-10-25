import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
import ApplicationStore from "../../../utils/localStorageUtil";
import { useNavigate } from 'react-router-dom';

const URL = './email';

const ForgotDialogue = ({ open = true, setOpen, email, setRefreshData, handleBack, datas }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const store = ApplicationStore();
  const chef_id = store.getStorage('userId');

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

  const validatePassword = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else {
      if (newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters long';
      if (!/\d/.test(newPassword)) newErrors.newPassword = 'Password must contain at least one digit';
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) newErrors.newPassword = 'Password must contain at least one special character';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const method = "POST";
    const data = { newPassword, email };
    const mainURL = URL + '/update';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
  };

  const handleSuccess = (data) => {
    alert("Password successfully changed");
    setConfirmPassword('');
    setNewPassword('');
    if (datas === 'auth') {
      handleBack();
    }
    setOpen(false);
    setRefreshData((oldValue) => !oldValue);
  };

  const handleException = (data) => {
    alert(data);
  };

  return (
    <Dialog
      maxWidth=""
      sx={{ '& .MuiDialog-paper': { width: '30%', maxHeight: '100%' } }}
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Change the password</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    value={newPassword}
                    type="password"
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: 'black' },
                        '&.Mui-focused fieldset': { borderColor: 'black' },
                        '& input': { color: '#000000' },
                      },
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiInputLabel-root.Mui-focused': { color: 'gray' },
                    }}
                    margin="dense"
                    label="New password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    value={confirmPassword}
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: 'black' },
                        '&.Mui-focused fieldset': { borderColor: 'black' },
                        '& input': { color: '#000000' },
                      },
                      '& .MuiInputLabel-root': { color: 'gray' },
                      '& .MuiInputLabel-root.Mui-focused': { color: 'gray' },
                    }}
                    margin="dense"
                    label="Confirm password"
                    fullWidth
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ margin: '10px' }}>
          <Button
            sx={{
              borderRadius: '20px',
              border: '1px solid #FF4B2B',
              backgroundColor: '#ffffff',
              color: '#FF4B2B',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '12px 45px',
              textTransform: 'uppercase',
              '&:hover': { color: '#ffffff', backgroundColor: '#FF4B2B' },
            }}
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              borderRadius: '20px',
              border: '1px solid #FF4B2B',
              backgroundColor: '#FF4B2B',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '12px 45px',
              textTransform: 'uppercase',
              '&:hover': { color: '#FF4B2B' },
            }}
            type="submit"
            color="secondary"
          >
            Change
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ForgotDialogue;
