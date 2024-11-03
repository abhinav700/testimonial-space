"use client";
import Button from "@/components/Button";
import { TestimonialFormDataType } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { useState } from "react";

interface TestimonialFormProps {
  spaceId: string;
  questions: string[];
  testimonialFormData: TestimonialFormDataType;
  handleSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;

  setShowTestimonialForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmissionPending: React.Dispatch<React.SetStateAction<boolean>>;

  setTestimonialFormData: React.Dispatch<
    React.SetStateAction<{
      description: string;
      customerName: string;
      customerEmail: string;
    }>
  >;
}

const TestimonialForm = ({
  spaceId,
  setShowTestimonialForm,
  questions,
  setTestimonialFormData,
  testimonialFormData,
  handleSubmit
}: TestimonialFormProps) => {
  console.log(testimonialFormData);
  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setTestimonialFormData({
      ...testimonialFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center overflow-y-scroll p-5">
      <div className="min-h-[200px] max-h-fit sm:w-[80%] md:w-[40%] w-full flex flex-col items-start bg-slate-200 rounded-lg p-5 mt-5 overflow-y-scroll">
        <span className="w-full flex justify-end">
          <X
            onClick={(e) => {
              setShowTestimonialForm(false);
            }}
            className="text-[#9e9a9a] cursor-pointer"
          />
        </span>
        <h1 className="text-lg font-bold">Write testimonial</h1>
        {/* TODO: Space logo should appear here */}
        <span className="mt-7">
          <span className="text-lg font-bold">Questions</span>
          <hr className="border-[2px] rounded-lg my-1 border-purple-600 w-[50%] overflow-y-scroll" />
        </span>
        <ul className="ml-4 mt-3">
          {questions &&
            questions.map((item: string, index: number) => (
              <li key={item} className="mt-2 list-disc">
                {item}
              </li>
            ))}
        </ul>
        <div className="w-full h-fit">
          {/* Description */}
          <textarea
            name="description"
            onChange={handleOnChange}
            className="w-full mt-3 rounded-lg min-h-[100px] p-3 border-[2px] border-[#aaaaaa] focus:outline-none focus:border-blue-700"
            value={testimonialFormData.description}
          />
          {/* Customer Name */}
          <span className="flex flex-col mt-6 w-full">
            <span>
              <span>Your Name</span>
              <span className="text-red-700 ml-1">*</span>
            </span>
            <input
              onChange={handleOnChange}
              name="customerName"
              className="p-1 border-[1px] border-[#aaaaaa] w-full mt-1"
              value={testimonialFormData.customerName}
            />
          </span>
          {/* Customer Email */}
          <span className="flex flex-col mt-6 w-full">
            <span>
              <span>Your Email</span>
              <span className="text-red-700 ml-1">*</span>
            </span>{" "}
            <input
              onChange={handleOnChange}
              name="customerEmail"
              className="p-1 border-[1px] border-[#aaaaaa] w-full mt-1"
              value={testimonialFormData.customerEmail}
            />
          </span>

          <span className="w-full flex justify-end mt-7">
            <Button
              onClick={(e) => {
                setShowTestimonialForm(false);
              }}
              className="py-2 px-3 mx-2 border-[1px] rounded-lg border-[#aaaaaa] hover:bg-[#dfdbdb]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="py-2 px-3 mx-2 border-[1px] bg-purple-700 hover:bg-purple-800 rounded-lg text-white"
            >
              Send
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
