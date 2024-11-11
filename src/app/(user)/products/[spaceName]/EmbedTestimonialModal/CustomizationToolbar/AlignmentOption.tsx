import React, { SetStateAction } from "react";
import { DesignValuesType } from "../EmbedTestimonialModal";
interface AlignmentOptionType {
  name: string;
  value: "left" | "center" | "right";
}

const alignmentOptionArray: AlignmentOptionType[] = [
  {
    name: "Left Aligned",
    value: "left",
  },
  {
    name: "Center Aligned",
    value: "center",
  },
  {
    name: "Right Aligned",
    value: "right",
  },
];

interface AlignmentOptionProps {
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
  designValues: DesignValuesType;
}

const AlignmentOption = ({
  setDesignValues,
  designValues,
}: AlignmentOptionProps) => {
  return (
    <div className="my-4 w-full font-bold text-lg flex flex-col items-start">
      <span>Alignment Options</span>
      <div className="w-[50%] flex justify-between mt-4 flex-wrap ">
        {alignmentOptionArray.map((item: AlignmentOptionType) => {
          return (
            <div className="flex items-center">
              <input
                type="radio"
                onChange={(e) => {
                  setDesignValues({ ...designValues, alignment: item.value });
                }}
                value={item.value}
                name="alignment"
                id={item.value}
              />
              <label className="ml-3" htmlFor={item.value}>
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlignmentOption;
