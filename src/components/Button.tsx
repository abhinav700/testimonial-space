"use client"
import React, { ReactNode } from 'react'

const Button = ({onClick, className, children}:{onClick: (e:any) => void, className?: string, children:ReactNode}) => {
  return (
    <button className={className} onClick={onClick}>{children}</button>
  )
}

export default Button