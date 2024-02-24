import { db } from "@/firebase"
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"

export const getInfos = async (filter: any) => {
  try {
    const colRef = collection(db, "info")
    const q = query(
      colRef,
      where("type", "==", filter.type),
      orderBy("createdDate", "desc")
    )
    const querySnapshot = await getDocs(q)
    const infos = querySnapshot.docs.map((doc) => doc.data())
    return infos
  } catch (error) {
    console.log("Error in getInfo function: ", error)
    throw new Error("Error in getInfo function")
  }
}
