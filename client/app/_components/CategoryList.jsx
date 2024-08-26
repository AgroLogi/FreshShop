import Image from 'next/image'
import React from 'react'

export default function CategoryList({categoryList}) {
  return (
    
    <div className='mt-5'>
      
      <h1 className='text-primary font-bold text-2xl '>Shop with Category List</h1>
      <div className='grid grid-cols-3 sm:-grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-2' >
        {categoryList.map((category, index)=> (
          
          <div className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-400'>
            
    
            <Image src={category.attributes.Icon.data[0].attributes.url}
             width={60} height={60} alt='icon'
             className='group-hover:scale-125 transition-all ease-in-out'
             ></Image>
             <h2 className='text-green-600 ' key={index}>{category.attributes.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}