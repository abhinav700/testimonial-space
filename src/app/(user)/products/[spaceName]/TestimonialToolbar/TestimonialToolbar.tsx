import Button from "@/components/Button";
import { Code, Link, PenIcon, Share2, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";

interface TestimonialToolbarProps {
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
}

const TestimonialToolbar = ({
  setShowDeleteModal,
}: TestimonialToolbarProps) => {
  const [showShareMenuOptions, setShowShareMenuOptions] =
    useState<boolean>(false);

  const DeleteButton = () => {
    return (
      <span className="flex items-center text-md p-1 mx-1">
        <Button
          className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
          onClick={(e) => {
            setShowDeleteModal(true);
          }}
        >
          <Trash2 />
          <span className="ml-2">Delete</span>
        </Button>
      </span>
    );
  };

  const EditButton = () => {
    return (
      <>
        <Button
          className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
          onClick={(e) => {}}
        >
          <PenIcon className="text-tiny" />
          <span className="text-black ml-1">Edit</span>
        </Button>
      </>
    );
  };

  const ShareButton = () => {
    const ShareMenuOptions = () => {
      return (
        <div
          className="text-sm max-h-fit mr-[250px] absolute mt-[50px] w-[200px] flex flex-col items-start bg-slate-200 rounded-md"
        >
          <span className="p-2 hover:bg-slate-300 w-full text-left cursor-pointer flex items-center">
            <Code className="text-tiny mr-3" />
            Embed
          </span>
          <span className="p-2 hover:bg-slate-300 w-full text-left cursor-pointer flex items-center">
            <Link className="text-tiny mr-3" />
            Get the link
          </span>
        </div>
      );
    };

    return (
      <div className="flex flex-col">
        <Button
          className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
          onClick={(e) => {
            setShowShareMenuOptions(!showShareMenuOptions);
          }}
        >
          <div className="text-black flex items-center">
            <Share2 className="text-tiny mr-3" />
            <span>Share</span>
          </div>
        </Button>
        {showShareMenuOptions && <ShareMenuOptions />}
      </div>
    );
  };

  return (
    <div className="w-full flex justify-end items-center mt-3">
      <ShareButton />
      <DeleteButton />
      <EditButton />
    </div>
  );
};

export default TestimonialToolbar;
