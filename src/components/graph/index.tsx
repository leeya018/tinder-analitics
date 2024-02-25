import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Message } from "@/api/firestore/message/interfaces"
import StackChart from "./stackChart"
import moment from "moment"
import { formatDateTs, fromTimestampToMoment, modals } from "@/pages/api/util"
import { toJS } from "mobx"
import { CustomerStore } from "@/mobx/customerStore"
import MessageModal from "@/ui/modal/message"
import { ModalStore } from "@/mobx/modalStore"

type GraphProps = {
  likes: any[]
  messages: Message[]
  date: moment.Moment
  setInfos: any
}

const Graph = observer<GraphProps>(({ likes, messages, date, setInfos }) => {
  const [chartItems, setChartItems] = useState<any[]>([])

  useEffect(() => {
    try {
      console.log({ likes: toJS(likes), messages: toJS(messages), date })

      const data = convertData()
      console.log({ data })
      setChartItems(data)
    } catch (error: any) {
      console.log(error.stack)
    }
  }, [date, likes, messages])

  const createObjDates = () => {
    const startOfMonth = moment(date).startOf("month")
    const endOfMonth = moment(date).endOf("month")

    console.log({ startOfMonth, endOfMonth })

    const datesInMonth: any = {}

    for (
      let date = startOfMonth;
      date.isBefore(endOfMonth) || date.isSame(endOfMonth);
      date.add(1, "days")
    ) {
      const formattedDate = date.format("DD-MM-YYYY")
      datesInMonth[formattedDate] = {
        likes: 0,
        messages: 0,
      }
    }
    console.log({ datesInMonth })
    return datesInMonth
  }

  const fillDateObj = (dateObj: any) => {
    console.log(dateObj)

    for (const like of likes) {
      const formattedDate = formatDateTs(like.createdDate)
      dateObj[formattedDate].likes = like.likeUrls.length
    }
    for (const message of messages) {
      dateObj[formatDateTs(message.createdDate)].messages = message.amount
    }
    console.log({ dateObj })
    return dateObj
  }

  const convertData = () => {
    try {
      let dateObj = createObjDates()
      console.log({ dateObj1: dateObj })
      dateObj = fillDateObj(dateObj)
      console.log({ dateObj2: dateObj })
      let dataItems: any = []
      Object.keys(dateObj).forEach((dateStr: string) => {
        dataItems.push({
          date: dateStr,
          likes: dateObj[dateStr].likes,
          messages: dateObj[dateStr].messages,
        })
      })
      console.log({ dataItems })
      return dataItems
    } catch (error: any) {
      console.log(error.message)
      throw error
    }
  }

  const getLikeImageUrls = (index: number) => {
    const likeItem = likes.find((like) => {
      const day = fromTimestampToMoment(like.createdDate).date()
      if (day === Number(index)) {
        return like
      }
    })
    if (!likeItem) return []
    console.log(likeItem.likeUrls)
    // CustomerStore.setChosenImages(likeItem.likeUrls)
    setInfos(likeItem.likeUrls)
    ModalStore.openModal(modals.userInfo)

    return likeItem.likeUrls
  }
  return (
    <div className="flex justify-center items-center  w-full ">
      <StackChart
        items={chartItems}
        label1={"Likes"}
        label2={"Messages"}
        name={"Data view"}
        onClick={getLikeImageUrls}
      />
    </div>
  )
})

export default Graph
