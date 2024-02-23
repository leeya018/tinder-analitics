import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ModalStore } from "@/mobx/modalStore"
import { MdClose } from "react-icons/md"

type ModalProps = {
  children: React.ReactNode
}
const Modal: FC<ModalProps> = observer(({ children }) => {
  return (
    <div
      onClick={() => ModalStore.closeModal()}
      className="absolute inset-0 
         z-50 min-h-screen border-2 bg-black/20
       flex items-center justify-center
     "
    >
      {/* inner div */}
      <div
        className="absolute h-[80%] w-[80%] bg-white  "
        onClick={(e: any) => e.stopPropagation()}
      >
        {/* close button */}
        <div
          className="absolute top-4 right-4 cursor-pointer
        "
          onClick={() => ModalStore.closeModal()}
        >
          <MdClose size={30} />
        </div>
        {children}
      </div>
    </div>
  )
})
export default Modal
