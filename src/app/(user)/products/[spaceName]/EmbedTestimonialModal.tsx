import EmbeddedTestimonial from "@/app/(embed)/embed/testimonial/[id]/page";
import { TestimonialType } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";

interface EmbedTestimonialModalProps {
  setShowEmbedTestimonialModal: React.Dispatch<SetStateAction<boolean>>;
  testimonial: TestimonialType;
}


const EmbedCode = ({ id }: { id: string }) => {
  return (
    <>
      <p className="">{"<iframe>"}</p>
      <p className="ml-2">
        src=
        <span className="text-[#40c43c]">{`"${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${id}"`}</span>
      </p>
      <p>{"</iframe>"}</p>
    </>
  );
};
const EmbedTestimonialModal = ({
  testimonial,
  setShowEmbedTestimonialModal,
}: EmbedTestimonialModalProps) => {
  console.log(testimonial);
  return (
    <div className="w-screen h-screen fixed z-10 top-0 left-0 backdrop-blur-[2px] flex justify-center items-center p-4">
      <div className="h-[80vh] w-[80%] py-3 px-5 flex flex-col items-start overflow-y-auto bg-slate-300 rounded-md ">
        <div className="flex flex-col w-full">
          <span
            className="w-full flex justify-end cursor-pointer"
            onClick={(e) => setShowEmbedTestimonialModal(false)}
          >
            <X />
          </span>
          <h1 className="text-2xl font-bold mb-5">
            Embed this testimonial to your websites
          </h1>
          <h1 className="text-lg font-bold">Live Preview</h1>
          
          <iframe
            className="min-h-[200px] max-h-[350px] w-full mt-2"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${testimonial.id}`}
          ></iframe>
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-lg font-bold">Embed Code</h1>
          <span className="bg-[#141414] w-full overflow-x-auto min-h-[100px] max-h-fit rounded-lg p-4 mt-3 text-white ">
            <EmbedCode id={testimonial.id} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmbedTestimonialModal;
