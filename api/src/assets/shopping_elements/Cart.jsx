import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';
import { MakeOrder } from '../../ordersSlice';
import axios from 'axios';

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.ItemsList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalPrice = useSelector((state) => state.cart.TotalPrice);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/orders', {
        items: cart,
        user: currentUser,
      });

      dispatch(MakeOrder({ items: cart, user: currentUser }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>{cart.length} item(s) in your cart</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart and they'll appear here.</p>
        </div>
      ) : (
        <div className="cart-layout">
          {/* PRODUCTS */}
          <div className="cart-products">
            {cart.map((item) => (
              <div className="cart-product" key={item.id}>
                <div className="cart-product-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="cart-product-info">
                  <h3>{item.title}</h3>

                  <p className="cart-product-price">${item.price}</p>

                  <div className="quantity-container">
                    <span>Quantity</span>

                    <div className="quantity-controls">
                      <button onClick={() => dispatch(RemoveItem(item))}>
                        −
                      </button>

                      <span>{item.Quantity || 1}</span>

                      <button onClick={() => dispatch(AddItem(item))}>+</button>
                    </div>
                  </div>
                </div>

                <div className="cart-product-total">
                  <span>Total</span>
                  <strong>
                    ${(item.price * (item.Quantity || 1)).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${Number(totalPrice).toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${Number(totalPrice).toFixed(2)}</strong>
            </div>

            <button className="checkout-button" onClick={handleSubmit}>
              Proceed to Checkout
            </button>

            <p className="secure-checkout">🔒 Secure checkout</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
