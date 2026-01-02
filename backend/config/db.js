const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

async function ConnectDB() {
  try {
    await mongoose.connect(uri);
    console.log('connected to mongodb with mongoose');
  } catch (err) {
    console.log(err);
  }
}

module.exports = ConnectDB;
