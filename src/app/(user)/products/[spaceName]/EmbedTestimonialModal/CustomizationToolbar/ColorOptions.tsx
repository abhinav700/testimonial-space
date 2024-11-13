import React, { SetStateAction, useEffect, useState } from "react";
import { DesignValuesType } from "../EmbedTestimonialModal";

type Color =
  | "FF6900"
  | "FDCC0D"
  | "7BDCB5"
  | "00D084"
  | "8ED1FC"
  | "ABB8C3"
  | "EB144C"
  | "000000"
  | "FFFFFF"
  | "5D5DFF"
  | "F78DA7";

const ColorArray: Color[] = [
  "FF6900",
  "FDCC0D",
  "7BDCB5",
  "00D084",
  "8ED1FC",
  "ABB8C3",
  "EB144C",
  "000000",
  "FFFFFF",
  "5D5DFF",
  "F78DA7",
];

interface ColorOptionsProps {
  designValues: DesignValuesType;
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
}
const ColorOptions = ({ designValues, setDesignValues }: ColorOptionsProps) => {
  const [textColorInput, setTextColorInput] = useState<string>(designValues.textColor);
  const [backgroundColorInput, setBackgroundColorInput] =
    useState<string>(designValues.backgroundColor);

  useEffect(() => {
    setDesignValues({
      ...designValues,
      textColor: textColorInput,
      backgroundColor: backgroundColorInput,
    });
  }, [textColorInput, backgroundColorInput]);
  return (
    <div className="my-5 flex justify-between items-center flex-wrap w-[70%]">
      {/* Text-color for testimonial description */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Text Color</h2>
        <div className="flex flex-wrap max-w-[200px] p-2 mt-1 bg-white rounded-md border-[1px] border-[#aaaaaa]">
          {ColorArray.map((item: Color) => {
            return (
              <span
                key={`text-${item}`}
                className="w-[25px] h-[25px] mr-2 mt-1 rounded-md cursor-pointer"
                // Add border for black and white boxes otherwise they are not visible in dark and light mode respectively
                style={{
                  backgroundColor: `#${item}`,
                  border:
                    item === "FFFFFF" || item === "000000"
                      ? "1px solid gray"
                      : "",
                }}
                onClick={(e) => {
                  setDesignValues({ ...designValues, textColor: item });
                  setTextColorInput(item);
                }}
              ></span>
            );
          })}
          <span className="w-[25px] h-[25px] mt-1 rounded-sm  bg-[#dddddd] text-center">
            <p className="text-[#424242]">#</p>
          </span>
          <input
            className="w-[35%] h-[25px] mt-1 text-center bg-[#f0efef] rounded-sm text-black text-[12px]"
            onChange={(e) => {
              if (e.target.value.length <= 6) {
                setTextColorInput(e.target.value);
              }
            }}
            value={textColorInput}
          />
        </div>
      </div>
      {/* Background color for our testimonial */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Background Color</h2>
        <div className="flex flex-wrap w-[200px] items-center p-2 mt-1 bg-white rounded-md border-[1px] border-[#aaaaaa]">
          {ColorArray.map((item: Color) => {
            return (
              <span
                key={`bg-${item}`}
                className="w-[25px] h-[25px] mr-2 mt-1 rounded-md cursor-pointer"
                // Add border for black and white boxes otherwise they are not visible in dark and light mode respectively
                style={{
                  backgroundColor: `#${item}`,
                  border:
                    item === "FFFFFF" || item === "000000"
                      ? "1px solid gray"
                      : "",
                }}
                onClick={(e) => {
                  setBackgroundColorInput(item);
                }}
              ></span>
            );
          })}
          <span className="w-[25px] h-[25px] mt-1 rounded-sm  bg-[#dddddd] text-center">
            <p className="text-[#424242]">#</p>
          </span>
          <input
            className="w-[35%] h-[25px] mt-1 text-center bg-[#f0efef] rounded-sm text-black text-[12px]"
            onChange={(e) => {
              if (e.target.value.length <= 6) {
                setBackgroundColorInput(e.target.value);
              }
            }}
            value={backgroundColorInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorOptions;
