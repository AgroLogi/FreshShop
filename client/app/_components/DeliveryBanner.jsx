"use client"
import React from 'react'
import Image from "next/image"


export default function DeliveryBanner({deliveryBanner}) {
  return (
    <div>
      {deliveryBanner.map((banner, index)=>{
        <div key={index}>
            <Image src={deliveryBanner.attributes?.image?.data[0].attributes?.url} 
            width={400} height={400} alt="delivery image" />
        </div> 
      })}
    </div>
  )
}
