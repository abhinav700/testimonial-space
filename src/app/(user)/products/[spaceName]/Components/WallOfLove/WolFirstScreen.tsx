import React from "react";
import { WolManagerSectionProps } from "./WolManager";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { XIcon } from "lucide-react";
import Button from "@mui/material/Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const WolFirstScreen = ({
  open,
  handleClose,
  setActiveSection,
}: WolManagerSectionProps) => {
  console.log("entering first screen");

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box
        sx={{
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
             minWidth: 500,
          position: "absolute",
        top: "50%",
        left: "50%",
        maxWidth: 1800,
        maxHeight: 700,
        width:{md:"90%", lg:"80%"}
      }}
      >
        <IconButton
          sx={{ position: "absolute", right: "1%" }}
          onClick={handleClose}
        >
          <XIcon />
        </IconButton>
        <Box sx={{ px: 3, marginTop:7 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Wall of love Manager
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", width:"100%", justifyContent:"space-between"}}>
            <Typography
              sx={{
                marginTop: "2px",
                color: "#3b3636",
                fontWeight: 600,
                fontSize: "16px",
                flex:1
              }}
            >
              Create and customize wall of love embeds. Changes automatically
              update without touching your code.
            </Typography>
          <Button variant="text" disableElevation sx={{textTransform:"none", backgroundColor:"#271a90", color:"white", display:"flex", justifyContent:"space-between", fontWeight: 600, p:1, width:180}}>
              <span>+</span><span>Create wall of Love</span>
            </Button>
          </Box>
        </Box>

        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", paddingY:"60px", gap:1}} >
          <CheckCircleIcon  fontSize="large" sx={{color:"#5e5e5e"}}/>
          <Typography component="p">
            No wall of love embeds yet
          </Typography>
          <Typography component="p" sx={{color:"#353434"}}>
            Get started by creating your first Wall of Love embed.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default WolFirstScreen;
