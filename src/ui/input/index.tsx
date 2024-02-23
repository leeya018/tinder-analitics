import React, { FC } from "react"
import { InputPropType } from "./interfaces"

const Input: FC<InputPropType> = ({
  name,
  type,
  className,
  onChange,
  value,
  placeholder,
  inputRef = null,
  onKeyDown = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <input
      type={type}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      ref={inputRef}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
export default Input
