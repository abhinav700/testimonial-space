"use client";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: ReactNode;
  onMouseOver? : any
}
const Button = ({ onClick, className, children, onMouseOver }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} onMouseOver={onMouseOver}>
      {children}
    </button>
  );
};

export default Button;
