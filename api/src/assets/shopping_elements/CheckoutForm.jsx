import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClearOrder, MakeOrder } from '../../ordersSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm({ totalAmount }) {
  const cart = useSelector((state) => state.cart.ItemsList);
  const currentUser = useSelector((state) => state.user.currentUser);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const { data } = await axios.post(
      'http://localhost:8080/api/auth/payment-intent',
      {
        amount: totalAmount,
      }
    );
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (result.paymentIntent.status === 'succeeded') {
      alert('Payment Successful!');

      await axios.post('http://localhost:8080/api/auth/orders', {
        items: cart,
        user: currentUser,
      });
      dispatch(MakeOrder({ items: cart, user: currentUser }));
      dispatch(ClearOrder());
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay ${totalAmount}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
