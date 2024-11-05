"use client";
import { useParams } from "next/navigation";
import React, {useState } from "react";
import Header from "./Header";
import useFetchSpaceByName from "@/app/(customer)/space/[spaceName]/useFetchSpaceByName";
import { TestimonialType } from "@/lib/schemas/schema";
import LoadingMessage from "@/components/LoadingMessage";
import {
  X,
} from "lucide-react";
import Button from "@/components/Button";
import TestimonialItem from "./TestimonialItem";
import axios from "axios";

const page = () => {
  const params = useParams();
  const { spaceName } = params;
  const [loading, setLoading] = useState<boolean>(true);
  
  const {space,setSpace} = useFetchSpaceByName({
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
      <div className="flex flex-col items-center min-h-[100vh] max-h-fit mt-3">
        {space?.testimonials?.map((testimonial: TestimonialType) => {
          return<>
           <TestimonialItem key={testimonial.id} space={space} testimonial={testimonial} setSpace={setSpace}/>;
          </>
        })}
      </div>
    </>
  );
};

export default page;
