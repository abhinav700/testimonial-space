import React, { useState } from "react";
import { EmbedWidgetOptionsProps } from "./EmbedWidgets";
import { TriangleIcon, X } from "lucide-react";
import EmbedCode from "@/components/EmbedCode";
import EmbeddedWol from "@/app/(embed)/embed/wol/[spaceName]/page";
import "./WallOfLoveModal.css";
interface WallOfLoveModalProps extends EmbedWidgetOptionsProps {}

const WallOfLoveModal = ({
  activeEmbedWidget,
  setActiveEmbedWidget,
  embedWidgetName,
  space,
}: WallOfLoveModalProps) => {
  const [showLivePreview, setShowLivePreview] = useState<boolean>(false);

  return (
    <div className="w-full h-full p-4 fixed flex items-center justify-center top-0 left-0 backdrop-blur-[2px]">
      <div className="sm:w-[70%] w-full h-[95%] bg-slate-400 px-4 py-1 rounded-md  flex flex-col items-start overflow-y-auto">
        <span className="w-full flex justify-end">
          <X
            className="cursor-pointer"
            onClick={() => {
              setActiveEmbedWidget("");
            }}
          />
        </span>
        <h1 className="w-full text-center font-bold text-2xl my-5">
          Embed a Wall of Love
        </h1>
        <EmbedCode embedPath={`/embed/wol/${space.spaceName}`} />
        {/* Live preview for our Wall of love */}
        <div className="mb-4 mt-11 flex justify-between w-full items-center">
          <h1 className="text-xl font-bold">Live Preview</h1>
          <TriangleIcon
            style={{ fill: "black" }}
            onClick={() => {
              setShowLivePreview(!showLivePreview);
            }}
            className={`${!showLivePreview ? "rotate-triangle-down" : ""} cursor-pointer mr-3`}
            size={15}
          />
        </div>
        {showLivePreview && <EmbeddedWol spaceName={space.spaceName} />}
      </div>
    </div>
  );
};

export default WallOfLoveModal;
