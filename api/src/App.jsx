import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Productdetails from './assets/shopping_elements/Productdetails';
import Cart from './assets/shopping_elements/Cart';
import Checkout from './assets/shopping_elements/Checkout';
import Home from './assets/shopping_elements/Home';
import Register from './assets/shopping_elements/Register';
import Login from './assets/shopping_elements/Login';
import Originalpage from './assets/shopping_elements/Originalpage';

function App() {
  const [product, setProduct] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState('all');

  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/products');

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    axiosData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />

        {/* SHOP */}
        <Route
          path="/home"
          element={
            <Home
              setSelectedcategory={setSelectedcategory}
              selectedcategory={selectedcategory}
              product={product}
            />
          }
        />

        {/* PRODUCTS */}
        <Route
          path="/productdetails/:id"
          element={<Productdetails product={product} />}
        />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ORIGINAL PAGE */}
        <Route path="/originalpage" element={<Originalpage />} />

        {/* ANY UNKNOWN URL → LOGIN */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
