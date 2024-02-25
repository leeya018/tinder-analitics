import { db } from "@/firebase"
import { fromMomentToTimestamp } from "@/pages/api/util"
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import moment from "moment"

export const getInfos = async (filter: any) => {
  try {
    const colRef = collection(db, "info")

    const conditions = [
      where("type", "==", filter.type),
      orderBy("createdDate", "desc"),
    ]

    console.log()
    if (filter.customerName) {
      conditions.push(where("customerName", "==", filter.customerName))
    }
    if (filter.createdDate) {
      const startMDate = moment(filter.createdDate).startOf("day")
      const endMDate = moment(filter.createdDate).endOf("day")

      console.log({ startMDate, endMDate })
      const startTimestamp = fromMomentToTimestamp(startMDate)
      const endTimestamp = fromMomentToTimestamp(endMDate)

      console.log({ startTimestamp, endTimestamp })

      conditions.push(where("createdDate", ">=", startTimestamp))
      conditions.push(where("createdDate", "<=", endTimestamp))
    }
    const q = query(colRef, ...conditions)
    const querySnapshot = await getDocs(q)
    const infos = querySnapshot.docs.map((doc) => doc.data())
    return infos
  } catch (error) {
    console.log("Error in getInfo function: ", error)
    throw new Error("Error in getInfo function")
  }
}
