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

const HomePage = observer(() => {
  const [isShowCustomerList, setIsShowCustomerList] = useState(false)
  const [chosenDate, setChosenDate] = useState<moment.Moment>(moment())
  const [likes, setLikes] = useState<string[]>([])
  const [passes, setPasses] = useState<string[]>([])
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

  useEffect(() => {
    if (CustomerStore.chosenCustomer) {
      Promise.all([fetchData(getPassFilePath), fetchData(getLikeFilePath)])
        .then((data) => {
          console.log(data)
          setPasses(data[0])
          setLikes(data[1])
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [CustomerStore.chosenCustomer])

  const fetchData = async (callback: any) => {
    const path = `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/read`
    const name = CustomerStore.chosenCustomer?.name
    if (!name) throw new Error("name of customer not defined")
    try {
      const res = await axios.post(path, { path: callback(name) })
      return res.data
    } catch (error: any) {
      console.log(error.message)
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

  const handleClick = (filt: string) => {
    setFilter(filt)
    ModalStore.openModal(modals.userInfo)
  }

  console.log({ chosenDate })
  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen w-screen overflow-y-scroll mt-20">
        {ModalStore.modalName === modals.userInfo && (
          <Modal>{filter === "likes" ? likes : passes}</Modal>
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
                  onChange={(e) => filterStore.setFilter(e.target.value)}
                  value={filterStore.search}
                  placeholder="search customers"
                />
                {/* customer list  */}
                {isShowCustomerList && (
                  <div className="relative w-full">
                    <div className="absolute w-full">
                      <CustomerList />
                    </div>
                  </div>
                )}
              </div>
              {/* buttons */}
              <div className="flex justify-start gap-2">
                <button
                  onClick={() => handleClick("likes")}
                  className="p-2 border-2 border-blue-500 text-blue-500  rounded-full hover:bg-blue-500 hover:border-none hover:text-white cursor-pointer w-28 text-center"
                >
                  likes
                </button>
                <button
                  onClick={() => handleClick("passes")}
                  className="p-2 border-2 border-blue-500 text-blue-500  rounded-full hover:bg-blue-500 hover:border-none hover:text-white cursor-pointer w-28 text-center"
                >
                  passes
                </button>
              </div>
              <div>
                {/* calender + graph */}
                {CustomerStore.chosenCustomer && (
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
