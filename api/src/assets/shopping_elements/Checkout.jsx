import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

function Checkout() {
  const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);
  const totalAmount = useSelector((state) => state.cart.TotalPrice);

  return (
    <div>
      <p>Welcome to checkout:</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
      ;
    </div>
  );
}

export default Checkout;
