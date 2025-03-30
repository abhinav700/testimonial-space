import Button from "@/components/Button";
import { TestimonialFormDataType, TestimonialType } from "@/lib/schemas/schema";
import axios from "axios";
import { X } from "lucide-react";
import React, { SetStateAction, useState } from "react";

interface EditTestimonialModalProps {
  testimonial: TestimonialType;
  setShowEditTestimonialModal: React.Dispatch<SetStateAction<boolean>>;
}

const EditTestimonialModal = ({
  testimonial,
  setShowEditTestimonialModal,
}: EditTestimonialModalProps) => {
  const [testimonialFormData, setTestimonialFormData] =
    useState<TestimonialFormDataType>({
      description: testimonial.description,
      customerName: testimonial.customerName,
      customerEmail: testimonial.customerEmail,
      /**
       * Prisma Date: 2024-11-20T03:50:36.078Z
       * Date format expected by input element: 2024-11-20T03:50
       *
       */
      date: testimonial.createdAt!.slice(0, 16),
    });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTestimonialFormData((testimonialFormData) => ({
      ...testimonialFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditTestimonial = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setIsLoading(true);
      const response = await axios.put("/api/testimonial/edit", {
        ...testimonialFormData,
        id: testimonial.id,
        /**
         * adding seconds, milliseconds and converting to UTC format
          
         * */
        createdAt: `${testimonialFormData.date}:00.000Z`,
      });
      const data = await response.data;
      if(data.status == 200){
        location.reload();
      }
    } catch (error) {
      alert("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full top-0 left-0 fixed flex flex-col items-center justify-center  backdrop-blur-[2px]">
      <div className="lg:w-[35%] md:w-[45%] sm:w-[60%] min-h-[80%] max-h-[90%] rounded-md p-5 bg-slate-400 overflow-y-auto">
        <span
          className="flex w-full justify-end cursor-pointer"
          onClick={() => {
            setShowEditTestimonialModal(false);
          }}
        >
          <X />
        </span>
        <h1 className="w-full text-center mt-4 font-bold text-2xl">
          Edit the testimonial
        </h1>

        {/* customer name */}
        <div className="mt-7 mb-2">
          <label>Name</label>
          <br />
          <input
            className="p-1 rounded-md w-full"
            name="customerName"
            value={testimonialFormData.customerName}
            onChange={handleOnChange}
            type="text"
          />
        </div>

        {/* testimonial description */}
        <div className="mt-10 mb-2">
          <label>Description</label>
          <br />
          <textarea
            className="p-2 rounded-md w-full min-h-[100px] max-h-[130px]"
            name="description"
            value={testimonialFormData.description}
            onChange={handleOnChange}
          />
        </div>

        {/* Upload  date  */}
        <div className="mt-10 mb-2">
          <label>Date, Time (24-hr format)</label>
          <br />
          <input
            className="p-2 rounded-md w-full"
            name="date"
            type="datetime-local"
            value={testimonialFormData.date}
            onChange={handleOnChange}
          />
        </div>
        <Button
          onClick={handleEditTestimonial}
          className="text-white bg-black rounded-lg w-full mt-8 mb-4 hover:bg-gray-950 cursoer-pointer text-lg font-bold p-2"
        >
          {isLoading ? "Processing..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EditTestimonialModal;
