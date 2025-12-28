import React from "react";
import Button from "./Button";
import { PenSquareIcon } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface SpaceProps {
  header?: string;
  customMessage?: string;
  spaceName?: string;
  questions?: string[];
  onSubmitTestimonial?: () => void;
  isPreview: boolean;
}

const Space = ({
  header,
  customMessage,
  spaceName,
  questions,
  onSubmitTestimonial,
  isPreview,
}: SpaceProps) => {
  const handleSubmit = () => {};
  return (
    <>
      <Card
        sx={{
          border: "2px solid black",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Chip
          label="Live Preview"
          sx={{
            backgroundColor: "green",
            position: "absolute",
            top: "-4%",
            left: "4%",
            zIndex: 2000,
          }}
        />
        <CardContent sx={{ padding: "20px 20px" }}>
          <Typography
            gutterBottom
            variant="h4"
            sx={{
              color: "black",
              textAlign: "center",
              fontWeight: "800",
              marginTop: "10px",
            }}
          >
            {header}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            textAlign={"center"}
          >
            {customMessage}
          </Typography>
          <Typography sx={{ mb: 1.5 }}>Questions</Typography>
          <ul className="">
            {questions?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-disc mt-2 text-[#5a5959] font-medium"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardActions>
          <Button
            onClick={onSubmitTestimonial ? onSubmitTestimonial : handleSubmit}
            className="w-full p-2 mt-8 bg-slate-950 font-semibold  text-white text-center rounded-lg hover:bg-slate-900 flex justify-center"
          >
            <span className="flex items-center">
              <span className="mx-2">Send Testimonial</span>
              <PenSquareIcon />
            </span>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Space;
