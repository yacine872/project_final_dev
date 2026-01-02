const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
