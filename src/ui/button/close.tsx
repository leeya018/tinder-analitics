import React, { FC, useState } from "react"

type ButtonPropType = {
  onClick: any
}

const CloseButton: FC<ButtonPropType> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-xl absolute top-1 right-1"
    >
      x
    </button>
  )
}

export default CloseButton
