import EmbeddedTestimonial from "@/app/(embed)/embed/testimonial/[id]/page";
import { TestimonialType } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";

interface EmbedTestimonialModalProps{
  setShowEmbedTestimonialModal: React.Dispatch<SetStateAction<boolean>>;
  testimonial: TestimonialType
}

const EmbedTestimonialModal = ({testimonial, setShowEmbedTestimonialModal}: EmbedTestimonialModalProps) => {
  console.log(testimonial);
  return (
    <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-[2px] flex justify-center items-center p-4">
      <div className="h-[80vh] w-[80%] p-3 flex flex-col items-start overflow-y-auto bg-slate-300 rounded-md z-10">
        <div className="flex flex-col w-full">
          <span className="w-full flex justify-end cursor-pointer" onClick={(e) => setShowEmbedTestimonialModal(false)}><X/></span>
          <h1 className="text-lg font-bold">Live Preview</h1>
          <EmbeddedTestimonial testimonialData={testimonial} />
        </div>
          
        <div className="flex flex-col w-full">
          <h1 className="text-lg font-bold">Embed Code</h1>
          <span className="bg-black w-full min-h-[100px] max-h-fit rounded-lg p-2 mt-3 text-white ">
          {`<iframe
            src="http://localhost:3000/embed/testimonial/${testimonial.id}"
          > 
          
          </iframe>`}
          </span>
        </div>

      </div>
    </div>
  );
};

export default EmbedTestimonialModal;
