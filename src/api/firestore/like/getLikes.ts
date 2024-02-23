import { db } from "@/firebase"
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import moment from "moment"

export const getLikes = async (userId: string, date: moment.Moment) => {
  try {
    const month = date.month()
    const year = date.year()

    const startDate = new Date(year, month, 1) // Month is 0-indexed
    const endDate = new Date(year, month + 1, 0) // Last day of the month
    console.log({ startDate, endDate })

    // Convert dates to Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(startDate)
    const endTimestamp = Timestamp.fromDate(endDate)

    const collectionRef = collection(db, "likes")
    const q = query(
      collectionRef,
      where("userId", "==", userId),
      where("createdDate", ">=", startTimestamp),
      where("createdDate", "<=", endTimestamp),
      orderBy("createdDate")
    )

    const querySnapshot = await getDocs(q)
    const likes = querySnapshot.docs.map((doc) => doc.data())
    console.log({ likes })

    return likes
  } catch (error: any) {
    console.log(error.message)
    throw error
  }
}
