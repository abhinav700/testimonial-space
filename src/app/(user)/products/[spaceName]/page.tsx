"use client";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import Header from "./Header";
import useFetchSpaceByName from "@/app/(customer)/space/[spaceName]/useFetchSpaceByName";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import LoadingMessage from "@/components/LoadingMessage";

const page = () => {
  const params = useParams();
  const { spaceName } = params;
  const [loading, setLoading] = useState<boolean>(true);

  const space = useFetchSpaceByName({
    setLoading,
    spaceName: spaceName as string,
  });

  if (loading) {
    return <LoadingMessage />;
  }

  if (!space) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Space does not exist.</span>
      </div>
    );
  }
  return (
    <>
      <Header
        totalTestimonials={space.testimonials ? space.testimonials.length : 0}
        spaceName={space.spaceName}
      />
      <div className="flex flex-col items-center">
        {space?.testimonials?.map((testimonial: TestimonialType) => {
          console.log(testimonial)
          return (
            <div className="w-[90%] sm:w-[70%] md:w-[50%] min-h-[150px] max-h-[500px] flex flex-col justify-between items-start p-4 my-2 rounded-md bg-[#aaaaaa]">
              <p>{testimonial.description}</p>
              <div className="w-full flex justify-between">
                <span className="flex flex-col items-start">
                  <span className="font-bold text-black">Name</span>
                  <span>{testimonial.customerName}</span>
                </span>
                <span className="flex flex-col items-start">
                  <span className="font-bold text-black">Submitted At</span>
                  <span>{new Date(testimonial.createdAt!).toLocaleString()}</span>
                </span>
                
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
