"use client";
import Button from "@/components/Button";
import { SpaceType, User } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Space from "@/components/Space";
import { Session } from "next-auth";
// space name
// header title
// custom message
// Questions

interface EditSpaceModalProps {
  setVisible?: any;
  space?: SpaceType;
}

const InputSchema = z.object({
  updatedSpaceName: z.string(),
  header: z.string(),
  customMessage: z.string(),
  questions: z.array(z.string()).optional(),
});

const defaultQuestions: string[] = [
  "Who are you / what are you working on?",
  "How has [our product/ service] helped you?",
  "What is the best thing about [our product / service]",
];

type Input = z.infer<typeof InputSchema>;

const ModalContainer = ({ space }: { space: SpaceType }) => {
  const [inputData, setInputData] = useState<Input>({
    updatedSpaceName: space ? space.spaceName : "",
    header: space ? space.header : "",
    customMessage: space ? space.customMessage : "",
    questions: defaultQuestions,
  });
  
  const router = useRouter();

  /**
   * to verify in our backend user actually owns the space
   */
  const { data } = useSession();

  /**
   * we have to send old space name as argument to fetch the original space 
   */
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    spaceName: string
  ) => {
    try {
      const response = await axios.put("/api/space/edit", {
        ...inputData,
        ownerEmail: data!.user!.email,
        spaceName,
      });
      const {space} = await response.data;
      router.push(`/products/${space.spaceName}`);  
    } catch (error) {
      alert(error);
    }
  };

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
    <div className="w-[full] flex justify-between">
      <Space
        onSubmitTestimonial={() => {
          return;
        }}
        header={inputData.header}
        customMessage={inputData.customMessage}
        questions={inputData.questions}
        isPreview
      />
      <div className="w-[50%]">
        <h1 className="text-2xl font-bold my-1 w-[50%]">Edit Space</h1>
        <span className="mb-5">
          Set up a new space to collect and showase testimonials.
        </span>
        <div className="flex items-center w-[80%] justify-between mt-5">
          <span className="text-lg font-bold">Space Name</span>
          <input
            className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5] mx-w-full"
            placeholder="Enter Space name"
            name={"updatedSpaceName"}
            onChange={handleChange}
            value={inputData.updatedSpaceName}
          />
        </div>
        <div className="flex items-center w-[80%] justify-between mt-5">
          <span className="text-lg font-bold">Header Title</span>
          <input
            className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5] max-w-xl"
            placeholder="Share your experience!"
            name={"header"}
            onChange={handleChange}
            value={inputData.header}
          />
        </div>
        <div className="flex items-center w-[80%] justify-between mt-5">
          <span className="text-lg font-bold">Custom Message</span>
          <textarea
            className="p-1 border-[1px] border-slate-500 text-black bg-[#e6e5e5]"
            placeholder="Tell us What you think"
            name={"customMessage"}
            onChange={handleChange}
            value={inputData.customMessage}
          ></textarea>
        </div>
        <Button
          className="bg-slate-600 p-2 hover:bg-slate-700 cursor-pointer text-white text-md font-medium rounded-lg mt-6 relative right-0"
          onClick={(e) => {handleSubmit(e, space.spaceName)}}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
const EditSpaceModal = ({ setVisible, space }: EditSpaceModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
      <div className="flex max-h-fit py-4 px-8 absolute min-h-[500px] lg:max-w-[1500px] md:max-w-[1100px] min-w-[1000px] bg-[#fcf7d5] rounded-lg">
        <div className="w-full">
          <span
            className="w-full flex justify-end hover:opacity-80 cursor-pointer"
            onClick={(e) => setVisible(false)}
          >
            <X />
          </span>
          {<ModalContainer space={space!} />}
        </div>
      </div>
    </div>
  );
};

export default EditSpaceModal;
