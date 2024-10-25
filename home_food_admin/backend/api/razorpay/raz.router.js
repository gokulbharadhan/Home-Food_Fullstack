// raz.router.js

const express = require('express');
const RazorpayController = require('./raz.controller');

const router = express.Router();

// Route to create an order
router.post('/create-order', (req, res) => {
  RazorpayController.createOrder(req, res);
});

// Route to verify payment
router.post('/verify-payment', (req, res) => {
  RazorpayController.verifyPayment(req, res);
});

module.exports = router;
