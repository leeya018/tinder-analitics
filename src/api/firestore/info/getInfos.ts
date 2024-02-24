import { db } from "@/firebase"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

export const getInfos = async (filter: any) => {
  try {
    const colRef = collection(db, "info")

    const conditions = [
      where("type", "==", filter.type),
      orderBy("createdDate", "desc"),
    ]
    if (filter.customerName) {
      conditions.push(where("customerName", "==", filter.customerName))
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
