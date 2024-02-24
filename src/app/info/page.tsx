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
      const infoFilter =
        CustomerStore.chosenCustomer === null
          ? { type: filter }
          : { type: filter, customerName: CustomerStore.chosenCustomer?.name }
      console.log({ name, infoFilter })
      getInfos(infoFilter)
        .then((infos) => {
          console.log(infos)
          setInfos(infos)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log({ filter })
    }
  }, [filter, CustomerStore.chosenCustomer?.name])

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

  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen max-w-screen mt-20 mx-20 overflow-hidden">
        {/* options */}
        <FilterOptions chooseFilter={chooseFilter} filter={filter} />
        <div className=" w-full">
          <FilterInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="search customers"
          />
          {/* customer list  */}
          {isShowCustomerList && (
            <div className="relative w-full">
              <div className="absolute w-full">
                <CustomerList name={name} setName={setName} />
              </div>
            </div>
          )}
        </div>

        {/* items info */}
        {/* errors */}
        {/*  data list  */}
        <DataList infos={infos} filter={filter} />
      </div>
    </ProtectedRout>
  )
})

export default InfoPage
