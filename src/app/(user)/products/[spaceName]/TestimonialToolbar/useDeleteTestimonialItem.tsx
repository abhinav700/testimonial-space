import Button from "@/components/Button";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import axios from "axios";
import { X } from "lucide-react";
import { space } from "postcss/lib/list";
import React, { SetStateAction, useState } from "react";

interface DeleteModalProps {
  id: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteTestimonial: (id: string) => void;
}
const DeleteModal = ({
  id,
  setShowDeleteModal,
  handleDeleteTestimonial,
}: DeleteModalProps) => {
  // document.body.style.overflow = "hidden";

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
      <div className="max-h-[500px] min-h-[200px] w-[30%] flex flex-col items-center bg-slate-200 rounded-lg">
        <span className="w-full flex justify-end px-4 mt-1">
          <X
            onClick={(e) => setShowDeleteModal(false)}
            className="hover:bg-opacity-60 cursor-pointer"
          />
        </span>
        <h1 className="text-2xl font-bold mt-4 text-center w-full p-1">
          Are you sure you want to delete this testimonial?
        </h1>
        <div className="flex w-[300px] justify-around h-full mt-8">
          <Button
            className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white cursor-pointer text-xl rounded-lg"
            onClick={(e) => handleDeleteTestimonial(id)}
          >
            Yes
          </Button>
          <Button
            className="py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer text-xl rounded-lg"
            onClick={(e) => {
              setShowDeleteModal(false);
            }}
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};


interface useDeleteTestimonialItemProps {
  setSpace: React.Dispatch<SetStateAction<SpaceType | null>>;
  space: SpaceType;
}
const useDeleteTestimonialItem = ({
  setSpace,
  space,
}: useDeleteTestimonialItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const response = await axios.delete(`/api/testimonial/delete?id=${id}`);
      const data = await response.data;

      if (data.status == 200) {
        const updatedData: SpaceType = {
          ...space,
          testimonials: space?.testimonials?.filter(
            (item: any) => item.id != id
          ),
        };
        setSpace(updatedData);
        alert(data.msg);
      } else {
        alert("operation failed");
      }
    } catch (error) {
      alert("Operation failed");
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return {showDeleteModal, setShowDeleteModal, handleDeleteTestimonial, DeleteModal}
};

export default useDeleteTestimonialItem;
