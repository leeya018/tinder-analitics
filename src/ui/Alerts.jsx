import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { messageStore } from "@/mobx/messageStore"
let timeoutInter = null
const Alerts = observer(() => {
  const { message, setMessage, status } = messageStore
  useEffect(() => {
    timeoutInter = setTimeout(() => {
      setMessage("", 0)
    }, 3000)
    return () => clearInterval(timeoutInter)
  }, [message])

  const isSuccess = (status) => {
    return status === 200 || status === 201
  }
  return (
    <div
      className={`${
        status === 0 ? "hidden" : "absolute"
      }   top-0 left-0 right-0 z-50 w-screen flex justify-center  items-center h-10`}
    >
      <div
        className={`${
          isSuccess(status) ? "bg-color-green" : "bg-color-red"
        } w-full flex justify-center items-center h-full`}
      >
        {message}
      </div>
    </div>
  )
})

export default Alerts
