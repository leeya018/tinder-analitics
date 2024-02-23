import React, { FC } from "react"
import Input from "."

type InputPropType = {
  checked: boolean
  name: string
  className?: string
}

const InputRadio: FC<InputPropType> = ({ className = "", ...rest }) => {
  return (
    <Input
      {...rest}
      type="radio"
      className={`${className} w-5 h-5 cursor-pointer`}
    />
  )
}
export default InputRadio
