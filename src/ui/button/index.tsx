import React, { FC, useState } from "react"

type ButtonPropType = {
  children: React.ReactNode
  onClick: any
  className: string
  disabled: boolean
}

const Button: FC<ButtonPropType> = ({
  children,
  className,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
