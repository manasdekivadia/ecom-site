import React from 'react';
import ProductSingleCard from "./ProductSingleCard";
const ProductCard = ({ product }) => {
  return (
    <>
      {Array.isArray(product) && product.map((item) => (
        <ProductSingleCard key={item._id} product={item} />
      ))}
    </>
  );
};


export default ProductCard;
