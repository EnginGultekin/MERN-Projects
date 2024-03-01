import React from 'react'
import { useQuery } from 'react-query';
import Loading from '../../globals/Loading';
import { fetchProduct } from '../../globals/Network';
import { useParams } from 'react-router-dom';

function ProductDetails() {

  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["products", product_id], () => fetchProduct(product_id));

  if (isLoading) return <Loading />
  if (error) return "An error has occurred" + error.message;

  return (
    <div>{data.description}</div>
  )
}

export default ProductDetails