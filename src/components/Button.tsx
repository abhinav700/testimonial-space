"use client";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  className?: string;
  children: ReactNode;
  onMouseOver?: any;
}
const Button = ({
  onClick,
  className,
  children,
  onMouseOver,
  onBlur,
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onBlur={(e) => {
        if (onBlur) onBlur(e);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
