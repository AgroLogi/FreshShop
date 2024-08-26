import { Image } from 'lucide-react'
import React from 'react'

export default function AllProductList({ productList }) {
  return (
    <div>
      <h1>Product List</h1>
      {productList.map((product, index) => (
        <div key={index}>
          <Image 
            src={product.attributes.images.data[0].attributes.formats.thumbnail.url} 
            width={60} 
            height={60} 
            alt={product.attributes.name || 'Product Image'}
          />
        </div>
      ))}
    </div>
  )
}
