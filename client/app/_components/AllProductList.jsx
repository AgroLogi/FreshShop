"use client"
import Image from 'next/image'
import React from 'react';
import ProductItem from './ProductItem';

export default function AllProductList({ productList }) {
  return (
    <div className='mt-6'>
      <h2 className='text-primary font-bold text-2xl'>Product List</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 items-center rounded-md border-black'>
        {productList.map((product, index)=> index<8&&(
         <ProductItem product={product}/>
        ))}
      </div>
      </div>
  );
}
