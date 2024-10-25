// raz.service.js

const Razorpay = require('razorpay');

const crypto = require('crypto');

class RazorpayService {
  constructor() {
    this.instance = new Razorpay({
      key_id: 'rzp_test_H86fHzp0t46FND',
      key_secret: 'pQ06vb0U68kVWlTpqpkLZs5x',
    });
  }

  async createOrder(amount) {
    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency: 'INR',
      receipt: `receipt#${Math.floor(Math.random() * 1000)}`, // Dynamic receipt generation
    };

    try {
      const order = await this.instance.orders.create(options);
      return order;
    } catch (err) {
      throw err;
    }
  }

  verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    const hmac = crypto.createHmac('sha256', this.instance.key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    return generated_signature === razorpay_signature;
  }

  async handleVerifyPayment(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Payment details are required' });
    }

    const isValid = this.verifyPayment({
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

module.exports = new RazorpayService();
