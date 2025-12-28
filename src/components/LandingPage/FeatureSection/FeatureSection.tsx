import React from "react";
import FeatureCard from "./FeatureCard";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
const features = [
  {
   icon: <PeopleAltOutlinedIcon sx={{color:"blue", fontSize:"50px" }}/>,
    title: "Easy submission",
    descrption: "Space form for customers to submit testimonials",
  },
  {
    icon: <SpaceDashboardOutlinedIcon sx={{color:"blue", fontSize:"50px" }}/>,
    title: "Customizable spaces",
    descrption: "Create unique space for each product or service",
  },
  {
    icon:<BoltIcon sx={{color:"red", fontSize:"55px"}}/>,
    title: "Instant updates",
    descrption: "Testimonials appear in real time on your space",
  },
];

const FeatureSection = () => {
  return (
    <section>
      <div className="min-h-[400px] max-h-[160vh] bg-[#E9EED9] py-7 text-center">
        <h1 className="text-[40px] font-bold text-green-700">
          Why choose testimonial space?
        </h1>
        <div className="flex flex-row min-h-[400px] max-h-[150vh] flex-wrap items-center justify-around">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              description={feature.descrption}
              title={feature.title}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
