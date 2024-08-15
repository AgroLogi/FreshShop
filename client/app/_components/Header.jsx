import { LayoutDashboard, LogInIcon, Search, ShoppingBag, ShoppingBagIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

export default function Header() {
  return (
    <div className='p-5 shadow-md flex justify-between'>
          <div className='flex items-center gap-8'>
              <Image src='/logo.png' alt='logo'
                  width={100}
                  height={80}
              ></Image>

                  <DropdownMenu>
                      <DropdownMenuTrigger>
              <h2 className='hidden md:flex gap-2 items-center border 
        rounded-full p-2 px-10 bg-slate-200 ' >
                  <LayoutDashboard className='h-5 w-5' />
                  
                
                  <h2>Category</h2>  </h2></DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>

              <div className='md:flex gap-3 border rounded-full p-2 px-5 hidden'>
                <Search/>
                <input type="text" placeholder='Search' className='outline-none' />
              </div>
             
        </div>
        <div className='flex items-center gap-4'>
                <h2 className='flex gap-2'><ShoppingBag></ShoppingBag>0</h2>
                <button>Login</button>
              </div>
      
    </div>
  )
}
