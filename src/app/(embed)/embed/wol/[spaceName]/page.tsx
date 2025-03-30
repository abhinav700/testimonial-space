"use client"
import useFetchSpaceByName from "@/app/(customer)/space/[spaceName]/useFetchSpaceByName";
import TestimonialItem from "@/app/(user)/products/[spaceName]/Components/TestimonialItem";
import LoadingMessage from "@/components/LoadingMessage";
import { TestimonialType } from "@/lib/schemas/schema";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import EmbeddedTestimonial from "../../testimonial/[id]/page";

interface EmbeddedWolProps {
  spaceName: string;
}

const EmbeddedWol = ({ spaceName }: EmbeddedWolProps) => {
  const params = useParams();
  const { spaceNameParam } = params;
  const [loading, setLoading] = useState(true);

  const { space } = useFetchSpaceByName({
    spaceName: spaceName ? spaceName : (spaceNameParam as string),
    setLoading,
  });

  const testimonials: TestimonialType[] = space ? space?.testimonials! : [];
  console.log(testimonials);
  if (loading) return <LoadingMessage />;

  if (!space)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Space does not exist.</span>
      </div>
    );

  return (
    <div className="overflow-y-auto my-5 h-[800px]">
      <div className="flex w-full justify-around flex-wrap">
        {testimonials.map((testimonial) => {
          return (
            <>
              {/* // <div className="m-2 w-full bg-blue-700 flex justify-center flex-wrap overflow-y-auto"> */}

              <EmbeddedTestimonial testimonialData={testimonial} />
              {/* // </div> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default EmbeddedWol;
