import Button from "@/components/Button";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import axios from "axios";
import {
  Share2,
  PenIcon,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { useState } from "react";
const DeleteModal = ({
  id,
  setShowDeleteModal,
  handleDeleteTestimonial,
}: {
  id: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteTestimonial: (id: string) => void;
}) => {
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
const TestimonialItem = ({
  testimonial,
  space,
  setSpace,
}: {
  testimonial: TestimonialType;
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType | null>>;
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          id={testimonial.id}
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteTestimonial={handleDeleteTestimonial}
        />
      )}
      <div className="w-[90%] sm:w-[70%] md:w-[50%] min-h-[150px] max-h-[500px] flex flex-col justify-between items-start p-4 my-2 rounded-md bg-[#d1f3e6]">
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

          {/* Options to share, edit and delete the testimonial */}

          {showMenu && (
            <div className="w-full flex justify-end items-center mt-3">
              <Button
                className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
                onClick={(e) => {}}
              >
                <Share2 className="text-tiny" />
                <span className="text-black ml-1">Share</span>
              </Button>
              <Button
                className="h-fit py-2 px-3 rounded-lg text-black text-md hover:bg-[#b3cec3] flex items-center justify-around"
                onClick={(e) => {}}
              >
                <PenIcon className="text-tiny" />
                <span className="text-black ml-1">Edit</span>
              </Button>
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
            </div>
          )}
          {/* Icon to trigger the menu */}
          <div className="w-full flex justify-end h-[fit]">
            {showMenu ? (
              <Button
                onClick={(e) => {
                  setShowMenu(false);
                }}
              >
                <ChevronUp className="cursor-pointer" />
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  setShowMenu(true);
                }}
              >
                <ChevronDown className="cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialItem;
