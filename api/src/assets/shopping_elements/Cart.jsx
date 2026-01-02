import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AddItem, RemoveItem } from '../../cartSlice';
import { MakeOrder } from '../../ordersSlice';
import { userAction } from '../../userSlice';
import axios from 'axios';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.ItemsList);
  const currentUser = useSelector((state) => state.user.currentUser);
  dispatch(userAction.setCurrentUser(currentUser));

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/orders', {
        items: cart,
        user: currentUser,
      });
      dispatch(MakeOrder({ items: cart, user: currentUser }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-item">
        {cart.map((items) => (
          <div>
            {items.title}
            {items.price}
            {items.Quantity}
            {items.ItemPrice}
            <button onClick={() => dispatch(AddItem(items))}>+</button>
            <button onClick={() => dispatch(RemoveItem(items))}>-</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Checkout</button>
    </div>
  );
}

export default Cart;
