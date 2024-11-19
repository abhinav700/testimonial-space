import React, { SetStateAction } from "react";
import { DesignValuesType } from "../EmbedTestimonialModal";

// Upper case because they are displayed on UI.
// Should be converted to lowercase before sending as query parameter.
export type fontSizeType =
  | "tiny"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

const fontSizeOptions: fontSizeType[] = [
  "tiny",
  "small",
  "medium",
  "large",
  "extra-large",
];

export type fontWeightType =
  | "extra-light"
  | "light"
  | "medium"
  | "bold"
  | "extra-bold";

const fontWeightOptions: fontWeightType[] = [
  "extra-light",
  "light",
  "medium",
  "bold",
  "extra-bold",
];

interface TextOptionsProps {
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
  designValues: DesignValuesType;
}

const TextOptions = ({ designValues, setDesignValues }: TextOptionsProps) => {
  console.log("INSIDE TEXT OPTIONS", JSON.stringify(designValues))
  return (
    <div className="my-6 w-full font-bold text-lg flex flex-col items-start">
      {/* Setting font size */}
      <span>Font size</span>
      <div className="sm:w-[50%] w-[90%] flex mt-2 flex-wrap ">
        {fontSizeOptions.map((item: fontSizeType) => {
          return (
            <div className="flex items-center sm:mt-0 my-2  mr-4 flex-wrap" key={item}>
              <input
                type="radio"
                onChange={(e) => {
                  setDesignValues({ ...designValues, fontSize: item });
                }}
                value={item}
                name="fontSize"
                checked={item === designValues.fontSize}
                id={`fontSize-${item}`}
              />
              <label className="ml-1 text-md font-semibold text-[#242222]" htmlFor={`fontSize-${item}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
      {/* Setting font weight */}
      <span className="mt-5">Font weight</span>
      <div className="sm:w-[50%] w-[90%] flex mt-2 flex-wrap ">
        {fontWeightOptions.map((item: fontWeightType) => {
          return (
            <div className="flex items-center sm:mt-0 my-2 mr-4 flex-wrap" key={item}>
              <input
                type="radio"
                onChange={(e) => {
                  setDesignValues({ ...designValues, fontWeight: item });
                }}
                value={item}
                name="fontWeight"
                checked={item === designValues.fontWeight}
                id={`fontWeight-${item}`}
              />
              <label className="ml-1 font-semibold text-[#242222]" htmlFor={`fontWeight-${item}`}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextOptions;
