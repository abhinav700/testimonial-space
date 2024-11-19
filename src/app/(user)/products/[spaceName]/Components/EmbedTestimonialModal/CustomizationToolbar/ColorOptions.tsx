import React, { SetStateAction, useEffect, useState } from "react";
import { DesignValuesType } from "../EmbedTestimonialModal";
import ColorSelector from "./ColorSelector";


interface ColorOptionsProps {
  designValues: DesignValuesType;
  setDesignValues: React.Dispatch<SetStateAction<DesignValuesType>>;
}
const ColorOptions = ({ designValues, setDesignValues }: ColorOptionsProps) => {
  const [textColor, setTextColor] = useState<string>(
    designValues.textColor
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    designValues.backgroundColor
  );

  useEffect(() => {
    setDesignValues({
      ...designValues,
      textColor: textColor,
      backgroundColor: backgroundColor,
    });
  }, [textColor, backgroundColor]);
  return (
    <div className="my-5 flex justify-between items-center flex-wrap w-[70%]">
      {/* Text-color for testimonial description */}

      <ColorSelector
        targetProperty="Text Color"
        setColorAction={setTextColor}
        colorState={textColor}
      />
      {/* Background color for our testimonial */}
      <ColorSelector
        targetProperty="Background Color"
        setColorAction={setBackgroundColor}
        colorState={backgroundColor}
      />
    </div>
  );
};

export default ColorOptions;
