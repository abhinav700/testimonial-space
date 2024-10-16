"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Button from "./Button";
const NavBar = () => {
  const { data } = useSession();
  return (
    <nav className="flex justify-between items-center bg-[#e9eeda] py-3 w-full px-3">
      <span className="lg:text-xl font-bold text-green-600 ">
        Testimonial Space
      </span>

      <div className="flex">

      {data && data.user ? (
        <Button
        className="bg-green-700 font-semibold mx-2 px-2 py-2 hover:bg-green-900"
        onClick={(e) => {
          signOut();
        }}
        >
          Sign Out
        </Button>
      ) : (
        <Button
        className="bg-green-700 font-semibold mx-2 px-2 py-2 hover:bg-green-900"
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
