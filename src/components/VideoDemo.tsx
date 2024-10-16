import React from "react";

const VideoDemo = () => {
  return (
    <section className="flex flex-col w-fulll items-center min-h-[130vh] max-h-[130vh]">
      <h1 className="text-[30px] text-slate-800 my-16 font-bold">
        See Testimonial Space in action
      </h1>
      <iframe
        src="https://www.youtube.com/embed/D0UnqGm_miA"
        title="Iframe Title"
        width="1000"
        height="700"
        allowFullScreen
      />
    </section>
  );
};

export default VideoDemo;
