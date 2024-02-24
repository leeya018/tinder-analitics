import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Customer } from "@/api/firestore/customer/interfaces"

type CustomerItemProps = {
  customer: Customer
  handleClick: (customer: Customer) => void
}
const CustomerItem = observer<CustomerItemProps>(
  ({ customer, handleClick }) => {
    return (
      <div
        onClick={() => handleClick(customer)}
        className="w-full p-3 pl-5 flex  items-center hover:bg-gray-400/10"
      >
        {customer.name}
      </div>
    )
  }
)

export default CustomerItem
