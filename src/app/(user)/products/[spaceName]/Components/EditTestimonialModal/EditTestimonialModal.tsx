import { TestimonialFormDataType, TestimonialType } from '@/lib/schemas/schema'
import React, { SetStateAction, useState } from 'react'

interface EditTestimonialModalProps {
  testimonial: TestimonialType;
  setShowEditTestimonialModal: React.Dispatch<SetStateAction<boolean>>;
}

const EditTestimonialModal = ({testimonial, setShowEditTestimonialModal}:EditTestimonialModalProps) => {
  const [testimnialFormData, setTestimnialFormData] = useState<TestimonialFormDataType>({
      description: testimonial.description,
      customerName: testimonial.customerName,
      customerEmail: testimonial.customerEmail,
      date: testimonial.createdAt
  })


  return (
    <div className='w-full h-full top-0 left-0 fixed flex flex-col items-center backdrop-blur-[2px]'>
      <div className='sm:w-[40%] max-h-[80%] p-2 bg-slate-400'>
        TestimonialModal
      </div>
    </div>
  )
}

export default EditTestimonialModal