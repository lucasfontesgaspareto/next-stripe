import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
  const { query } = useRouter()
  
  return (
    <>
      <h1>Obrigado por comprar { query.productName }</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
};

export default SuccessPage;