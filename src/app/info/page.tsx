"use client"

import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import ProtectedRout from "@/components/protectedRout"
import FilterOptions from "@/components/filterOptions"
import axios from "axios"
import { imagesFilePath, infoTypes } from "@/pages/api/util"
import DataList from "@/components/dataList"
import Navbar from "@/components/navbar"
import { Info } from "@/api/firestore/info/interfaces"
import { getInfos } from "@/api/firestore/info/getInfos"
import FilterInput from "@/ui/input/filter"
import filterStore from "@/mobx/filterStore"
import CustomerList from "@/components/customerList"
import { CustomerStore } from "@/mobx/customerStore"
import { Customer } from "@/api/firestore/customer/interfaces"

const InfoPage = observer(() => {
  const [filter, setFilter] = useState<string>(infoTypes.MESSAGE)
  const [infos, setInfos] = useState<Info[]>([])
  const [isShowCustomerList, setIsShowCustomerList] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    console.log({ imagesFilePath })

    if (filter === "") {
      setInfos([])
    } else {
      console.log({ filter })
      getInfos({ type: filter })
        .then((infos) => {
          console.log(infos)
          setInfos(infos)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log({ filter })
    }
  }, [filter, CustomerStore.chosenCustomer])

  useEffect(() => {
    if (!isShowCustomerList && name === "") {
      CustomerStore.setChosenCustomer(null)
    }
  }, [isShowCustomerList, name])

  const chooseFilter = (name: string) => {
    if (name === filter) {
      setFilter("")
    } else {
      setFilter(name)
    }
  }

  const handleFocus = () => {
    setIsShowCustomerList(true)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setIsShowCustomerList(false)
    }, 500)
  }

  const customerClick = (customer: Customer) => {
    CustomerStore.setChosenCustomer(customer)
    setName(customer.name)
  }
  const filterInfos = () => {
    const custName = CustomerStore.chosenCustomer?.name
    if (!custName) return infos
    return infos.filter((info) => info.customerName === custName)
  }

  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen max-w-screen mt-20 mx-20 overflow-hidden">
        {/* options */}
        <FilterOptions
          chooseFilter={chooseFilter}
          filter={filter}
          items={[infoTypes.ERROR, infoTypes.FUNCTION, infoTypes.MESSAGE]}
        />
        {CustomerStore.chosenCustomer && (
          <FilterOptions
            chooseFilter={chooseFilter}
            filter={filter}
            items={[infoTypes.LIKE, infoTypes.PASS]}
          />
        )}

        <div className=" w-full">
          <FilterInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="search customers"
          />

          {isShowCustomerList && (
            <div className="relative w-full">
              <div className="absolute w-full z-10 bg-gray-500">
                <CustomerList name={name} handleClick={customerClick} />
              </div>
            </div>
          )}
        </div>

        {/* items info */}
        {/* errors */}
        {/*  data list  */}
        <DataList infos={filterInfos()} filter={filter} />
      </div>
    </ProtectedRout>
  )
})

export default InfoPage
