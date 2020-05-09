import React from 'react';
import Stripe from 'stripe';
import { GetStaticPaths, GetStaticProps } from 'next';
import config from '../config/stripe';
import Link from 'next/link';
import CheckoutButton from '../Components/CheckoutButton';

interface Props {
  sku: Stripe.Sku
}

const getSymbiolByCurrency = currency => {
  switch (String(currency).toUpperCase()) {
    case 'BRL':
      return 'R$'
    default:
      return '$'
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(config.secretKey, {
    apiVersion: '2020-03-02'
  });

  const skus = await stripe.skus.list();

  const paths = skus.data.map((sku) => ({
    params: {
      skuId: sku.id,
    },
  }));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(config.secretKey, {
    apiVersion: '2020-03-02'
  });

  const sku = await stripe.skus.retrieve(params.skuId as string);

  return {
    props: {
      sku
    }
  }
}

const Product: React.FC<Props> = ({ sku }) => {
  return (
    <div>
      <h1>{ sku.attributes.name }</h1>
      {sku.image && <img src={sku.image} width="100"/>}
      <h2>{ getSymbiolByCurrency(sku.currency) } { Number(sku.price / 100).toFixed(2) }</h2>

      <CheckoutButton skuId={sku.id} productName={sku.attributes.name} />
      
      <br/>
      <br/>

      <Link href="/">
        <a>Voltar</a>
      </Link>
    </div>
  )
}

export default Product;