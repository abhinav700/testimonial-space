"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
const NavBar = () => {
  const { data } = useSession();
  return (
    <nav className="bg-slate-700 flex py-3">
      {data && data.user ? (
        <button
          className="bg-slate-400 text-black font-semibold mx-2 px-2 py-2 hover:bg-slate-300"
          onClick={(e) => {
            signOut();
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-slate-400 text-black font-semibold mx-2 px-2 py-2 hover:bg-slate-300"
          onClick={(e) => {
            signIn();
          }}
        >
          Sign In
        </button>
      )}
    </nav>
  );
};
export default NavBar;
