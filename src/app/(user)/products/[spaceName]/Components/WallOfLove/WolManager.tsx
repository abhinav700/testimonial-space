import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { Box } from "lucide-react"
import { SetStateAction, useState } from "react";
import WolFirstScreen from "./WolFirstScreen";
import WolCustomizeToolbar from "./WolCustomizeToolbar";
import WolLivePreview from "./WolLivePreview";
import WolEmbed from "./WolEmbed";

type WolManagerProps = {
  open: boolean;
  handleClose: () => void;
}

type WolManagerSection = "INITIAL_SCREEN" | "CUSTOMIZE" | "LIVE_PREVIEW" | "EMBED_CODE"

export interface WolManagerSectionProps {
  open: boolean;
  setActiveSection: React.Dispatch<SetStateAction<WolManagerSection>>
  handleClose: () => void
}

const WolManager = ({open, handleClose}: WolManagerProps) => {
  const [activeSection, setActiveSection] = useState<WolManagerSection>("INITIAL_SCREEN");
  console.log("entering wol manager: ", activeSection) 
  const renderContent = () => {
    try{
      switch(activeSection){
        case "INITIAL_SCREEN":
          return <WolFirstScreen open={open} setActiveSection={setActiveSection} handleClose={handleClose}/>
        case "CUSTOMIZE":
          return <WolCustomizeToolbar/>
        case "LIVE_PREVIEW":
          return <WolLivePreview/>
        case "EMBED_CODE":
          <WolEmbed/>
      }
    }catch(e){
      console.log(e);
    }
  } 

 return  <>
 
     
  {renderContent()}
 </>
}

export default WolManager;