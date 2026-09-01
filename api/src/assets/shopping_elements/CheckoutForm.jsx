import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClearOrder, MakeOrder } from '../../ordersSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm({ totalAmount }) {
  const cart = useSelector((state) => state.cart.ItemsList);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log('CHECKOUT FORM USER:', currentUser);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Pay clicked');

    if (!stripe || !elements) {
      console.log('Stripe is not ready');
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:8080/api/auth/payment-intent',
        {
          amount: Math.round(totalAmount * 100),
        }
      );

      console.log('Payment Intent:', data);

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log('Stripe result:', result);

      if (result.error) {
        console.log('Stripe error:', result.error.message);
        alert(result.error.message);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');

        await axios.post('http://localhost:8080/api/auth/orders', {
          items: cart,
          user: currentUser,
        });

        dispatch(
          MakeOrder({
            items: cart,
            user: currentUser,
          })
        );

        dispatch(ClearOrder());
      }
    } catch (error) {
      console.error('CHECKOUT ERROR:', error);
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
