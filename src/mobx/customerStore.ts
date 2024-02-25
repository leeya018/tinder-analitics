import {
  getCustomersFirestore,
  getLikesFirestore,
  getMessagesFirestore,
} from "@/api/firestore"
import { Customer } from "@/api/firestore/customer/interfaces"
import { autorun, makeAutoObservable, toJS } from "mobx"
import { makePersistable } from "mobx-persist-store"
import moment from "moment"

const xlsArr = [
  {
    name: "lee",
    token: "a8843927-9920-48ab-a0d6-82e91874c5db",
    lookFor: "sex",
    isLookGood: 0,
    isWithLikes: 1,
    isWithMessages: 0,
    isProcess: 0,
  },
]

export const customerStatus = {
  success: "success",
  failed: "failed",
}
class CustomerS {
  customersXlsData: any[] = xlsArr
  // customersXlsData: any[] = []
  customers: Customer[] = []
  chosenCustomer: Customer | null = null
  likes: any[] = []
  messages: any[] = []
  chosenUrls: string[] = []

  constructor() {
    makeAutoObservable(this)
    this.getCustomers()
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "customerStore",
        properties: ["customers"],
        storage: window.localStorage,
      })
    }
  }

  setCustomersXls(xlsDataJson: any) {
    const headers = xlsDataJson[0]
    const result = xlsDataJson.slice(1).map((row: any) => {
      const obj: any = {}
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index]
      })
      return obj
    })
    console.log({ result })
    this.customersXlsData = result
  }
  updateCustomersXls(currInd: number, infoItem: any) {
    const dupCustomersXlsData = this.customersXlsData.map((cXlsIfo, ind) => {
      if (ind === currInd) {
        return { ...cXlsIfo, ...infoItem }
      }
      return cXlsIfo
    })
    this.customersXlsData = dupCustomersXlsData
  }

  setChosenCustomer(customer: Customer | null) {
    this.chosenCustomer = customer
  }
  async getCustomers() {
    this.customers = await getCustomersFirestore()
  }
  async getLikes(customerId: string, date: moment.Moment) {
    this.likes = await getLikesFirestore(customerId, date)
  }
  async getMessages(customerId: string, date: moment.Moment) {
    this.messages = await getMessagesFirestore(customerId, date)
  }
  setChosenImages(urls: string[]) {
    this.chosenUrls = urls
  }
}
export const CustomerStore = new CustomerS()

autorun(() => {
  // console.log(CustomerStore.customersXlsData)
  // for (const item of CustomerStore.customersXlsData) {
  //   console.log(toJS(item))
  // }
  console.log(CustomerStore.chosenCustomer)
})
