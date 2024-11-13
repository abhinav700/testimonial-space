import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const findAlignment = (alignment: string | null) => {
  switch (alignment) {
    case "right":
      return "end";
    case "center":
      return "center";
    default:
      return "start";
  }
};

const findFontSize = (fontSize: string | null) => {
  switch (fontSize) {
    case "tiny":
      return "12px";
    case "small":
      return "14px";
    case "medium":
      return "16px";
    case "large":
      return "20px";
    case "extra-large":
      return "24px";
    default:
      return "20px";
  }
};

const findFontWeight = (fontWeight: string | null) => {
  switch (fontWeight) {
    case "extra-light":
      return 100;
    case "light":
      return 300;
    case "medium":
      return 500;
    case "bold":
      return 700;
    case "extra-bold":
      return 900;
    default:
      return 500;
  }
};

type styleOptions = {
  alignItems?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: number;
};

const useStyles = (searchParams: ReadonlyURLSearchParams) => {
  const alignment = searchParams.get("alignment");
  const backgroundColor = searchParams.get("backgroundColor");
  const textColor = searchParams.get("textColor");
  const fontSize = searchParams.get("fontSize");
  const fontWeight = searchParams.get("fontWeight");

  const [style, setStyle] = useState<styleOptions>({});

  useEffect(() => {
    setStyle({
      alignItems: findAlignment(alignment),
      backgroundColor:
        backgroundColor?.length == 6 ? `#${backgroundColor}` : "#ebf3cd",
      color: textColor?.length == 6 ? `#${textColor}` : "#000000",
      fontSize: findFontSize(fontSize),
      fontWeight: findFontWeight(fontWeight),
    });
  }, [alignment, backgroundColor, textColor, fontSize, fontWeight]);

  console.log(style);
  return style;
};

export default useStyles;
