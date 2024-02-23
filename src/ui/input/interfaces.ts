import React from "react"

export type InputPropType = {
  name?: string
  className?: string
  type: string
  onChange: (e: any) => void
  value: any
  placeholder?: string
  inputRef?: React.RefObject<HTMLInputElement>
  onKeyDown?: any
  onBlur?: any
  onFocus?: any
}
