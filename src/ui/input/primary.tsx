import React, { FC } from "react"
import Input from "."
import { InputPropType } from "./interfaces"

const PrimaryInput: FC<InputPropType> = ({ className = "", ...rest }) => {
  return (
    <Input
      {...rest}
      className={`outline-none mb-2 border-2 border-[#4B6DCF] 
    text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue ${className}`}
    />
  )
}
export default PrimaryInput
