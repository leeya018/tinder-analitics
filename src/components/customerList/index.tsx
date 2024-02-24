import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { CustomerStore } from "@/mobx/customerStore"
import { Customer } from "@/api/firestore/customer/interfaces"
import CustomerItem from "../customerItem"

type CustomerListProps = {
  name: string
  handleClick: (customer: Customer) => void
}
const CustomerList = observer(({ name, handleClick }: CustomerListProps) => {
  return (
    <ul>
      {CustomerStore.customers
        .filter((customer: Customer) =>
          customer.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
        .map((customer: Customer, key: number) => (
          <CustomerItem
            key={key}
            customer={customer}
            handleClick={handleClick}
          />
        ))}
    </ul>
  )
})

export default CustomerList
