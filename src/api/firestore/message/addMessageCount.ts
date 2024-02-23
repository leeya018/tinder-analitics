import {
  getDocs,
  collection,
  Timestamp,
  doc,
  addDoc,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Message } from "./interfaces"
import { isCustomerExist } from "../customer/isCustomerExist"
import { addCustomer } from "../customer/addCustomer"
import { Customer } from "../customer/interfaces"

export const addMessageCount = async (
  newMessage: Message,
  customer: Customer
) => {
  try {
    const { userId, createdDate } = newMessage
    const isExists = await isCustomerExist(userId)
    if (!isExists) {
      await addCustomer(customer)
    }
    const date = createdDate.toDate()

    // Start of the day
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(startOfDay.getDate() + 1)

    const messageCollectionRef = collection(db, "messages")
    const q = query(
      messageCollectionRef,
      where("userId", "==", userId),
      where("createdDate", ">=", Timestamp.fromDate(startOfDay)),
      where("createdDate", "<", Timestamp.fromDate(endOfDay))
    )

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Update the first document found
      const documentToUpdate = querySnapshot.docs[0]
      await updateDoc(doc(db, "messages", documentToUpdate.id), {
        amount: increment(1),
      })
      console.log("Document updated successfully")
      return "Document updated successfully"
    } else {
      // Add a new document if no matching document is found
      const docRef = await addDoc(messageCollectionRef, newMessage)
      console.log("Message added successfully")
      return docRef.id
    }
  } catch (error) {
    console.log("Error in addLike function: ", error)
    throw new Error("Error in addLike function")
  }
}
