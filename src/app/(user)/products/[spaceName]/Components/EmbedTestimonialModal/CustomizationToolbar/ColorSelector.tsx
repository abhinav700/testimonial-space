import React, { SetStateAction } from "react";

interface ColorSelectorProps {
  targetProperty: "Background Color" | "Text Color" | "Border Color";
  /**
   * Eg: for background color input in ColorOpitons.tsx,
   * `colorState` variable will be `backgroundColorInput`
   * 
   * set to type string because user input may not be a hex code.
   * In that case, default colors will be used.
   * Eg: colorState.length < 6 is an invalid color value
   */
  colorState: string;
  /**
   * setstate function of the target property for which we want to set color
   * Eg: for seting `backgroundColorInput`, `setColorAction` will be `setBackgroundColorInput`
   */
  setColorAction: React.Dispatch<SetStateAction<string>>; 
}
export type ColorOptionsType =
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

export const ColorArray: ColorOptionsType[] = [
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

const ColorSelector = ({
  setColorAction,
  targetProperty,
  colorState,
}: ColorSelectorProps) => {
  return (
    <div className="flex flex-col my-5">
      <h2 className="text-lg font-bold">{targetProperty}</h2>
      <div className="flex flex-wrap w-[200px] items-center p-2 mt-1 bg-white rounded-md border-[1px] border-[#aaaaaa]">
        {ColorArray.map((item: ColorOptionsType) => {
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
                setColorAction(item);
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
              setColorAction(e.target.value);
            }
          }}
          value={colorState}
        />
      </div>
    </div>
  );
};

export default ColorSelector;
