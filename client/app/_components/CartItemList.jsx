import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function CartItemList({ cartItemList, onDeleteCartItem }) {
   
    return (
        <div>
            <div className="max-h-[400px] overflow-y-auto"> {/* Add fixed height and overflow for scroll */}
                {cartItemList.map((item, index) =>
                    <div key={index} className='flex items-center justify-between p-2 mb-3'>
                        <div className='flex gap-2 items-center'>
                            <Image
                                src={item.image}
                                width={70}
                                height={40}
                                alt={item.name}
                                className='border p-2' />

                            <div>
                                <h2 className='font-bold text-black'>{item.name}</h2>
                                <h2>Quantity: {item.quantity}</h2>
                                <h2 className='text-lg text-black'>&#8377;{item.amount}</h2>
                            </div>
                        </div>

                        <Trash2Icon onClick={() => onDeleteCartItem(item.id)} className="cursor-pointer " />
                    </div>
                )}
            </div>

          
        </div>
    );
}
