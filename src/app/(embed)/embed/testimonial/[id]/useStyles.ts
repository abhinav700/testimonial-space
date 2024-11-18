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
  border?: string;
  borderRadius?: string;
};

const findBorderWidth = (
  borderWidth: string | null,
  showBorder: string | null
) => {
  if (showBorder !== "true") return "0px";
  switch (borderWidth) {
    case "small":
      return "2px";
    case "medium":
      return "4px";
    case "large":
      return "6px";
    case "x-large":
      return "8px";
    default:
      return "2px";
  }
};
const findBorderRadius = (borderRadius: string | null) => {
  switch (borderRadius) {
    case "none":
      return "0px";
    case "small":
      return "2px";
    case "medium":
      return "6px";
    case "large":
      return "8px";
    default:
      return "0px";
  }
};

const isValidHexNumber = (hexNumber: string | null) => {
  return hexNumber && (hexNumber.length === 3 || hexNumber.length === 6);
};

const useStyles = (searchParams: ReadonlyURLSearchParams) => {
  const alignment = searchParams.get("alignment");
  const backgroundColor = searchParams.get("backgroundColor");
  const textColor = searchParams.get("textColor");
  const fontSize = searchParams.get("fontSize");
  const fontWeight = searchParams.get("fontWeight");
  const showBorder = searchParams.get("showBorder");
  const borderRadius = searchParams.get("borderRadius");
  const borderWidth = searchParams.get("borderWidth");
  const borderColor = searchParams.get("borderColor");

  const [style, setStyle] = useState<styleOptions>({});

  useEffect(() => {
    setStyle({
      alignItems: findAlignment(alignment),
      backgroundColor: isValidHexNumber(backgroundColor)
        ? `#${backgroundColor}`
        : "#ebf3cd",
      color: isValidHexNumber(textColor) ? `#${textColor}` : "#000000",
      fontSize: findFontSize(fontSize),
      fontWeight: findFontWeight(fontWeight),
      // Eg: 2px solid red
      border: `${findBorderWidth(borderWidth, showBorder)} solid #${
        isValidHexNumber(borderColor) ? borderColor : "000000"
      }`,
      borderRadius: findBorderRadius(borderRadius),
    });
  }, [
    alignment,
    backgroundColor,
    textColor,
    fontSize,
    fontWeight,
    showBorder,
    borderRadius,
    borderWidth,
    borderColor
  ]);

  // console.log(style);
  return style;
};

export default useStyles;
