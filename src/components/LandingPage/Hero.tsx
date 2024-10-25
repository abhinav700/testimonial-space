"use client"
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import Button from '../Button';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const { data } = useSession();
  return (
    <section className='w-full h-[100vh] py-3 px-3 flex flex-col items-center'>
      <h1 className='text-[60px] font-bold text-green-700 mt-24 text-center'>
        Collect and showcase your<br/>Testmonials.
      </h1>
      <p className='text-[20px] mt-10 text-slate-700 text-center'>
        Create simple to use spaces to gather and display customer testimonials<br/>
        that build trust and drive conversions
      </p>
        <Button
        className="rounded-lg mt-12 bg-green-700 text-white font-semibold mx-2 px-2 py-2 hover:bg-green-900"
        onClick={async (e) => {
          try {
            if(!data || !data.user || !data?.user?.email){

              await signIn("",{
                callbackUrl: "/dashboard"
              })
            }
            else
              router.push("/dashboard");
          } catch (error) {
           console.log(error); 
          }
         
        }}
        >
          Get started for free
        </Button>
    </section>
  )
}

export default Hero