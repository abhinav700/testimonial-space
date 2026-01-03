import { ChevronRight } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { SpaceType } from "@/lib/schemas/schema";

export type SidebarSectionKey = "embed widgets" | null;

export type SidebarItem = {
  key: SidebarSectionKey,
  label: string;
}

interface SideBarProps{
  space: SpaceType;
  activeSectionKey: SidebarSectionKey;
  setActiveSectionKey: React.Dispatch<SetStateAction<SidebarSectionKey>>
}


export const sidebarItems : SidebarItem[] = [
  {
    key:"embed widgets",
    label: "Embed Widges",
  }
]



const SideBar = ({space}: SideBarProps) => {
  return <></>
};

export default SideBar;
