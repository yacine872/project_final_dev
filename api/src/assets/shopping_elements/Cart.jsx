import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.ItemsList);
  const totalPrice = useSelector((state) => state.cart.TotalPrice);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('CART USER:', currentUser);

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

          <Link to="/home">
            <button className="continue-shopping-button">
              Continue Shopping
            </button>
          </Link>
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

                  <p className="cart-product-price">
                    ${Number(item.price).toFixed(2)}
                  </p>

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

            {/* GO TO STRIPE CHECKOUT */}
            <Link to="/checkout" className="checkout-link">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>

            <p className="secure-checkout">🔒 Secure checkout</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
