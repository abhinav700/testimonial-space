import React, { ReactNode } from "react";
import FeatureCard from "./FeatureCard";
import { Moon, Sun, Star, Users, Layout, Zap } from 'lucide-react'

const features = [
  {
    icon: <Users className="text-blue-500" size={40} />,
    title: "Easy submission",
    descrption: "Space form for customers to submit testimonials",
  },
  {
    icon: <Layout className="text-blue-800" size={40}/>,
    title: "Customizable spaces",
    descrption: "Create unique space for each product or service",
  },
  {
    icon: <Zap className="text-red-500" fill="#ca4e29" size={40} />,
    title: "Instant updates",
    descrption: "Testimonials appear in real time on your space",
  },
];

const FeatureSection = () => {
  return (
    <div className="min-h-[400px] max-h-[90vh] bg-[#E9EED9] py-7 text-center">
      <h1 className="text-[40px] font-bold text-green-700">Why choose testimonial space?</h1>
      <div className="flex flex-row min-h-[400px] max-h-[80vh] flex-wrap items-center justify-around">
        {features.map((feature) => (
          <FeatureCard
            description={feature.descrption}
            title={feature.title}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
