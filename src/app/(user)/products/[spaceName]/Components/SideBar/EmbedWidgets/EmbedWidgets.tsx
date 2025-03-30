import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import WallOfLoveModal from "./WallOfLoveModal";
import { SpaceType } from "@/lib/schemas/schema";

type EmbedWidgetOptions = "wall of love" | "";

const embedWidgetOptions: EmbedWidgetOptions[] = ["wall of love"];

// commmon props which will be passed to all embed widgets
export interface EmbedWidgetOptionsProps {
  // setIsEmbedWidgetModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // isEmbedWidgetModalVisible: boolean;
  space: SpaceType;
  /**
   * This is different from `activeEmbedWidget`.
   * `activeEmbedWidget` changes depending on which option user has clicked or whether user
   * has closed the modal for that embed Widget.
   *
   * `embedWidgetName` is passed to all embedWidgetsOptions in order to identify them.
   *
   * if(embedWidgetName === activeEmbedWidget)
   *  // Display the modal for widget
   *
   * When user closes the modal, we will do `setActiveEmbedWidget("")`
   *
   * This is needed to create a generic logic for opening and closing these modals.
   */
  embedWidgetName: EmbedWidgetOptions;
  activeEmbedWidget: EmbedWidgetOptions | "";
  setActiveEmbedWidget: React.Dispatch<
    React.SetStateAction<EmbedWidgetOptions>
  >;
}

const embedWidgetIcons: { [key in EmbedWidgetOptions]: React.ReactNode } = {
  "":null,
  "wall of love": <HeartIcon className="text-sm" />,
};

// When no embed widget is selected
const emptyEmbedJsx = () => {
  return <></>;
};

// widget for each embed option
const embedWidgetJsx = {
  "": emptyEmbedJsx,
  "wall of love": WallOfLoveModal,
};

interface EmbedWidgetsProps{
  space: SpaceType
}
const EmbedWidgets = ({space}: EmbedWidgetsProps) => {
  // By default, we have not sected any widget
  const [activeEmbedWidget, setActiveEmbedWidget] = useState<
    EmbedWidgetOptions | ""
  >("");
  const [isEmbedWidgetModalVisible, setIsEmbedWidgetModalVisible] =
    useState<boolean>(false);

  const CurrentEmbedWidgetJsx = embedWidgetJsx[activeEmbedWidget];
  return (
    <>
      {embedWidgetOptions.map((item) => {
        return (
          <>

          {/* Modal which is opened for the widget */}
          <CurrentEmbedWidgetJsx
           space={space}
           embedWidgetName={item}
           setActiveEmbedWidget={setActiveEmbedWidget}
           activeEmbedWidget={activeEmbedWidget}
            
          />
            {/* // Clicking on the option should open a modal for corresponding widget */}
            <div
              onClick={() => {
                setActiveEmbedWidget(item);
              }}
              className="px-5 py-2 cursor-pointer hover:bg-slate-200 rounded-md flex items-center"
            >
              {embedWidgetIcons[item]}
              <p className="ml-3 text-[#464545] font-semibold">
                {item[0].toUpperCase() + item.slice(1)}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default EmbedWidgets;
