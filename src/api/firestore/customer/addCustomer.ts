import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Customer } from "./interfaces"

export const addCustomer = async (customer: Customer) => {
  const docRef = doc(db, "customers", customer.id)
  await setDoc(docRef, customer)
}
