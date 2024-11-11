import Button from "@/components/Button";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import TestimonialToolbar from "./TestimonialToolbar/TestimonialToolbar";
import useDeleteTestimonialItem from "./TestimonialToolbar/useDeleteTestimonialItem";

interface TestimonialItemProps{
  testimonial: TestimonialType;
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType | null>>;
}
const TestimonialItem = ({
  testimonial,
  space,
  setSpace,
}: TestimonialItemProps) => {
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const {DeleteModal, setShowDeleteModal, showDeleteModal, handleDeleteTestimonial} = useDeleteTestimonialItem({space, setSpace});
 
  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          id={testimonial.id}
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteTestimonial={handleDeleteTestimonial}
        />
      )}
      <div className="w-[90%] sm:w-[80%] md:w-[60%] min-h-[150px] max-h-[500px] flex flex-col justify-between items-start p-4 my-2 rounded-md bg-[#ebf3d6]">
        <p>{testimonial.description}</p>
        <div className="flex flex-col w-full mt-5">
          <div className="w-full flex justify-between">
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Name</span>
              <span>{testimonial.customerName}</span>
            </span>
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Email</span>
              <span>{testimonial.customerEmail}</span>
            </span>
          </div>
          <div className="w-full flex justify-between mt-6">
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Submitted At</span>
              <span>{new Date(testimonial.createdAt!).toLocaleString()}</span>
            </span>
          </div>

          {/* Options to share, edit and delete the testimonial */}
          {showToolbar && <TestimonialToolbar setShowDeleteModal={setShowDeleteModal} testimonial={testimonial}/>}

          {/* Icon to trigger the menu */}
          <div className="w-full flex justify-end h-[fit]">
            {showToolbar ? (
              <Button
                onClick={(e) => {
                  setShowToolbar(false);
                }}
              >
                <ChevronUp className="cursor-pointer" />
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  setShowToolbar(true);
                }}
              >
                <ChevronDown className="cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 

export default TestimonialItem;
