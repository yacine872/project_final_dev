const express = require('express');
const AuthControllers = require('../authControllers/Controllers');
const User = require('../models/User');
const Order = require('../models/Orders');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/login', AuthControllers.login);
router.post('/register', AuthControllers.register);
router.get('/users/:id', async (req, res) => {
  const user = User.findById(req.params.id);
  res.json(user);
});
router.get('/orders/:email', async (req, res) => {
  const order = Order.findOne({ email: req.params.email });
  res.json(order);
});

router.post('/payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
