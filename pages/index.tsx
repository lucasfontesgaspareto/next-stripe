import { GetStaticProps } from "next";
import config from "../config/stripe";
import Stripe from "stripe";
import Link from "next/link";

interface Props {
  skus: [Stripe.Sku]
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(config.secretKey, {
    apiVersion: '2020-03-02'
  });

  const skus = await stripe.skus.list();

  return {
    props: {
      skus: skus.data
    }
  }
};

const HomePage: React.FC<Props> = ({ skus }) => {
  return (
    <>
      <h1>Next Strip Store</h1>

      {skus.map(sku => (
        <div key={sku.id}>
          <p>{ sku.attributes.name }</p>
          {sku.image && <img src={sku.image} width="100"/>}
          <Link href={`/${sku.id}`}>
            <a>Ver produto</a>
          </Link>
          <hr/>
        </div>
      ))}
    </>
  );
}

export default HomePage;