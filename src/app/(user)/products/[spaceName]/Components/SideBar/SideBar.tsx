import React, { ReactNode, SetStateAction, useState } from "react";
import { SpaceType } from "@/lib/schemas/schema";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TreeItem } from "@mui/x-tree-view";

export type SidebarSectionKey = "EMBED_WIDGETS" | "WALL_OF_LOVE" | null;

export type SidebarItem = {
  key: SidebarSectionKey,
  label: string;
  children?: {
    icon: ReactNode,
    label: string,
    key:SidebarSectionKey,
  }[]
}

interface SideBarProps{
  space: SpaceType;
  activeSectionKey: SidebarSectionKey;
  setActiveSectionKey: React.Dispatch<SetStateAction<SidebarSectionKey>>
}


export const sidebarItems : SidebarItem[] = [
  {
    key:"EMBED_WIDGETS",
    label: "Embed Widges",
    children:[
      {
        icon: <FavoriteIcon/>,
        key: "WALL_OF_LOVE",
        label: "Wall of love",
      }
    ]
  }
]



const SideBar = ({space, activeSectionKey, setActiveSectionKey}: SideBarProps) => {
  

  return <>
    <Box sx={{}} width={240} borderRight='3px solid #ccc' borderBottom = '3px solid #ccc'>
      {
        sidebarItems.map((item) => {
          return <SimpleTreeView>
            <TreeItem itemId={item.key!} key={item.key} label={item.label}>
            {
              item.children && item.children.map((child) =>{
                  return <TreeItem onClick={() => {setActiveSectionKey(child.key)}} itemId={child.key!} key={child.key!} label={child.label}/>
              })
            }
            </TreeItem>
            
          </SimpleTreeView>

          
        })
      }
    </Box>
  </> 
};

export default SideBar;
