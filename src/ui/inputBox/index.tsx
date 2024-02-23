import React, { FC } from "react"

type InputPropType = {
  checked: boolean
  name: string
  className: string
  type: string
  onChange?: () => void
}

const Input: FC<InputPropType> = ({
  name,
  checked,
  className,
  type,
  onChange = () => {},
}) => {
  return (
    <input
      checked={checked}
      type={type}
      className={className}
      name={name}
      onChange={onChange}
    />
  )
}
export default Input
