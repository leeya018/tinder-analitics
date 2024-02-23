import React, { FC } from "react"

type LabelInputPropType = {
  children: React.ReactNode
  onChange: () => void
  className: string
}

const LabelInput: FC<LabelInputPropType> = ({
  children,
  onChange,
  className = "",
}) => {
  return (
    <label className={className} onChange={onChange}>
      {children}
    </label>
  )
}
export default LabelInput
