import React, { ReactNode } from "react";
import FeatureCard from "./FeatureCard";
import { Moon, Sun, Star, Users, Layout, Zap } from "lucide-react";

const features = [
  {
    icon: <Users className="text-blue-500" size={40} />,
    title: "Easy submission",
    descrption: "Space form for customers to submit testimonials",
  },
  {
    icon: <Layout className="text-blue-800" size={40} />,
    title: "Customizable spaces",
    descrption: "Create unique space for each product or service",
  },
  {
    icon: <Zap className="text-red-500" fill="#ef4444" size={40} />,
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
