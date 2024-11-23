import React from "react";

interface EmbedCodeProps {
  embedPath: string;
}

const EmbedCode = ({ embedPath }: EmbedCodeProps) => {
  return (
    <>
      <span className="bg-[#141414] w-full overflow-x-auto min-h-[100px] max-h-fit rounded-lg p-4 mt-3 text-white ">
        <p className="">{"<iframe>"}</p>
        <p className="ml-2 min-w-fit max-w-full">
          src=
          <span className="text-[#40c43c] w-full">{`"${process.env.NEXT_PUBLIC_BASE_URL}/${embedPath}"`}</span>
        </p>
        <p>{"</iframe>"}</p>
      </span>
    </>
  );
};

export default EmbedCode;
