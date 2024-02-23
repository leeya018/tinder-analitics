import React, { FC, useState } from "react"
import Button from "."

type ButtonPropType = {
  children: React.ReactNode
  onClick: (param: any) => void
  className: string
  disabled?: boolean
}

const Primary: FC<ButtonPropType> = ({
  children,
  className,
  disabled = false,

  ...rest
}) => {
  return (
    <Button
      {...rest}
      disabled={disabled}
      className={`   border-2 bg-color-blue text-color-white 
      rounded-md py-2 px-4 cursor-pointer ${
        disabled ? "text-color-black  bg-color-disabled-gray" : "border-2"
      } ${className}`}
    >
      {children}
    </Button>
  )
}

export default Primary
