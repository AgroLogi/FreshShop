"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails'


export default function ProductItem({product}) {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center 
    justify-center gap-3 border rounded-lg
    hover:scale-110 hover:shadow-md transition-all ease-in-out cursor-pointer'>
                <Image
                src={product.attributes.images.data[0].attributes.url}
                width={250}
                height={250}
                alt={product.attributes.name}
                className='h-[200px] w-[200px] object-contain'
                />
                <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
                <div className='flex gap-3 items-center mt-4'><h2 className='font-bold'>&#8377;{product.attributes.SellingPrice}</h2>
                <h2 className='font-bold line-through text-slate-400'>&#8377;{product.attributes.price}</h2>
                
                </div>
                
                <Dialog>
                     <DialogTrigger><Button className="">Add to Cart</Button></DialogTrigger>
                      <DialogContent>
                      <DialogHeader>
                      {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                       <DialogDescription>
                         <ProductItemDetails product={product}/>
                      </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                 </Dialog>


            </div>
  )
}
