import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    axiosData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setSelectedcategory={setSelectedcategory}
                selectedcategory={selectedcategory}
                product={product}
              />
            }
          />
          <Route
            path="/productdetails/:id"
            element={<Productdetails product={product} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/originalpage" element={<Originalpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
