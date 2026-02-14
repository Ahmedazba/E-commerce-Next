
import { LoginForm } from '@/components/LoginForm/LoginForm'
import React from 'react'
import Image from "next/image";

export default function Login() {
  return <>
<div className="flex flex-col md:flex-row min-h-screen w-full">
  <div className="hidden md:block md:w-1/2 bg-gray-100">
        <Image
          src="/Login-amico.svg!"
          alt="Login background"
          className="p-10 object-contain"
          loading="eager"
          width={1000}
          height={1000}
        />
      </div>

    <div className='flex w-full md:w-1/2 items-center justify-center p-8 md:p-10'>
  <LoginForm/>
    
    </div>
    </div>
  </>
}
