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

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList'
import { toast } from 'sonner'


export default function Header() {

  const [categoryList, setCategoryList] = useState([])
  // const isLogin= sessionStorage.getItem('jwt')?true:false;
  const [totalCartItem, setTotalCartItem]=useState(0)
  const Uid = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const {updateCart, setUpdateCart}= useContext(UpdateCart)
  const [cartItemList, setCartItemList]= useState([])

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

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
      let total = 0;
      cartItemList.forEach(element => {
          total += element.amount; // Calculate total amount for the cart items
      });
      setSubTotal(total); // Update the subtotal
  }, [cartItemList]); // Recalculate subtotal whenever cart items change


//use to get total cart items
  const getCartItems=async()=>{
    if (!Uid) return; // Return early if Uid is null or undefined
    const cartItemsList=await GlobalApi.getTotalCartItems(Uid.id,jwt)
    console.log(cartItemsList)
    setTotalCartItem(cartItemsList.length)
    setCartItemList(cartItemsList)
  }


  const onDeleteCartItem=(id)=>{
    GlobalApi.deleteCartItem(id, jwt).then(res=>{
      toast("Item removed from Your cart");
      getCartItems();

    })
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
        
        <Sheet>
          <SheetTrigger>
            <h2 className='flex gap-1 items-center'>
              <ShoppingBag></ShoppingBag>
              <span className='bg-green-500 text-white border 
                    rounded-xl p-2 '>{totalCartItem}
              </span>

            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList}
                onDeleteCartItem={onDeleteCartItem}
                />
                
              </SheetDescription>
            </SheetHeader>
            <SheetClose aschild>
                {/* Display the subtotal and button below the scrollable list */}
            <div className='absolute flex flex-col bottom-4 w-[90%] mt-4'>
                <h2 className='text-lg font-bold flex justify-between'>Subtotal: <span>&#8377;{subTotal}</span></h2>
                <Button onClick={()=>router.push(jwt?'/checkout':'/sign-in')}>Checkout</Button>
            </div>
            </SheetClose>
          </SheetContent>
        </Sheet>







        {!jwt?<Link href={'/sign-in'}><Button className='bg-primary'>Login</Button></Link>:
       
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
