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
import { NavNames, modals } from "@/pages/api/util"
import ProtectedRout from "@/components/protectedRout"
import Navbar from "@/components/navbar"
import Calender from "@/components/calender"
import moment from "moment"
import Modal from "@/ui/modal"
import Image from "next/image"
import { ModalStore } from "@/mobx/modalStore"

const ViewPage = observer(() => {
  const [isShowCustomerList, setIsShowCustomerList] = useState(false)
  const [chosenDate, setChosenDate] = useState<moment.Moment>(moment())
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

  console.log({ chosenDate })
  return (
    <ProtectedRout>
      <div className="min-h-screen w-screen overflow-y-scroll">
        {ModalStore.modalName === modals.images && (
          <Modal>
            <ul className=" flex justify-between flex-wrap  w-[80vw] overflow-y-scroll">
              {CustomerStore.chosenUrls.map((url, key) => {
                return (
                  <li key={key}>
                    <Image
                      alt="women image"
                      width={100}
                      height={200}
                      className="rounded-lg "
                      src={url}
                    />
                  </li>
                )
              })}
            </ul>
          </Modal>
        )}
        <div className="mb-2">
          <div className="mt-10 flex justify-center items-center"></div>
          <div className="flex justify-center ">
            <div className="w-[80%]  flex flex-col justify-center  gap-5">
              <div className=" w-full">
                <FilterInput
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => filterStore.setFilter(e.target.value)}
                  value={filterStore.search}
                  placeholder="search customers"
                />
                {isShowCustomerList && (
                  <div className="relative w-full">
                    <div className="absolute w-full">
                      <CustomerList />
                    </div>
                  </div>
                )}
              </div>
              {/* <div>
                {CustomerStore.chosenCustomer && (
                  <div className="md:flex  ">
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
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRout>
  )
})

export default ViewPage
