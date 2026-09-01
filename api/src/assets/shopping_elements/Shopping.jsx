import React, { useState } from 'react';
import Sorting from './Sorting';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';

function Shopping({ selectedcategory, product }) {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState('');

  // Get cart items from Redux
  const cart = useSelector((state) => state.cart.ItemsList);

  const filteringFunction =
    selectedcategory === 'all'
      ? product
      : product.filter((item) => item.category === selectedcategory);

  const sortingFunction = [...filteringFunction].sort((a, b) => {
    if (sorting === 'lowhigh') return a.price - b.price;
    if (sorting === 'highlow') return b.price - a.price;
    return 0;
  });

  // Total quantity in cart
  const cartCount = cart.reduce(
    (total, item) => total + (item.Quantity || 1),
    0
  );

  return (
    <div>
      {/* TOP BAR */}
      <div className="shop-top-bar">
        <Sorting setSorting={setSorting} />

        <Link to="/cart" className="cart-link">
          <button className="cart-button">
            🛒
            <span>Check Cart</span>
            {cartCount > 0 && (
              <span className="cart-notification">{cartCount}</span>
            )}
          </button>
        </Link>
      </div>

      {/* PRODUCTS */}
      <div className="shoppingStyle">
        {sortingFunction.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.title} width={100} height={120} />

            <h3>{item.title}</h3>

            <h5>${item.price}</h5>

            <h6>
              ⭐ {item.rating.rate} ({item.rating.count})
            </h6>

            <div className="button-card">
              <Link to={`/productdetails/${item.id}`}>
                <button>Product Details</button>
              </Link>

              <button onClick={() => dispatch(AddItem(item))}>
                Add to Cart
              </button>

              <button onClick={() => dispatch(RemoveItem(item.id))}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping;
