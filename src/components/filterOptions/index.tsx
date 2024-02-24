import { infoTypes } from "@/pages/api/util"
import React from "react"

type FilterOptionsProps = {
  chooseFilter: (name: string) => void
  filter: string
}

export default function FilterOptions({
  chooseFilter,
  filter,
}: FilterOptionsProps) {
  return (
    <ul className="flex items-center py-3 gap-2 justify-center">
      <NavItem
        onClick={() => chooseFilter(infoTypes.FUNCTION)}
        name={"actions"}
        chosenNav={filter}
      />
      <NavItem
        onClick={() => chooseFilter(infoTypes.MESSAGE)}
        name={"messages"}
        chosenNav={filter}
      />
      <NavItem
        onClick={() => chooseFilter(infoTypes.ERROR)}
        name={"errors"}
        chosenNav={filter}
      />
    </ul>
  )
}

type NavItemProps = {
  onClick: () => void
  name: string
  chosenNav: string
}

const NavItem = ({ onClick, name, chosenNav }: NavItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`p-2  rounded-full hover:bg-blue-400 hover:border-none hover:text-white cursor-pointer w-28 text-center ${
        chosenNav === name
          ? "text-white bg-blue-500 border-none"
          : "text-blue-500 border-blue-500 border-2 "
      }`}
    >
      {name}
    </li>
  )
}
