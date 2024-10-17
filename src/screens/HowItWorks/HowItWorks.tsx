import React from "react";

interface StepItem{
  id: number;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    id: 1,
    title: "Create a Space",
    description: "Set up a unique space for your product or service.",
  },
  {
    id: 2,
    title: "Share Your Link",
    description: "Send the space link to your customers.",
  },
  {
    id: 3,
    title: "Collect Testimonials",
    description: "Customers submit their feedback easily.",
  },
  {
    id: 4,
    title: "Showcase Feedback",
    description: "Display testimonials on your website or app.",
  },
];


const HowItWorks = () => {
  return (
    <section className="bg-[#e0ecc4]">
      
      <div className="min-h-[400px] max-h-[160vh] py-7 text-center">
        <h1 className="text-[40px] font-bold text-green-700">How it works?</h1>
        <div className="flex flex-row min-h-[400px] max-h-[150vh] flex-wrap items-center justify-around">
          {
            steps?.map((value : StepItem) => (
              <div className="min-w-[50px] max-w-[200px] min-h-[250px] max-h-[400px] my-3 px-3 py-6 text-center">
                <span className="px-8 py-6 text-[30px] bg-green-600 text-white font-bold rounded-full">{value.id}</span>
                <h1 className="text-[20px] mt-8 font-bold text-slate-800">{value.title}</h1>
                <p className="mt-1 text-lg text-slate-800">{value.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
