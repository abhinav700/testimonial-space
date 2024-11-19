import { AlignLeft, LetterText, Palette, Square, Text } from "lucide-react";
import React, { ReactNode, SetStateAction, useState } from "react";
import ColorOptions from "./ColorOptions";
import TextOptions from "./TextOptions";
import Button from "@/components/Button";
import { DesignValuesType } from "../EmbedTestimonialModal";
import BorderOptions from "./BorderOptions";
import AlignmentOptions from "./AlignmentOptions";

// design properties we can customize
type DesignOptionsType = "Alignment" | "Color" | "Text" | "Border";

// corresponding icon for each property that we will display in buttons
const designOptionIconMapping: { [key in DesignOptionsType]: ReactNode } = {
  Alignment: <AlignLeft />,
  Color: <Palette />,
  Text: <LetterText className="text-tiny" />,
  Border: <Square className="text-tiny" />,
};

// configuration/JSX that is displayed when a design option is selected for customization
const designOptionConfigMapping = {
  Alignment: AlignmentOptions,
  Color: ColorOptions,
  Text: TextOptions,
  Border: BorderOptions,
};

interface CustomizationToolbarProps {
  designValues: DesignValuesType;
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
}

const CustomizationToolbar = ({
  designValues,
  setDesignValues,
}: CustomizationToolbarProps) => {
  // design property that we are currently customizing
  const [designOption, setDesignOption] =
    useState<DesignOptionsType>("Alignment");

  const DesignConfigComponent = designOptionConfigMapping[designOption];
  return (
    <div className="flex flex-col items-start">
      <div className="w-[90%] my-5 flex justify-between flex-wrap">
        {(Object.keys(designOptionIconMapping) as DesignOptionsType[]).map(
          (item) => {
            return (
              <Button
                key={item}
                className="p-4 min-w-[200px] my-1 min-h-[90px] bg-white hover:bg-slate-100 rounded-md flex flex-col justify-between items-center"
                onClick={(e) => {
                  setDesignOption(item);
                }}
              >
                {designOptionIconMapping[item]}
                <p className="text-sm font-semibold text-[#292929]">{item}</p>
              </Button>
            );
          }
        )}
      </div>
      <DesignConfigComponent setDesignValues={setDesignValues} designValues={designValues}/>
      
    </div>
  );
};

export default CustomizationToolbar;
