"use client"

import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Navbar from "@/components/navbar"
import ProtectedRout from "@/components/protectedRout"
import FilterOptions from "@/components/filterOptions"
import axios from "axios"
import {
  filePaths,
  getLikeFilePath,
  getUrl,
  imagesFilePath,
  likeFilePath,
} from "@/pages/api/util"

const InfoPage = observer(() => {
  const [nav, setNav] = useState<string>("images")
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    console.log({ imagesFilePath })
    fetchData()
    if (nav === "") {
      setData([])
    }
  }, [nav])

  const fetchData = () => {
    const path = `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/read`

    axios
      .post(path, { path: filePaths[nav] })
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const chooseNav = (name: string) => {
    if (name === nav) {
      setNav("")
    } else {
      setNav(name)
    }
  }
  return (
    <ProtectedRout>
      <Navbar />
      <div className="min-h-screen w-screen overflow-y-scroll mt-20">
        {/* options */}
        <FilterOptions chooseNav={chooseNav} nav={nav} />
        {/* items info */}
        {/* errors */}
        <ul>
          {data.map((line: string, key: number) => (
            <li key={key}>
              {" "}
              {line}
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRout>
  )
})

export default InfoPage
