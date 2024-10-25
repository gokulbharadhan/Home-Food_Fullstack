const express = require('express');
const { ContactMessage} = require('./contact.controller');

const router = express.Router();

// Routes
router.post('/contact', ContactMessage);

module.exports = router;
