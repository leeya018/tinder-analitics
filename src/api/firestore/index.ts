import { getMessages as getMessagesFirestore } from "./message/getMessages"
import { getLikes as getLikesFirestore } from "./like/getLikes"
import { getCustomers as getCustomersFirestore } from "./customer/getCustomers"
import { getInfos as getInfosFirestore } from "./info/getInfos"
import { addInfo as addInfoFirestore } from "./info/addInfo"
import { getUser as getUserFirestore } from "./user/getUser"

export {
  getMessagesFirestore,
  getLikesFirestore,
  getCustomersFirestore,
  getInfosFirestore,
  addInfoFirestore,
  getUserFirestore,
}
