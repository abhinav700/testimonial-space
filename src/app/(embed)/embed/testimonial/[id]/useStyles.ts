import { ReadonlyURLSearchParams } from "next/navigation"

export const findAlignment = (alignment: string | null) => {
  switch (alignment) {
    case "right":
      return "items-end";
      break;
    case "center":
      return "items-center";
      break;
    default:
      return "items-start";
      break;
  }
}

const useStyles = (searchParams: ReadonlyURLSearchParams) => {
  const alignProperty= searchParams.get("alignment");
  const backgroundColor = searchParams.get("backgroundColor");
  console.log(backgroundColor)
  const style = {
   alignItems: findAlignment(alignProperty),
   backgroundColor: backgroundColor ? backgroundColor : "#ebf3cd",
  }

  return style
}

export default useStyles