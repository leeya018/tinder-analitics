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

const InfoPage = observer(() => {
  const [filter, setFilter] = useState<string>(infoTypes.MESSAGE)
  const [infos, setInfos] = useState<Info[]>([])

  useEffect(() => {
    console.log({ imagesFilePath })

    if (filter === "") {
      setInfos([])
    } else {
      getInfos({ type: filter })
        .then((infos) => {
          console.log(infos)
          setInfos(infos)
        })
        .catch((error) => {
          console.log(error.message)
        })
      console.log({ filter })
    }
  }, [filter])

  const chooseFilter = (name: string) => {
    if (name === filter) {
      setFilter("")
    } else {
      setFilter(name)
    }
  }
  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen max-w-screen mt-20 mx-20 overflow-hidden">
        {/* options */}
        <FilterOptions chooseFilter={chooseFilter} filter={filter} />
        {/* items info */}
        {/* errors */}
        {/*  data list  */}
        <DataList infos={infos} filter={filter} />
      </div>
    </ProtectedRout>
  )
})

export default InfoPage
