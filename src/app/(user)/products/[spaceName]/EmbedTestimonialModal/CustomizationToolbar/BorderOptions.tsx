import React, { SetStateAction, useEffect, useState } from "react";
import { DesignValuesType } from "../EmbedTestimonialModal";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";
import ColorSelector from "./ColorSelector";

interface BorderOptionsProps {
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
  designValues: DesignValuesType;
}

type borderRadiusOptionsType = "none" | "small" | "medium" | "large";

type borderWidthOptionsType = "small" | "medium" | "large" | "x-large";

const borderRadiusOptions: borderRadiusOptionsType[] = [
  "none",
  "small",
  "medium",
  "large",
];

const borderWidthOptions: borderWidthOptionsType[] = [
  "small",
  "medium",
  "large",
  "x-large",
];


const BorderOptions = ({
  setDesignValues,
  designValues,
}: BorderOptionsProps) => {
  const [borderColor, setBorderColor] = useState<string>(designValues.borderColor);
  const [showBorder, setShowBorder] = useState<boolean>(designValues.showBorder);

  useEffect(()=>{
      setDesignValues({
        ...designValues,
        borderColor,
        showBorder
      })
  }, [borderColor, showBorder])
  console.log(`INSIDE BORDER OPTIONS: ${designValues}`);
  return (
    <div className="w-full">
      <ToggleSwitch setToggledValue={setShowBorder} toggledValue={showBorder} Name={"Show Border"}/>
      {/* setting border radius */}
      <span className="font-bold mt-5">Border Radius</span>
      <div className="sm:w-[50%] w-[90%] flex my-3 flex-wrap ">
        {borderRadiusOptions.map((item: borderRadiusOptionsType) => {
          return (
            <div
              className="flex items-center sm:mt-0 my-2  mr-4 flex-wrap"
              key={`borderRadius-${item}`}
            >
              <input
                type="radio"
                onChange={(e) => {
                  setDesignValues(designValues =>( { ...designValues, borderRadius: item }));
                }}
                value={item}
                name="borderRadius"
                checked={item === designValues.borderRadius}
                id={`borderRadius-${item}`}
              />
              <label
                className="ml-1 text-md font-semibold text-[#242222]"
                htmlFor={`borderRadius-${item}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            </div>
          );
        })}
      </div>

      {/* setting border width */}
      <span className="font-bold mt-5">Border Width</span>
      <div className="sm:w-[50%] w-[90%] flex mt-3 flex-wrap ">
        {borderWidthOptions.map((item: borderWidthOptionsType) => {
          return (
            <div
              className="flex items-center sm:mt-0 my-2  mr-4 flex-wrap"
              key={`borderWidth-${item}`}
            >
              <input
                type="radio"
                onChange={(e) => {
                  setDesignValues({ ...designValues, borderWidth: item });
                }}
                value={item}
                name="borderWidth"
                checked={item === "small"}
                id={`borderWidth-${item}`}
              />
              <label
                className="ml-1 text-md font-semibold text-[#242222]"
                htmlFor={`borderWidth-${item}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
      {/* Setting border color */}
      <ColorSelector targetProperty="Border Color" setColorAction={setBorderColor} colorState={borderColor} />
    </div>
  );
};

export default BorderOptions;
