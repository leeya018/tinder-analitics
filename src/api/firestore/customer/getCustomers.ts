import { db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Customer } from "./interfaces"

export const getCustomers = async () => {
  const collectionRef = collection(db, "customers")

  try {
    const querySnapshot = await getDocs(collectionRef)

    if (querySnapshot.empty) return []
    let customers: Customer[] = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())

      const { id, name } = doc.data()
      customers.push({ id, name })
    })

    return customers
  } catch (error) {
    console.error("Error getting documents: ", error)
    return []
  }
}
