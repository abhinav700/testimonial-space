"use client";
import LoadingMessage from "@/components/LoadingMessage";
import { TestimonialType } from "@/lib/schemas/schema";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import useStyles from "./useStyles";

interface embedProps {
  testimonialData?: TestimonialType;
}

const EmbeddedTestimonial = ({ testimonialData }: embedProps) => {
  const [testimonial, setTestimonial] = useState<
    TestimonialType | null | undefined
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const { id } = params;

  const searchParams = useSearchParams();
  const style = useStyles(searchParams);

  const fetchTestimonial = useCallback(async () => {
    try {
      const response = await axios.get(`/api/testimonial/fetch?id=${id}`);
      const data = await response.data;

      if (data.status == 200) setTestimonial(await data.testimonial);
      else alert(await data.msg);
    } catch (error) {
      console.log(error);
      // alert("Failed to fetch the testimonial");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!testimonialData) fetchTestimonial();
    else {
      setTestimonial(testimonialData);
      setLoading(false);
    }
  }, []);
  if (loading) return <LoadingMessage />;
  else if (!testimonial) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Testimonial does not exist.</span>
      </div>
    );
  } else
    return (
      // <div className="min-w-[200px] max-w-fit flex-grow min-h-[300px] max-h-fit flex">
        <div style={style} className="lg:min-w-[320px] lg:max-w-[500px] md:min-w-[300px] min-w-[200px] flex-grow min-h-[150px] max-h-fit flex flex-col justify-between p-4 m-1 rounded-md">
          <p>{testimonial.description}</p>

          <div className="flex flex-col" style={{alignItems:style.alignItems}}>
            <span className="text-wrap">{testimonial.customerName}</span>
            <span className="text-wrap">{new Date(testimonial.createdAt!).toLocaleString()}</span>
          </div>
        </div>
        // </div>
    );
};

export default EmbeddedTestimonial;
