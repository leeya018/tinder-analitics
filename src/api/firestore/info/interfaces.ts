import { Timestamp } from "firebase/firestore"

export type Info = {
  type: string
  data: string
  createdDate?: Timestamp
  customerName?: string
}
