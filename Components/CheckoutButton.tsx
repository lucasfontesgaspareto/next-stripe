import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import config from '../config/stripe'
const stripePromise = loadStripe(config.prublicKey);

interface Props {
  skuId: string;
  productName: string;
}

const CheckoutButton: React.FC<Props> = ({ skuId, productName }) => {
  async function handleClick() {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      items: [
        {
          sku: skuId,
          quantity: 1
        }
      ],
      successUrl: `http://localhost:3000/success?productName=${productName}`,
      cancelUrl: 'http://localhost:3000/',
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Comprar
    </button>
  );
}

export default CheckoutButton;