import React, { FC } from "react"

type LabelInputRadioPropType = {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

const LabelInputRadio: FC<LabelInputRadioPropType> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <label
      className={`${className} radio flex items-center gap-1 cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </label>
  )
}
export default LabelInputRadio
