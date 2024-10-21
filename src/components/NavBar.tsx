"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const { data } = useSession();
  const router =  useRouter();
  const [profileImageUrl, setProfileImageUrl] = useState<
    undefined | null | string
  >(undefined);


  useEffect(() => {
    setProfileImageUrl(data?.user?.image);
  }, [data?.user?.image]);

  return (
    <nav className="flex justify-between items-center py-3 w-full px-3">
      <span onClick={(e)=>{router.push("/")}} className="lg:text-xl font-bold text-green-600 cursor-pointer">
        Testimonial Space
      </span>

      <div className="flex">
        {data && data.user ? (
          <>
            {profileImageUrl &&
            <Image className="rounded-full hover:opacity-90 cursor-pointer" src={profileImageUrl} width={40} height={40} alt="profile image"/>}
            <Button
              className="bg-green-700 text-white font-semibold mx-4 px-2 py-2 hover:bg-green-900 rounded-md"
              onClick={(e) => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            className="bg-green-700 text-white font-semibold mx-2 px-2 py-2 hover:bg-green-900 rounded-md"
            onClick={(e) => {
              signIn();
            }}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
