import React, { FC, useEffect, useState } from "react"

import { LabelInputItemProps } from "./hooks/interfaces"
import { observer } from "mobx-react-lite"

const LabelInputItem: FC<LabelInputItemProps> = observer(
  ({ onChange, value, title, inputRef = null }) => {
    return (
      <div className="flex flex-col items-start gap-1">
        <label className="font-semibold text-color-text-gray" htmlFor="">
          {title}
        </label>
        <input
          ref={inputRef}
          onChange={onChange}
          value={value}
          className="rounded-md p-2 border-2 
       border-color-text-gray pl-2
        placeholder:text-color-hover-gray 
        font-semibold placeholder:pl-2"
          placeholder={`Add ${title}`}
        />
      </div>
    )
  }
)
export default LabelInputItem
