"use client";
import Button from "@/components/Button";
import { User } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { z } from "zod";
// space name
// header title
// custom message
// Questions

interface CreateSpaceModalProps {
  visible?: boolean;
  setVisible?: any;
  user?: User
}

const InputSchema = z.object({
  spaceName: z.string(),
  headerTitle: z.string(),
  customMessage: z.string(),
});

type Input = z.infer<typeof InputSchema>;

const SpaceForm = () => {
  const [inputData, setInputData] = useState<Input>({
    spaceName: "",
    headerTitle: "",
    customMessage: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-[80%] justify-between mt-5">
        <span className="text-lg font-bold">Space Name</span>
        <input
          className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5] mx-w-full"
          placeholder="Enter Space name"
          name={"spaceName"}
          onChange={handleChange}
          value={inputData.spaceName}
        />
      </div>
      <div className="flex items-center w-[80%] justify-between mt-5">
        <span className="text-lg font-bold">Header Title</span>
        <input
          className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5]"
          placeholder="Share your experience!"
          name={"headerTitle"}
          onChange={handleChange}
          value={inputData.headerTitle}
        />
      </div>
      <div className="flex items-center w-[80%] justify-between mt-5">
        <span className="text-lg font-bold">Custom Message</span>
        {/* <input
            className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5]"
            placeholder="Enter Space name"
            name={"customMessage"}
            onChange={handleChange}
            value={inputData.customMessage}
          /> */}
        <textarea
          className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5]"
          placeholder="Tell us What you think"
          name={"customMessage"}
          onChange={handleChange}
          value={inputData.customMessage}
        ></textarea>
      </div>
    </div>
  );
};

const ModalContainer = () => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold my-1">Create a new Space</h1>
        <span>Set up a new space to collect and showase testimonials.</span>
      </div>
      {<SpaceForm />}
    </>
  );
};
const CreateSpaceModal = ({user, visible, setVisible}: CreateSpaceModalProps) => {
  
  return (
    <div className="z-10 py-6 absolute left-0 top-0 flex justify-center items-center h-[200vh] w-[100vw] backdrop-blur-[1px]">

      <div className="max-w-full max-h-fit p-4 absolute min-h-[500px] min-w-[500px] bg-[#beffb6] rounded-lg">
        <span className="w-full flex justify-end hover:opacity-80 cursor-pointer" onClick={(e)=>setVisible(false)}><X/></span>
        {<ModalContainer />}
        <Button className="bg-slate-600 p-3 hover:bg-slate-700 cursor-pointer text-white text-md font-medium rounded-lg mt-6 relative right-0" onClick={(e:any)=>{console.log('')}}>Create Space</Button>
      </div>
    </div>
  );
};

export default CreateSpaceModal;
