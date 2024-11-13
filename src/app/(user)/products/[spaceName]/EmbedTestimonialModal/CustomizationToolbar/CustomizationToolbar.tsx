import { AlignLeft, LetterText, Palette, Text } from "lucide-react";
import React, { ReactNode, SetStateAction, useState } from "react";
import AlignmentOption from "./AlignmentOption";
import ColorOptions from "./ColorOptions";
import TextOptions from "./TextOptions";
import Button from "@/components/Button";
import { DesignValuesType } from "../EmbedTestimonialModal";

interface DesignOptionType {
  name: string;
  Icon: ReactNode;
  Component: ReactNode;
}

interface CustomizationToolbarProps {
  designValues: DesignValuesType;
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
}

const CustomizationToolbar = ({
  designValues,
  setDesignValues,
}: CustomizationToolbarProps) => {
  // property that we are currently customizing
  const [designOption, setDesignOption] = useState<ReactNode>(
    <AlignmentOption
      setDesignValues={setDesignValues}
      designValues={designValues}
    />
  );

  // design properties that we can customize
  const DesignOptionsArray: DesignOptionType[] = [
    {
      name: "Alignment",
      Icon: <AlignLeft />,
      Component: (
        <AlignmentOption
          setDesignValues={setDesignValues}
          designValues={designValues}
        />
      ),
    },
    {
      name: "Color",
      Icon: <Palette />,
      Component: (
        <ColorOptions
          setDesignValues={setDesignValues}
          designValues={designValues}
        />
      ),
    },
    {
      name: "Text",
      Icon: <LetterText className="text-tiny" />,
      Component: (
        <TextOptions
          setDesignValues={setDesignValues}
          designValues={designValues}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col items-start">
      <div className="w-[90%] my-5 flex justify-between flex-wrap">
        {DesignOptionsArray.map((item: DesignOptionType) => {
          return (
            <Button
              key={item.name}
              className="p-4 min-w-[200px] my-1 min-h-[90px] bg-white hover:bg-slate-100 rounded-md flex flex-col justify-between items-center"
              onClick={(e) => {
                setDesignOption(item.Component);
              }}
            >
              {item.Icon}
              <p className="text-sm font-semibold text-[#292929]">
                {item.name}
              </p>
            </Button>
          );
        })}
      </div>
      {designOption}
    </div>
  );
};

export default CustomizationToolbar;
