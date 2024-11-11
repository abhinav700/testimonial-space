import { ReadonlyURLSearchParams } from "next/navigation"

export const findAlignment = (alignment: string | null) => {
  switch (alignment) {
    case "right":
      return "end";
    case "center":
      return "center";
    default:
      return "start";
  }
}

const useStyles = (searchParams: ReadonlyURLSearchParams) => {
  const alignment= searchParams.get("alignment");
  const backgroundColor = searchParams.get("backgroundColor");
  const textColor = searchParams.get("textColor");
  const style = {
    alignItems: findAlignment(alignment),
    backgroundColor: backgroundColor?.length == 6 ? `#${backgroundColor}` : "#ebf3cd",
    color: textColor?.length == 6 ? `#${textColor}`: "#000000"
  }
  
  console.log(style)
  return style
}

export default useStyles