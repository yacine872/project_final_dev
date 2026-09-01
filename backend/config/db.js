const mongoose = require('mongoose');
require('dotenv').config();

// const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-pjdar6t-shard-00-00.fqwiziu.mongodb.net:27017,ac-pjdar6t-shard-00-01.fqwiziu.mongodb.net:27017,ac-pjdar6t-shard-00-02.fqwiziu.mongodb.net:27017/?ssl=true&replicaSet=atlas-nf0ttt-shard-0&authSource=admin&appName=Cluster0`;

async function ConnectDB() {
  try {
    await mongoose.connect(uri);
    console.log('connected to mongodb with mongoose');
  } catch (err) {
    console.log(err);
  }
}

module.exports = ConnectDB;
