import React, { ReactNode } from 'react'

interface FeatureCardProps{
  title: string;
  description: string;
  icon?: ReactNode
};

const FeatureCard = ({title, description, icon}: FeatureCardProps) => {
  return (
    <div className='w-[280px] h-[300px] my-3 px-3 py-6 text-left bg-[#dcdfd7] rounded-lg'>
      {icon}
      <h1 className='text-[30px] font-bold my-5 text-slate-700'>{title}</h1>
      <p className='text-xl text-slate-800 font-semibold'>{description}</p>
    </div>
  )
}

export default FeatureCard