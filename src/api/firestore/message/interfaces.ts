import { Timestamp } from "firebase/firestore"

export type Message = {
  userId: string
  amount: number
  createdDate: Timestamp
}
