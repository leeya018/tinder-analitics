import { db } from "@/firebase"
import { collection, doc, getDoc } from "firebase/firestore"

export const getCustomerById = async (customerId: string) => {
  const userDocRef = doc(db, "customers", customerId)
  const userDocSnap = await getDoc(userDocRef)
  return userDocSnap.data()
}
