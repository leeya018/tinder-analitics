import { Timestamp } from "firebase/firestore"

export type Like = {
  userId: string
  likeUrl: string
  createdDate: Timestamp
}
