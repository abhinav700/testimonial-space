"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Header from "./Components/Header";
import useFetchSpaceByName from "@/app/(customer)/space/[spaceName]/useFetchSpaceByName";
import { TestimonialType } from "@/lib/schemas/schema";
import LoadingMessage from "@/components/LoadingMessage";

import TestimonialItem from "./Components/TestimonialItem";
import EditSpaceModal from "./Components/EditSpaceModal/EditSpaceModal";
import { useSession } from "next-auth/react";

const page = () => {
  const params = useParams();
  const { spaceName } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditSpaceModal, setShowEditSpaceModal] = useState<boolean>(false);
  const user = useSession();
  const { space, setSpace } = useFetchSpaceByName({
    setLoading,
    spaceName: spaceName as string,
  });

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
      {showEditSpaceModal && user?.data &&  (
        <EditSpaceModal
          setVisible={setShowEditSpaceModal}
          space={space}
        />
      )}
      <Header
        totalTestimonials={space.testimonials ? space.testimonials.length : 0}
        spaceName={space.spaceName}
        setShowEditSpaceModal={setShowEditSpaceModal}
      />
      <div className="flex flex-col items-center min-h-[100vh] max-h-fit mt-3">
        {space?.testimonials?.map((testimonial: TestimonialType) => {
          return (
            <TestimonialItem
              key={testimonial.id}
              space={space}
              testimonial={testimonial}
              setSpace={setSpace}
            />
          );
        })}
      </div>
    </>
  );
};

export default page;
