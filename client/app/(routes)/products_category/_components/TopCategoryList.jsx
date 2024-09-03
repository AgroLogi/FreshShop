import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TopCategoryList({categoryList,selectedCategory}) {
  return (
    <div>
       <div className='flex gap-4 mt-2 mx-7 md:mx-20 justify-center overflow-auto' >
        {categoryList.map((category, index)=> (
          
          <Link href={'/products_category/'+category.attributes.name} 
          className={`flex flex-col items-center
           bg-green-50 gap-2 p-3 rounded-lg 
           group cursor-pointer hover:bg-green-400
           w-[150px] min-w-[100px]
           ${selectedCategory==category.attributes.name&&'bg-green-500 text-white'}`}>
            
    
            <Image src={category.attributes.Icon.data[0].attributes.url}
             unoptimized={true}
             width={60} height={60} alt='icon'
             className='group-hover:scale-125 transition-all ease-in-out'
             ></Image>
             <h2 className={`text-green-600 group-hover:text-white
             ${selectedCategory==category.attributes.name&&' text-white'}
             `} key={index}>{category.attributes.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
