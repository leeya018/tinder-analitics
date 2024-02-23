import { db } from "@/firebase"
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { Like } from "./interfaces"
import { isCustomerExist } from "../customer/isCustomerExist"
import { addCustomer } from "../customer/addCustomer"
import { Customer } from "../customer/interfaces"

export const addLike = async (
  newLike: Like,
  customer: Customer
): Promise<string | void> => {
  try {
    const { userId, createdDate, likeUrl } = newLike
    const isExists = await isCustomerExist(userId)
    if (!isExists) {
      await addCustomer(customer)
    }
    const date = createdDate.toDate()

    // Start of the day
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))

    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(startOfDay.getDate() + 1)

    const messageCollectionRef = collection(db, "likes")
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
      await updateDoc(doc(db, "likes", documentToUpdate.id), {
        likeUrls: arrayUnion(likeUrl),
      })
      console.log("Document updated successfully")
      return "Document updated successfully"
    } else {
      // Add a new document if no matching document is found
      const docRef = await addDoc(messageCollectionRef, {
        userId,
        createdDate,
        likeUrls: [likeUrl],
      })
      console.log("Like added successfully")
      return docRef.id
    }
  } catch (error) {
    console.log("Error in addLike function: ", error)
    throw new Error("Error in addLike function")
  }
}
