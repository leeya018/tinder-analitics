"use client"

import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Navbar from "@/components/navbar"
import ProtectedRout from "@/components/protectedRout"

const InfoPage = observer(() => {
  const [nav, setNav] = useState("")

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
      <div className="min-h-screen w-screen overflow-y-scroll ">
        {/* options */}
        <ul className="flex items-center py-3 gap-2 justify-center">
          <NavItem
            onClick={() => chooseNav("actions")}
            name={"actions"}
            chosenNav={nav}
          />
          <NavItem
            onClick={() => chooseNav("messages")}
            name={"messages"}
            chosenNav={nav}
          />
          <NavItem
            onClick={() => chooseNav("errors")}
            name={"errors"}
            chosenNav={nav}
          />
        </ul>
      </div>
    </ProtectedRout>
  )
})

export default InfoPage

type NavItemProps = {
  onClick: () => void
  name: string
  chosenNav: string
}
const NavItem = ({ onClick, name, chosenNav }: NavItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`p-2  border-2 rounded-full hover:bg-blue-400 hover:text-white cursor-pointer w-28 text-center ${
        chosenNav === name
          ? "text-white bg-blue-500"
          : "text-blue-500 border-blue-500"
      }`}
    >
      {name}
    </li>
  )
}
