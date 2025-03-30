import Button from "@/components/Button";
import { Code, Link, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import EmbedTestimonialModal from "../EmbedTestimonialModal/EmbedTestimonialModal";
import { TestimonialType } from "@/lib/schemas/schema";

interface ShareMenuOptionsProps {
  showShareMenuOptions: boolean;
  setShowShareMenuOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEmbedTestimonialModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShareButtonProps {
  testimonial: TestimonialType;
}

const ShareMenuOptions = ({
  showShareMenuOptions,
  setShowShareMenuOptions,
  setShowEmbedTestimonialModal,
}: ShareMenuOptionsProps) => {
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
      setShowShareMenuOptions(false);
    }
  };

  useEffect(() => {
    if (showShareMenuOptions)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenuOptions]);
  return (
    <div
      ref={shareMenuRef}
      className="text-sm max-h-fit mr-[250px] absolute z-0 mt-[50px] w-[200px] flex flex-col items-start bg-slate-200 rounded-md"
    >
      <span
        className="p-2 hover:bg-slate-300 w-full text-left cursor-pointer flex items-center"
        onClick={() => {
          setShowEmbedTestimonialModal(true);
          setShowShareMenuOptions(false);
        }}
      >
        <Code className="text-tiny mr-3" />
        Embed the testimonial
      </span>
      <span className="p-2 hover:bg-slate-300 w-full text-left cursor-pointer flex items-center">
        <Link className="text-tiny mr-3" />
        Get the link
      </span>
    </div>
  );
};

const ShareButton = ({

  testimonial,
}: ShareButtonProps) => {
  const [showEmbedTestimonialModal, setShowEmbedTestimonialModal] =
    useState<boolean>(false);
  const [showShareMenuOptions, setShowShareMenuOptions] =
    useState<boolean>(false);
  return (
    <>
      {showEmbedTestimonialModal && (
        /**
         * Activated by Embed the testimonial option in share button.
         * It generates an <iframe> for embeding the testimonial.
         */
        <EmbedTestimonialModal
          testimonial={testimonial}
          setShowEmbedTestimonialModal={setShowEmbedTestimonialModal}
        />
      )}
      <div className="flex flex-col">
        <Button
          className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
          onClick={() => {
            setShowShareMenuOptions(!showShareMenuOptions);
          }}
        >
          <div className="text-black flex items-center">
            <Share2 className="text-tiny mr-3" />
            <span>Share</span>
          </div>
        </Button>
        {showShareMenuOptions && (
          <ShareMenuOptions
            showShareMenuOptions={showShareMenuOptions}
            setShowShareMenuOptions={setShowShareMenuOptions}
            setShowEmbedTestimonialModal={setShowEmbedTestimonialModal}
          />
        )}
      </div>
    </>
  );
};

export default ShareButton;
