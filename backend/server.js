const axios = require('axios');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const ConnectDB = require('./config/db');
const Product = require('./models/Products');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

ConnectDB();

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(PORT, () => {
  console.log(`server is working on ${PORT}`);
});

app.use('/api/auth', authRoutes);

app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    for (let prod of products) {
      const exists = await Product.findOne({ id: prod.id });
      if (!exists) {
        await Product.create(prod);
      }
    }
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});
