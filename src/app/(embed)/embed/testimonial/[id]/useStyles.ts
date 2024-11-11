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
  const style = {
    alignItems: findAlignment(alignment),
    backgroundColor: backgroundColor ? backgroundColor : "#ebf3cd",
  }
  
  console.log(style)
  return style
}

export default useStyles