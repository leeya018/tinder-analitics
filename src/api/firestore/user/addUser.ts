import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { User } from "./interfaces"

export const addUser = async (user: User) => {
  try {
    const docRef = doc(db, "users", user.userId)
    await setDoc(docRef, user)
  } catch (error) {
    const e = error as Error
    console.log(e.message)
  }
}
