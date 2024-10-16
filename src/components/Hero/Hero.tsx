"use client"
import { signIn } from 'next-auth/react';
import React from 'react'
import Button from '../Button';

const Hero = () => {
  return (
    <section className='w-full h-[100vh] py-3 px-3 flex flex-col items-center bg-[#E9EED9]'>
      <h1 className='text-[60px] font-bold text-green-700 mt-24 text-center'>
        Collect and showcase your<br/>Testmonials.
      </h1>
      <p className='text-[20px] mt-10 text-slate-700 text-center'>
        Create simple to use spaces to gather and display customer testimonials<br/>
        that build trust and drive conversions
      </p>
        <Button
        className="rounded-lg mt-12 bg-green-700 text-white font-semibold mx-2 px-2 py-2 hover:bg-green-900"
        onClick={(e) => {
          signIn();
        }}
        >
          Get started for free
        </Button>
    </section>
  )
}

export default Hero