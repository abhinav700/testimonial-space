import Button from "@/components/Button";
import { SpaceType, TestimonialType } from "@/lib/schemas/schema";
import { ChevronUp, ChevronDown, icons } from "lucide-react";
import { useState } from "react";
import TestimonialToolbar from "./TestimonialToolbar/TestimonialToolbar";
import EditTestimonialModal from "./EditTestimonialModal/EditTestimonialModal";
import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import axios from "axios";

interface TestimonialItemProps {
  testimonial: TestimonialType;
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType | null>>;
  showEditTestimonialModal: boolean;
  setShowEditTestimonialModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const TestimonialItem = ({
  testimonial,
  space,
  setSpace,
  showEditTestimonialModal,
  setShowEditTestimonialModal,
}: TestimonialItemProps) => {
  const [isWallOfLoveEmbed, setIsWallOfLoveEmbed] = useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const handleEmbedTestimonialWol = async () => {
    try{
      const response = await axios.put("/api/testimonial/toggleWolEmbed", {
        id: testimonial.id
      })

      console.log(response);
      setIsWallOfLoveEmbed(!isWallOfLoveEmbed)
    }catch(e){
      console.log(e);
    } 
  }

  const renderEmbedIcon = (iconStyle: {color: string, cursor: string}) => {
    try{
      // return  !isWallOfLoveEmbed ?  <FavoriteBorderIcon sx={iconStyle} onClick={handleEmbedTestimonialWol}>
            // : <FavoriteIcon sx={{color:"red", cursor:"pointer"}}/>
      return <IconButton onClick={handleEmbedTestimonialWol}>
        {

          !isWallOfLoveEmbed ?  <FavoriteBorderIcon sx={iconStyle} />
          : <FavoriteIcon sx={{color:"red", cursor:"pointer"}}/>
        }
      </IconButton>
    }catch(e){
      console.log(e)
    }
  }
  return (
    <>
     
      {showEditTestimonialModal && (
        <EditTestimonialModal
          setShowEditTestimonialModal={setShowEditTestimonialModal}
          testimonial={testimonial}
        />
      )}
      <div className="w-[90%] min-h-[150px] max-h-[500px] flex flex-col justify-between items-start p-4 rounded-md bg-[#ebf3d6]">
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%"}}>
          <p>{testimonial.description}</p>
          {
            renderEmbedIcon({color:"red", cursor:"pointer"})                  
          }
        </Box>
        <div className="flex flex-col w-full mt-5">
          <div className="w-full flex justify-between">
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Name</span>
              <span>{testimonial.customerName}</span>
            </span>
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Email</span>
              <span>{testimonial.customerEmail}</span>
            </span>
          </div>
          <div className="w-full flex justify-between mt-6">
            <span className="flex flex-col items-start">
              <span className="font-bold text-black">Submitted At</span>
              <span>{new Date(testimonial.createdAt!).toLocaleString()}</span>
            </span>
          </div>

          {/* Options to share, edit and delete the testimonial */}
          {showToolbar && (
            <TestimonialToolbar
          
              testimonial={testimonial}
          
            />
          )}

          {/* Icon to trigger the menu */}
          <div className="w-full flex justify-end h-[fit]">
            {showToolbar ? (
              <Button
                onClick={() => {
                  setShowToolbar(false);
                }}
              >
                <ChevronUp className="cursor-pointer" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowToolbar(true);
                }}
              >
                <ChevronDown className="cursor-pointer" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialItem;
