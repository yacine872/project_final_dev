import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

function Checkout() {
  const totalAmount = useSelector((state) => state.cart.TotalPrice);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('CHECKOUT USER:', currentUser);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <p>
        Total: <strong>${totalAmount}</strong>
      </p>

      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
}

export default Checkout;
