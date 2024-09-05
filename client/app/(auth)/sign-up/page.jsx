"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const router= useRouter();

  useEffect(()=>{
    const jwt=sessionStorage.getItem('jwt');
    if(jwt){
      router.push('/');
    }
  })

  const onCreateAccount = () => {
    GlobalApi.registerUser(username, email, password).then(res => {
      console.log(res.data.user)
      console.log(res.data.jwt)
      sessionStorage.setItem('user',JSON.stringify(res.data.user))
      sessionStorage.setItem('jwt', res.data.jwt);
      toast("Account Created Successfully")
      router.push('/')


    },(e)=>{
      toast("Error Creating Account")

    })
  }

  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center mt-2 bg-green-200 p-3'>
        <Image src="/logo.png" width={100} height={40} className='border rounded-md shadow-lg'></Image>
        <h2 className='font-bold text-2xl'>Welcome to Fresh Shop</h2>
        <h2 className='font-bold text-xl mt-2'>Create An Account</h2>
        <div className='w-full flex flex-col m-2 gap-2'>
          <Input placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setpassword(e.target.value)} />
          <Button 
            onClick={onCreateAccount}
            disabled={!(username && email && password)}
          >
            Create an Account
          </Button>
          <p className='flex gap-2'>Already have an Account
            <Link href="/sign-in" className='text-blue-600'>Click here to Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
