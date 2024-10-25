const express = require('express');
const { registerUser, verifyUser ,forgotPassword,updatePassword} = require('./email.controller');

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.get('/:email/forgot',forgotPassword);
router.post('/update',updatePassword)

module.exports = router;
