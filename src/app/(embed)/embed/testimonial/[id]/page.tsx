"use client"
import LoadingMessage from "@/components/LoadingMessage";
import { TestimonialType } from "@/lib/schemas/schema";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface embedProps{
  testimonialData?: TestimonialType;
}

const EmbeddedTestimonial = ({testimonialData}:embedProps) => {
  const [testimonial, setTestimonial] = useState<TestimonialType | null |undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const { id } = params;

  const fetchTestimonial = useCallback(async () => {
    try {
      const response = await axios.get(`/api/testimonial/fetch?id=${id}`);
      const data = await response.data;

      if (data.status == 200) setTestimonial(await data.testimonial);
      else alert(await data.msg);
    } catch (error) {
      console.log(error)
      // alert("Failed to fetch the testimonial");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(()=>{
    if(!testimonialData)
      fetchTestimonial();
    else{
      setTestimonial(testimonialData);
      setLoading(false);
    }
  }, [])
  if (loading) return <LoadingMessage />;

  else if (!testimonial) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Testimonial does not exist.</span>
      </div>
    );
  }

 else return (
    <div className="w-full h-full flex justify-center">

    <div className="w-[90%] sm:w-[70%] md:w-[50%] min-h-[150px] max-h-[500px] flex flex-col justify-between items-start p-4 my-2 rounded-md bg-[#ebf3d6]">
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
      </div>
    </div>
    </div>
  );
};

export default EmbeddedTestimonial;
