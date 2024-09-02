"use client"
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ProductItemDetails({product}) {

  const [productTotalPrice, setProductTotalPrice]= useState(
    product.attributes.SellingPrice?
    product.attributes.SellingPrice:
    product.attributes.price

  )

  const [quantity, setQuantity]=useState(1);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black gap-2'>
     <Image src={product.attributes.images.data[0].attributes.url} 
     width={200} height={200} alt='image'
     className='bg-slate-50 border rounded-lg p-5 h-[200px]
     w-[300px] object-contain '></Image>

     <div className='flex flex-col gap-2'>
     <h2 className='font-bold text-3xl'>{product.attributes.name}</h2>
     <h2 className='font-sm text-gray-500'>{product.attributes.description}</h2>
     <div className='flex gap-3'>
      <h2 className='font-bold text-2xl'>${product.attributes.SellingPrice}</h2>
      <h2 className='font-bold text-2xl line-through text-slate-400'>${product.attributes.price}</h2>
    </div>

    <div>
      <h2 className='font-medium text-sm'> Quantity {product.attributes.quantity}</h2>
    
    </div>
    <div className='flex flex-col gap-3 items-baseline '>
    <div className='flex item items-center gap-4 '>
    <div className='flex gap-6 items-center p-3 border px-4' >
      <Button disable={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</Button>
      <h2>{quantity}</h2>
      <Button onClick={()=>setQuantity(quantity+1)}>+</Button>   
       </div>
       <h2 className='font-medium text-sm'>= ${quantity*productTotalPrice}</h2>
       </div>
    
    <div >
    <Button className="flex gap-3 ">
      <ShoppingBasket/>Add To Cart
    </Button>
   </div>
   <h2>Categoty: {product.attributes.categories.data[0].attributes.name}</h2>
    </div>
     </div>
     
    
    
     
               
    </div>
  )
}
