"use client";
import Button from "@/components/Button";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import TestimonialForm from "./TestimonialForm";
import useFetchSpaceByName from "./useFetchSpaceByName";
import { PenSquareIcon } from "lucide-react";
import { SpaceType, TestimonialFormDataType } from "@/lib/schemas/schema";
import axios from "axios";
import LoadingMessage from "@/components/LoadingMessage";

const page = () => {
  const params = useParams();
  const { spaceName } = params;

  const [showTestimonialForm, setShowTestimonialForm] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [isSubmissionPending, setIsSubmissionPending] =
    useState<boolean>(false);

  const {space}: {space: SpaceType | null }= useFetchSpaceByName({
    spaceName: spaceName as string,
    setLoading,
  });

  const [testimonialFormData, setTestimonialFormData] =
    useState<TestimonialFormDataType>({
      description: "",
      customerName: "",
      customerEmail: "",
    });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setIsSubmissionPending((isSubmissionPending) => true);
      setShowTestimonialForm((showTestimonialForm) => false);
      const response = await axios.post("/api/testimonial/create", {
        ...testimonialFormData,
        spaceId: space?.id,
      });
      const { testimonial } = await response.data;
      alert("operation successful");
    } catch (error) {
      console.log(error);
      alert("Could not submit testimonial due to some error");
    } finally {
      setIsSubmissionPending((isSubmissionPending) => false);
      setTestimonialFormData({
        description: "",
        customerName: "",
        customerEmail: "",
      });
    }
  };

  if (loading) {
    return (
     <LoadingMessage/>
    );
  } else if (!space) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Space does not exist.</span>
      </div>
    );
  } else
    return (
      <div className="w-full max-h-[300vh] flex justify-center items-center">
        {showTestimonialForm && (
          <TestimonialForm
            spaceId={space!.id}
            questions={space!.questions}
            setShowTestimonialForm={setShowTestimonialForm}
            setIsSubmissionPending={setIsSubmissionPending}
            setTestimonialFormData={setTestimonialFormData}
            testimonialFormData={testimonialFormData}
            handleSubmit={handleSubmit}
          />
        )}
        <h1 className="text-xl font-bold">
          <div className="w-max-[700px] w-min-[400px] h-min-[700px] h-max-full py-5 px-6 mr-3 flex flex-col items-start">
            <div className="flex flex-col items-center w-full h-full text-wrap">
              <h1 className="md:text-3xl text-xl mt-4 font-bold w-full text-center">
                {space.header}
              </h1>
              <span className="text-slate-900 mt-4 font-light w-full text-center">
                {space.customMessage}
              </span>
            </div>
            <h2 className="text-lg font-bold mt-10">QUESTIONS</h2>
            <ul className="mt-4">
              {space.questions?.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-disc mt-3 text-[#5a5959] font-medium"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
            <Button
              onClick={(e) => {
                setShowTestimonialForm((prev: any) => true);
              }}
              className="w-full p-2 mt-16 bg-slate-950 font-semibold  text-white text-center rounded-lg hover:bg-slate-900 flex justify-center"
            >
              {isSubmissionPending ? (
                <span>Processing...</span>
              ) : (
                <span className="flex items-center">
                  <span className="mx-2">Send Testimonial</span>
                  <PenSquareIcon />
                </span>
              )}
            </Button>
          </div>
        </h1>
      </div>
    );
};

export default page;
