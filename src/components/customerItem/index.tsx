import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Customer } from "@/api/firestore/customer/interfaces"
import { CustomerStore } from "@/mobx/customerStore"
import filterStore from "@/mobx/filterStore"
import moment from "moment"

type CustomerItemProps = {
  customer: Customer
}
const CustomerItem = observer<CustomerItemProps>(({ customer }) => {
  const handleClick = () => {
    filterStore.setFilter(customer.name)
    CustomerStore.setChosenCustomer(customer)
    CustomerStore.getMessages(customer.id, moment())
    CustomerStore.getLikes(customer.id, moment())
  }
  return (
    <div
      onClick={handleClick}
      className="w-full p-3 pl-5 flex  items-center hover:bg-gray-400/10"
    >
      {customer.name}
    </div>
  )
})

export default CustomerItem
