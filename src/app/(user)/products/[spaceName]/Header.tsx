import Button from '@/components/Button';
import React from 'react'

interface HeaderProps{
  spaceName: String;
  totalTestimonials: number;
};

const Header = ({spaceName, totalTestimonials}: HeaderProps) => {
  return (
    <div className='w-full bg-[#ececec] flex justify-between items-center py-3 px-4 border-[1px] border-[#bebebe]'>
      <div>
        <span className='text-lg text-whie font-bold'>{spaceName}</span>
      </div>
      <div className='mx-2'>
        <Button className="bg-slate-600 p-1 text-md rounded-md text-white hover:bg-slate-700" onClick={(e)=>{}}>Edit Space</Button>
      </div>
    </div>
  )
}

export default Header