"use client";
import { useParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
import Header from "./Components/Header";
import useFetchSpaceByName from "@/app/(customer)/space/[spaceName]/useFetchSpaceByName";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import LoadingMessage from "@/components/LoadingMessage";

import TestimonialItem from "./Components/TestimonialItem";
import EditSpaceModal from "./Components/EditSpaceModal/EditSpaceModal";
import { useSession } from "next-auth/react";
import SideBar, { SidebarSectionKey } from "./Components/SideBar/SideBar";
import WolManager from "./Components/WallOfLove/WolManager";

 

const page = () => {
  const params = useParams();
  const { spaceName } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditSpaceModal, setShowEditSpaceModal] = useState<boolean>(false);
  const [showEditTestimonialModal, setShowEditTestimonialModal] =
  useState<boolean>(false);
  const [activeSectionKey, setActiveSectionKey] = useState<SidebarSectionKey>("EMBED_WIDGETS");
  const [isSidebarItemOpen, setIsSidebarItemOpen] = useState<boolean>(false);
  
  const closeSidebarItemModal = () => {
    setIsSidebarItemOpen(false);  
    setActiveSectionKey(null)
  };
  const renderContent = () => {
    try{
      if(!isSidebarItemOpen)
        setIsSidebarItemOpen(true);
      switch(activeSectionKey){
        case "WALL_OF_LOVE":
          
          return <WolManager open={isSidebarItemOpen} handleClose={closeSidebarItemModal}/>
        case "EMBED_WIDGETS":
          return <></>  
        default:
          <h3>Failed to load text</h3>
      }
    }catch(e){
      console.log(e);
    }
  }

  const user = useSession();
  
  const { space, setSpace } = useFetchSpaceByName({
    setLoading,
    spaceName: spaceName as string,
  });
  
  console.log(space)
  if (loading) {
    return <LoadingMessage />;
  }

  if (!space) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-3xl font-bold">Space does not exist.</span>
      </div>
    );
  }
  return (
    <>
      {renderContent()}
      {showEditSpaceModal && user?.data && (
        <EditSpaceModal setVisible={setShowEditSpaceModal} space={space} />
      )}

      <Header
        totalTestimonials={space.testimonials ? space.testimonials.length : 0}
        spaceName={space.spaceName}
        setShowEditSpaceModal={setShowEditSpaceModal}
      />

      {/* Display sidebar and testimonials */}
      <div className="w-full justify-between flex">
        <SideBar space= {space} activeSectionKey={activeSectionKey} setActiveSectionKey={setActiveSectionKey}/>
        {/* Display all the testimonials */}
        <div className="w-[60%] flex flex-col items-center min-h-[100vh] max-h-fit ">
          {space.testimonials?.length ? (
            space?.testimonials?.map((testimonial: TestimonialType) => {
              
              return (
                <div className="my-2 w-full">
                <TestimonialItem
                  key={testimonial.id}
                  space={space}
                  testimonial={testimonial}
                    setSpace={setSpace}
                  showEditTestimonialModal={showEditTestimonialModal}
                  setShowEditTestimonialModal={setShowEditTestimonialModal}
                />
                  </div>
              );
            })
          ) : (
            <h1 className="text-2xl font-bold mt-4">
              No Testimonials to display
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
