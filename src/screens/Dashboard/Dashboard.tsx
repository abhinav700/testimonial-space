"use client";
import Button from "@/components/Button";
import useFetchAllSpaces from "@/lib/hooks/space/useFetchAllSpaces";
import useCreateUser from "@/lib/hooks/user/useCreateUser";
import { Space, User } from "@/lib/schemas/schema";
import { MessageSquareIcon, Plus, VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import CreateSpaceModal from "./CreateSpaceModal";

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
  const spaces: Space[] | null = useFetchAllSpaces(user?.email);
  const [showCreateSpaceModal, setShowCreateSpaceModal] = useState<boolean>(false);

  const handleShowCreateSpaceModal = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      setShowCreateSpaceModal(true);
    } catch (error) {
      
    }
  }

  const overViewItems: OverViewItem[] = [
    {
      title: "Total Testimonials",
      description: "0/2",
      endIcon: <VideoIcon />,
    },
    {
      title: "Total spaces",
      description: spaces ? spaces.length : 0,
      endIcon: <MessageSquareIcon />,
    },
  ];

  return (
    <section className="px-4 py-6 w-full min-h-[150vh] max-h-fit flex flex-col items-center" id="dashboard">
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
        <h1 className="md:text-3xl text-lg my-4 font-bold">Overview</h1>
        <div className="w-full flex flex-wrap justify-between">
          {user && showCreateSpaceModal && <CreateSpaceModal visible={showCreateSpaceModal} setVisible={setShowCreateSpaceModal} user={user}/>}
          {overViewItems.map((item: OverViewItem) => (
            <div className="w-[45%] rounded-lg mt-4 p-4 bg-[#e6ffd1] max-400px">
              <div className="flex justify-between">
                <span className="text-lg font-medium text-slate-800">
                  {item.title}
                </span>
                {item.endIcon}
              </div>
              <span className="font-bold text-2xl my-2">
                {item.description}
              </span>
            </div>
          ))}
        </div>
        {/* Spaces */}
        <div className="flex justify-between items-center mt-6 w-full">
          <h1 className="sm:text-3xl text-lg font-bold">Spaces</h1>
          <Button
            className="p-3 text-white cursor-pointer flex justify-between items-center bg-[#207027] rounded-lg hover:bg-[#168f3b]"
            onClick= {handleShowCreateSpaceModal}
          >
            <span className="mr-2">
              <Plus />
            </span>
            <span >Create new space</span>
          </Button>
        </div>
        {user && spaces && spaces?.length > 0 ? (
          spaces?.map((item: Space) => (
            <div className="cursor-pointer w-full flex flex-col items-start my-4 bg-[#dddddd] rounded-lg p-4 hover:bg-[#c2bfbf]">
              <h2 className="text-xl font-bold">{item.spaceName}</h2>
              <div className="flex mt-3 items-center">
                <MessageSquareIcon />
                <span className="mx-2">Text: 0</span>
              </div>
            </div>
          ))
        ) : (
          <span className="mt-16 text-4xl flex justify-center font-bold w-full">No spaces to display</span>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
