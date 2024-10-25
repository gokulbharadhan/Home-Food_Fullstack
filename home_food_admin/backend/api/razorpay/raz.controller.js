// raz.controller.js

const RazorpayService = require('./raz.services');

class RazorpayController {
  async createOrder(req, res) {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    try {
      const order = await RazorpayService.createOrder(amount);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async verifyPayment(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Payment details are required' });
    }

    const isValid = RazorpayService.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (isValid) {
      res.status(200).json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'failure' });
    }
  }
}

module.exports = new RazorpayController();
