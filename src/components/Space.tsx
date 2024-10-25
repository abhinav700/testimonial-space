import React from "react";
import Button from "./Button";

interface SpaceProps {
  header?: string;
  customMessage?: string;
  spaceName?: string;
  questions?: string[];
}

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log("Button clicked");
};

const Space = ({ header, customMessage, spaceName, questions }: SpaceProps) => {
  return (
    <>
    <span className="bg-green-800 px-2 py-1 font-semibold h-fit w-fit text-md absolute top-[25px] left-[65px] rounded-full text-white">Live Preview</span>
    <div className="w-max-[700px] w-min-[400px] h-min-[700px] h-max-full py-5 px-6 mr-3 rounded-lg border-2 border-slate-800 flex flex-col items-start">
      <div className="flex flex-col items-center w-full h-full">
        <h1 className="md:text-3xl text-xl mt-4 font-bold">{header}</h1>
        <span className="text-slate-900 mt-4 font-light ">{customMessage}</span>
      </div>
      <h2 className="text-lg font-bold mt-7">QUESTIONS</h2>
      <ul className="">
        {questions?.map((item, index) => {
          return (
            <li className="list-disc mt-2 text-[#5a5959] font-medium">
              {item}
            </li>
          );
        })}
      </ul>
      <Button
        onClick={handleSubmit}
        className="w-full px-2 py-1 mt-8 bg-slate-950 font-semibold  text-white text-center rounded-lg hover:bg-slate-900"
        >
        Send Testimonial
      </Button>
    </div>
        </>
  );
};

export default Space;
