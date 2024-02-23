import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Modal from "."
import { Timestamp } from "firebase/firestore"
import { FcApproval } from "react-icons/fc"
type ModalProps = {
  onClose: any
  title: string
  messageArr: string[]
}
const MessageModal: FC<ModalProps> = observer(
  ({ onClose, title, messageArr }) => {
    // console.log({ messageArr })
    return (
      <Modal>
        <div className="py-4 px-8 flex flex-col items-center justify-around gap-5 h-full  w-full ">
          <FcApproval size={85} />
          <div className="flex flex-col items-center gap-2">
            <div className="font-bold text-2xl ">{title}</div>

            <ul className="flex flex-col gap-5 list-disc  ">
              {messageArr.map((message, key) => (
                <li key={key}>{message}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={onClose}
            className="  border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
          >
            DONE
          </button>
        </div>
      </Modal>
    )
  }
)
export default MessageModal
