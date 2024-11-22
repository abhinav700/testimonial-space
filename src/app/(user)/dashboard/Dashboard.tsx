"use client";
import Button from "@/components/Button";
import useFetchAllSpaces from "@/lib/hooks/space/useFetchAllSpaces";
import useCreateUser from "@/lib/hooks/user/useCreateUser";
import { SpaceType, User } from "@/lib/schemas/schema";
import { LayoutIcon, MessageSquareIcon, Plus, Trash2, VideoIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface OverViewItem {
  title: ReactNode;
  description: ReactNode;
  endIcon?: ReactNode;
}
//
//
//
// ADD A ONE TO MANY RELATIONSHIP BETWEEN TESTIMONIAL AND SPACE
// SEE HOW CONNECT WORKS IN PRISMA
// ADDING A TESTIMONIAL SHOULD AUTOMATICALLY LINK IT TO THE SPACE IT BELONGS TO
//
//
const Dashboard = () => {
  const { data } = useSession();
  const user: User | null = useCreateUser(data);
  const { setSpaces, spaces } = useFetchAllSpaces(user?.email);
  const [showCreateSpaceModal, setShowCreateSpaceModal] =
    useState<boolean>(false);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const router = useRouter()
  const DeleteModal = ({ id }: { id: string }) => {
    // document.body.style.overflow = "hidden";
    return (
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
      <div className="max-h-[500px] min-h-[200px] w-[30%] flex flex-col items-center bg-slate-200 rounded-lg">
        <span className="w-full flex justify-end px-4 mt-1">
        <X onClick={(e)=> setShowDeleteModal(false)} className="hover:bg-opacity-60 cursor-pointer"/>

        </span>
          <h1 className="text-2xl font-bold mt-4">Are you sure you want to delete this?</h1>
          <div className="flex w-[300px] justify-around h-full mt-8">
            <Button className="py-2 px-3 bg-red-700 hover:bg-red-800 text-white cursor-pointer text-xl rounded-lg" onClick={(e) => handleDeleteSpace(id)}>Yes</Button>
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

  const handleShowCreateSpaceModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setShowCreateSpaceModal(true);
    } catch (error) {}
  };

  const handleDeleteSpace = async (id: string) => {
    try {
      const response = await axios.delete(`/api/space/delete?id=${id}`);
      const data = await response.data;
      if (data.status == 200) {
        setSpaces(spaces!.filter((item) => item.id != id));
      }
      alert(data.msg);
    } catch (error) {
      alert(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  let totalTestimonials = 0;
  spaces?.map((item: SpaceType)=>{
     totalTestimonials += item.testimonials ? item.testimonials.length : 0
  })

  const overViewItems: OverViewItem[] = [
    {
      title: "Total Testimonials",
      description: totalTestimonials,
      endIcon: <MessageSquareIcon />,
    },
    {
      title: "Total spaces",
      description: spaces ? spaces.length : 0,
      endIcon: <LayoutIcon/>,
    },
  ];

  return (
    <section
      className="px-4 py-6 w-full min-h-[150vh] max-h-fit flex flex-col items-center"
      id="dashboard"
    >
      <div className="w-[80%] h-full">
        <div className="flex flex-wrap justify-around items-center max-h-[700px] p-4 bg-[hsl(116,100%,97%)]">
          {/* Demo message which appears at top of dashboard */}
          <div className="max-w-[40%] min-w-[30%] h-full mx-2 my-4 flex flex-col justify-between rounded-lg bg-[#086126] p-5">
            <div>
              <h1 className="text-[#e1f5dc] my-1 font-bold md:text-2xl text:lg">
                Here's a quick demo for you
              </h1>
              <span className="text-white font-medium md:text-lg">
                You will find everything you need to get started to collect and
                build a testimonial wall
              </span>
            </div>
          </div>
          {/* // Product Demo */}
          <video className="max-w-[50%] mx-2 h-full" controls>
            <source
              src="/assets/screens/completed/Design.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <hr className="border-[2px] mt-10" />

        {/* Overview */}
        <h1 className="md:text-2xl text-lg my-4 font-bold">Overview</h1>
        <div className="w-full flex flex-wrap justify-between">
          {user && showCreateSpaceModal && (
            <CreateSpaceModal
              setVisible={setShowCreateSpaceModal}
              user={user}
            />
          )}
          {overViewItems.map((item: OverViewItem, index) => (
            <div
              key={index}
              className="w-[45%] rounded-lg mt-4 p-3 bg-[#e6ffd1] max-400px"
            >
              <div className="flex justify-between">
                <span className="text-lg font-medium text-slate-800">
                  {item.title}
                </span>
                {item.endIcon}
              </div>
              <span className="font-bold text-xl my-2">
                {item.description}
              </span>
            </div>
          ))}
        </div>
        {/* Spaces */}
        <div className="flex justify-between items-center my-6 w-full">
          <h1 className="sm:text-2xl text-lg font-bold">Spaces</h1>
          <Button
            className="px-1 py-2 text-white cursor-pointer flex justify-between items-center bg-[#207027] rounded-lg hover:bg-[#168f3b]"
            onClick={handleShowCreateSpaceModal}
          >
            <span className="mr-2">
              <Plus className="text-sm" />
            </span>
            <span>Create new space</span>
          </Button>
        </div>
        {user ? (
          spaces && spaces?.length > 0 ? (
            spaces?.map((item: SpaceType) => (
              <>
              {showDeleteModal && <DeleteModal id={item.id}/>}
                <div className="w-full rounded-lg p-4 cursor-pointer my-4 bg-[#dddddd] hover:bg-[#c2bfbf] flex justify-between items-center"
                  onClick={(e)=>{router.push(`/products/${item.spaceName}`)}}
                  key={item.id}
                >
                  <div
                    className="flex flex-col w-fit items-start"
                  >
                    <h2 className="text-xl font-bold">{item.spaceName}</h2>
                    <div className="flex mt-3 items-center">
                      <MessageSquareIcon />
                      <span className="mx-2">Testimonials: {item.testimonials? item.testimonials.length : 0}</span>
                    </div>
                  </div>
                  <Button
                    className="bg-red-600 h-fit py-2 px-3 rounded-lg text-white  hover:bg-red-700 flex items-center justify-around"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 />
                    <span className="ml-2">Delete</span>
                  </Button>
                </div>
              </>
            ))
          ) : (
            <span className="mt-16 text-4xl flex justify-center font-bold w-full">
              No spaces to display
            </span>
          )
        ) : (
          <span className="mt-16 text-4xl flex justify-center font-bold w-full">
            Processing...
          </span>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
