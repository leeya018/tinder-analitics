"use client"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Title from "@/ui/title"
import FilterInput from "@/ui/input/filter"
import filterStore from "@/mobx/filterStore"
import CustomerList from "@/components/customerList"
import { CustomerStore } from "@/mobx/customerStore"
import Graph from "@/components/graph"

import { useRouter } from "next/navigation"
import {
  NavNames,
  getLikeFilePath,
  getPassFilePath,
  getUrl,
  infoTypes,
  modals,
} from "@/pages/api/util"
import ProtectedRout from "@/components/protectedRout"
import Navbar from "@/components/navbar"
import Calender from "@/components/calender"
import moment from "moment"
import Modal from "@/ui/modal"
import Image from "next/image"
import { ModalStore } from "@/mobx/modalStore"
import axios from "axios"
import navStore from "@/mobx/navStore"
import DataList from "@/components/dataList"
import { Info } from "@/api/firestore/info/interfaces"
import { getInfos } from "@/api/firestore/info/getInfos"
import { Customer } from "@/api/firestore/customer/interfaces"

const HomePage = observer(() => {
  const [isShowCustomerList, setIsShowCustomerList] = useState(false)
  const [name, setName] = useState("")
  const [chosenDate, setChosenDate] = useState<moment.Moment>(moment())
  const [infos, setInfos] = useState<Info[]>([])
  const [filter, setFilter] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    if (CustomerStore.chosenCustomer) {
      console.log("calender change useEffect")
      const customerId = CustomerStore.chosenCustomer.id
      CustomerStore.getLikes(customerId, chosenDate)
      CustomerStore.getMessages(customerId, chosenDate)
    }
  }, [chosenDate.month(), CustomerStore.chosenCustomer])

  const handleFocus = () => {
    setIsShowCustomerList(true)
  }
  const handleBlur = () => {
    setTimeout(() => {
      setIsShowCustomerList(false)
    }, 500)
  }

  const filterClick = async (filt: string) => {
    setFilter(filt)
    const data = await getInfos({ type: filt })
    console.log({ data })
    setInfos(data)
    ModalStore.openModal(modals.userInfo)
  }

  const customerClick = (customer: Customer) => {
    setName(customer.name)
    CustomerStore.setChosenCustomer(customer)
    CustomerStore.getMessages(customer.id, moment())
    CustomerStore.getLikes(customer.id, moment())
  }
  console.log({ chosenDate })
  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen w-screen overflow-y-scroll mt-20">
        {ModalStore.modalName === modals.userInfo && (
          <Modal>
            <DataList infos={infos} filter={filter} />
          </Modal>
        )}
        <div className="mb-2">
          <div className="mt-10 flex justify-center items-center"></div>
          <div className="flex justify-center ">
            <div className="w-[80%]  flex flex-col justify-center  gap-5">
              {/* filter  */}
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
                      <CustomerList name={name} handleClick={customerClick} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                {/* calender + graph */}
                {CustomerStore.chosenCustomer && (
                  <div>
                    {/* buttons */}
                    <div className="flex justify-start gap-2">
                      <button
                        onClick={() => filterClick(infoTypes.LIKE)}
                        className="p-2 border-2 border-blue-500 text-blue-500  rounded-full hover:bg-blue-500 hover:border-none hover:text-white cursor-pointer w-28 text-center"
                      >
                        likes
                      </button>
                      <button
                        onClick={() => filterClick(infoTypes.PASS)}
                        className="p-2 border-2 border-blue-500 text-blue-500  rounded-full hover:bg-blue-500 hover:border-none hover:text-white cursor-pointer w-28 text-center"
                      >
                        passes
                      </button>
                    </div>
                    <div className="lg:flex items-center justify-around  ">
                      <Calender
                        chosenDate={chosenDate}
                        setChosenDate={setChosenDate}
                      />
                      <Graph
                        date={chosenDate}
                        likes={CustomerStore.likes}
                        messages={CustomerStore.messages}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRout>
  )
})

export default HomePage
