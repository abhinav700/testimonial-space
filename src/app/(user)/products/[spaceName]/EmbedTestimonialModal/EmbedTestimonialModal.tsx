import EmbeddedTestimonial from "@/app/(embed)/embed/testimonial/[id]/page";
import { TestimonialType } from "@/lib/schemas/schema";
import { X } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import CustomizationToolbar from "./CustomizationToolbar/CustomizationToolbar";

interface EmbedTestimonialModalProps {
  setShowEmbedTestimonialModal: React.Dispatch<SetStateAction<boolean>>;
  testimonial: TestimonialType;
}

export interface DesignValuesType {
  alignment: "left" | "center" | "right";
  textColor: string;
  backgroundColor: string;
  fontSize: "tiny" | "small" | "medium" | "large" | "extra-large";
  fontWeight: "extra-light" | "light" | "medium" | "bold" | "extra-bold";
}

const createQueryParams = (designValues: DesignValuesType) => {
  let isFirstQueryParam = true;
  let queryParams = "";
  Object.keys(designValues).map((key) => {
    if (isFirstQueryParam) {
      isFirstQueryParam = false;
    } else {
      queryParams += "&";
    }
    queryParams += `${key}=${designValues[key as keyof typeof designValues]}`;
  });
  return queryParams;
};

const EmbedCode = ({
  id,
  designValues,
}: {
  id: string;
  designValues: DesignValuesType;
}) => {
  const queryParams = createQueryParams(designValues);
  return (
    <>
      <p className="">{"<iframe>"}</p>
      <p className="ml-2 w-full">
        src=
        <span className="text-[#40c43c] w-full">{`"${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${id}?${queryParams}"`}</span>
      </p>
      <p>{"</iframe>"}</p>
    </>
  );
};
const EmbedTestimonialModal = ({
  testimonial,
  setShowEmbedTestimonialModal,
}: EmbedTestimonialModalProps) => {
  const [designValues, setDesignValues] = useState<DesignValuesType>({
    alignment: "left",
    textColor: "000000",
    backgroundColor: "ebf3cd",
    fontSize: "medium",
    fontWeight: "medium",
  });

  return (
    <div className="w-screen h-screen fixed z-10 top-0 left-0 backdrop-blur-[2px] flex justify-center items-center p-4">
      <div className="h-[80vh] w-[80%] py-4 px-5 flex flex-col items-start overflow-y-auto bg-slate-300 rounded-md ">
        <div className="flex flex-col w-full">
          <span
            className="w-full flex justify-end cursor-pointer"
            onClick={(e) => setShowEmbedTestimonialModal(false)}
          >
            <X />
          </span>
          <h1 className="text-xl font-bold mb-2 sm:mt-0 mt-4">
            Embed this testimonial to your websites
          </h1>
          <CustomizationToolbar
            setDesignValues={setDesignValues}
            designValues={designValues}
          />
          <h1 className="text-lg font-bold">Live Preview</h1>

          <iframe
            className="min-h-[200px] max-h-[350px] w-full mt-2"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/embed/testimonial/${
              testimonial.id
            }?${createQueryParams(designValues)}`}
          ></iframe>
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-lg font-bold">Embed Code</h1>
          <span className="bg-[#141414] w-full overflow-x-auto min-h-[100px] max-h-fit rounded-lg p-4 mt-3 text-white ">
            <EmbedCode id={testimonial.id} designValues={designValues} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmbedTestimonialModal;
