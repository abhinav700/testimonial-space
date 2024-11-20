import Button from '@/components/Button';
import { PenIcon } from 'lucide-react';
import React, { useState } from 'react'
import EditTestimonialModal from '../EditTestimonialModal/EditTestimonialModal';
import { TestimonialType } from '@/lib/schemas/schema';

interface EditButtonProps{
  testimonial: TestimonialType;
}

const EditButton = ({
  testimonial
}: EditButtonProps) => {

  const [showEditTestimonialModal, setShowEditTestimonialModal] = useState<boolean>(false);
  return (
    <>
     
      {showEditTestimonialModal && (
        <EditTestimonialModal
          testimonial={testimonial}
          setShowEditTestimonialModal={setShowEditTestimonialModal}
        />
      )}
      <Button
        className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
        onClick={(e) => {
          setShowEditTestimonialModal(true);
        }}
      >
        <PenIcon className="text-tiny" />
        <span className="text-black ml-1">Edit</span>
      </Button>
    </>
  );
};

export default EditButton