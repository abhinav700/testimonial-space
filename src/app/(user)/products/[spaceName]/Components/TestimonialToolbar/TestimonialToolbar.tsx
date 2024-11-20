import Button from "@/components/Button";
import EmbedTestimonialModal from "@/app/(user)/products/[spaceName]/Components/EmbedTestimonialModal/EmbedTestimonialModal";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import { Code, Link, PenIcon, Share2, Trash2 } from "lucide-react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import EditTestimonialModal from "../EditTestimonialModal/EditTestimonialModal";
import DeleteButton from "./DeleteButton";
import ShareButton from "./ShareButton";
import EditButton from "./EditButton";

interface TestimonialToolbarProps {
  testimonial: TestimonialType;
}

const TestimonialToolbar = ({
  testimonial,

}: TestimonialToolbarProps) => {


  return (
    <>
      <div className="w-full flex justify-end items-center mt-3">
        <ShareButton
          testimonial={testimonial}
        />
        <DeleteButton testimonial={testimonial} />
        <EditButton testimonial={testimonial}/>
      </div>
    </>
  );
};

export default TestimonialToolbar;
