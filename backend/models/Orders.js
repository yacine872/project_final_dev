const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: Date,
  items: [{ id: Number, title: String }],
  date: {
    type: Date,
    default: Date.now,
  },
  email: String,
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
