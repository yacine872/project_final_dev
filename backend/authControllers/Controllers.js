const User = require('../models/User');
const bcryptjs = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, username, password, email } = req.body;
    const hashed = await bcryptjs.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      username,
      password: hashed,
      email,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (!exists) {
      return res.status(400).json({ message: 'this email does not exist' });
    }
    const valid = await bcryptjs.compare(password, exists.password);

    if (!valid) {
      return res.status(400).json({ message: 'password incorrect' });
    }
    return res.status(200).json({
      message: 'successfully logged in',
      user: {
        email: exists.email,
        username: exists.username,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
