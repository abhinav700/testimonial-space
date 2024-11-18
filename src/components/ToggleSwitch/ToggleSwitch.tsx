import React, { SetStateAction, useState } from "react";
import "./ToggleSwitch.css"
interface ToggleSwitchProps {
  Name: string;
  toggledValue: boolean;
  setToggledValue: React.Dispatch<SetStateAction<boolean>>;
}

const ToggleSwitch = ({Name, toggledValue,setToggledValue}: ToggleSwitchProps) => {
  return (
    <div className="my-5 flex items-center">
      <span className="text-md font-bold">{Name}</span>
      <button
        className={`toggle-btn ${toggledValue ? "toggled" : ""} ml-3`}
        onClick={() => {
          console.log(`changed showBorder from ${toggledValue} to ${!toggledValue}`)
          setToggledValue(!toggledValue);
        }}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default ToggleSwitch;
