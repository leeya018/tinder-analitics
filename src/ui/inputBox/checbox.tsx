import React, { FC } from "react"
import Input from "."

type InputPropType = {
  checked: boolean
  onChange: () => void
  className?: string
}

const InputCheckbox: FC<InputPropType> = ({
  onChange = () => {},
  checked,
  className = "",
}) => {
  return (
    <input
      checked={checked}
      type="checkbox"
      onChange={onChange}
      className={`${className} w-5 h-5 cursor-pointer`}
    />
  )
}
export default InputCheckbox
