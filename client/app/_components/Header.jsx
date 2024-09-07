"use client"
import { LayoutDashboard, LogInIcon, Search, ShoppingBag, ShoppingBagIcon, ShoppingCart, UserCircleIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCart } from '../_context/UpdateCart'



export default function Header() {

  const [categoryList, setCategoryList] = useState([])
  const isLogin= sessionStorage.getItem('jwt')?true:false;
  const [totalCartItem, setTotalCartItem]=useState(0)
  const Uid = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const {updateCart, setUpdateCart}= useContext(UpdateCart)


 const Logout=()=>{
  sessionStorage.clear();
  router.push('/sign-in')
 }


  useEffect(() => {
    getCategoryList();

  }, [])

  useEffect(()=>{
    getCartItems();
  }, [updateCart])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      // console.log(resp.data.data);
      setCategoryList(resp.data.data);


    })
  }

//use to get total cart items
  const getCartItems=async()=>{
    const cartItemList=await GlobalApi.getTotalCartItems(Uid.id,jwt)
    console.log(cartItemList)
    setTotalCartItem(cartItemList.length)
  }
  return (
    <div className='p-5 shadow-md flex justify-between '>
      <div className='flex items-center gap-8'>
        <Link href={'/'}><Image src='/logo.png' alt='logo'
          width={100}
          height={80}
        ></Image>
</Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className='hidden md:flex gap-2 items-center border 
        rounded-full p-2 px-10 bg-slate-200 ' >
              <LayoutDashboard className='h-5 w-5' />


              Category  </h2></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Catrgories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={'/products_category/' + category.attributes.name}>
                <DropdownMenuItem key={index} className="flex gap-2 items-center cursor-pointer">

                  <Image
                    src={category.attributes.Icon.data[0].attributes.url}
                    alt='icon'
                    width={20}
                    height={20}
                    unoptimized={true}

                  />

                  <h2>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='md:flex gap-3 border rounded-full p-2 px-5 hidden'>
          <Search />
          <input type="text" placeholder='Search' className='outline-none' />
        </div>

      </div>
      <div className='flex items-center gap-4'>
        <h2 className='flex gap-2'><ShoppingBag></ShoppingBag><span className='bg-green-500 text-white rounded-full '>{totalCartItem}</span></h2>
        {!isLogin?<Link href={'/sign-in'}><Button className='bg-primary'>Login</Button></Link>:
       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
        <UserCircleIcon className='h-8 w-7 bg-green-200 text-black
         border rounded-full cursor-pointer' ></UserCircleIcon></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Orders</DropdownMenuItem>
            <DropdownMenuItem>Cart</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>Logout()}>Logout</DropdownMenuItem>
        
          </DropdownMenuContent>
        </DropdownMenu>
}
      </div>

    </div>
  )
}
