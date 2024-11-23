import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import "./Sidebar.css";
import EmbedWidgets from "./EmbedWidgets/EmbedWidgets";
import { SpaceType } from "@/lib/schemas/schema";
export type SideBarMenuOptions = "embed widgets";

const sideBarMenuOptions: SideBarMenuOptions[] = ["embed widgets"];

const EmptyJsx = () => {
  return <></>;
};



// the sub menu for each option
const activeOptionJsx = {
  "": EmptyJsx,
  "embed widgets": EmbedWidgets,
};

interface SideBarProps{
  space: SpaceType;
}

const SideBar = ({space}: SideBarProps) => {
  const [activeSideBarOption, setActiveSideBarOption] = useState<
    SideBarMenuOptions | ""
  >("");

  const ActiveSideBarOptionJsx = activeOptionJsx[activeSideBarOption];

  console.log(activeSideBarOption);
  return (
    <div className="md:w-[30%] lg:w-[30%]">
      {sideBarMenuOptions.map((item) => {
        return (
          <>
            <div
              key={item}
              onClick={(e) => {
                activeSideBarOption != item
                  ? setActiveSideBarOption(item)
                  : setActiveSideBarOption("");
              }}
              className="w-full flex justify-between p-2 rounded-md cursor-pointer text-[#222222] hover:bg-[#d8d8d8] items-center"
            >
              <h1 className="font-bold text-lg cursor-pointer">
                {item[0].toLocaleUpperCase() + item.slice(1)}
              </h1>
              {/* When this option is active, we will display downward cheveron
               * - inactiveChevron: right chevron
               * - activeChevron: down cevron
               **/}
              <ChevronRight
                className={`${
                  item == activeSideBarOption
                    ? "activeChevron"
                    : "inactiveChevron"
                }`}
              />
            </div>
            <ActiveSideBarOptionJsx space={space}/>
          </>
        );
      })}
    </div>
  );
};

export default SideBar;
