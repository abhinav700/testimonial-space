import React from "react";
import Button from "./Button";
import { PenSquareIcon } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface SpaceProps {
  header?: string;
  customMessage?: string;
  spaceName?: string;
  questions?: string[];
  onSubmitTestimonial?: () => void;
  isPreview:boolean;
}

const Space = ({
  header,
  customMessage,
  spaceName,
  questions,
  onSubmitTestimonial,
  isPreview
}: SpaceProps) => {

 const handleSubmit= () =>{

 }
  return (
    <>
      <span className="bg-green-800 px-2 py-1 font-semibold h-fit w-fit text-md absolute top-[25px] left-[65px] rounded-full text-white">
        Live Preview
      </span>
      <div className="w-max-[700px] w-min-[400px] h-min-[700px] h-max-full py-5 px-6 mr-3 rounded-lg border-2 border-slate-800 flex flex-col items-start">
        <div className="flex flex-col items-center w-full h-full text-wrap">
          <h1 className="md:text-3xl text-xl mt-4 font-bold w-full text-center">{header}</h1>
          <span className="text-slate-900 mt-4 font-light w-full text-center">
            {customMessage}
          </span>
        </div>
        <h2 className="text-lg font-bold mt-7">QUESTIONS</h2>
        <ul className="">
          {questions?.map((item, index) => {
            return (
              <li key={index} className="list-disc mt-2 text-[#5a5959] font-medium">
                {item}
              </li>
            );
          })}
        </ul>
        <Button
          onClick={onSubmitTestimonial ? onSubmitTestimonial : handleSubmit}
          className="w-full p-2 mt-8 bg-slate-950 font-semibold  text-white text-center rounded-lg hover:bg-slate-900 flex justify-center"
        >
          <span className="flex items-center">
            <span className="mx-2">Send Testimonial</span>
            <PenSquareIcon />
          </span>
        </Button>
      </div>
    </>
  );
};

export default Space;
