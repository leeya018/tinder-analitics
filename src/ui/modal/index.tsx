import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ModalStore } from "@/mobx/modalStore"

type ModalProps = {
  children: React.ReactNode
}
const Modal: FC<ModalProps> = observer(({ children }) => {
  return (
    <div
      onClick={() => ModalStore.closeModal()}
      className="absolute inset-0
       bg-color-black  z-50 h-full w-full border-2
       bg-color-text-gray bg-opacity-30
       flex items-center justify-center
     "
    >
      <div
        className="absolute border-2  w-[50%]
       bg-color-white  rounded-lg  flex items-center justify-center  h-auto p-10 "
        onClick={(e: any) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
})
export default Modal
