"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState,useEffect} from 'react'
import { toast } from 'sonner'


export default function SignIn() {

  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")
  const router= useRouter();

  useEffect(()=>{
    const jwt=sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }
  })

  const onLoginAccount=()=>{
    GlobalApi.Login(email,password).then(res=>{
      console.log(res.data.user)
      console.log(res.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(res.data.user))
      sessionStorage.setItem('jwt',res.data.jwt)
      router.push('/')
      toast("Login Successfull")

    },(e)=>{
      toast("Login Failed")
    })
    
  }
  return (
      <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center mt-2 bg-green-200 p-3 border rounded-lg'>
        <Image src="/logo.png" width={100} height={40} className='border rounded-md shadow-lg'></Image>
        <h2 className='font-bold text-2xl'>Welcome to Fresh Shop</h2>
        <h2 className='font-bold text-xl mt-2'>Login</h2>
        <div className='w-full flex flex-col m-2 gap-2'>
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button 
            onClick={onLoginAccount}
            disabled={!(email && password)}
          >
            Login
          </Button>
          <p className='flex gap-2'>Don't have an Account
            <Link href="/sign-up" className='text-blue-600'>Click here to Create an Account</Link>
          </p>
        </div>
      </div>
    </div>
   
  )
}
