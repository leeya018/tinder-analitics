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
      <FilterItem
        onClick={() => chooseFilter(infoTypes.FUNCTION)}
        name={infoTypes.FUNCTION}
        chosenNav={filter}
      />
      <FilterItem
        onClick={() => chooseFilter(infoTypes.MESSAGE)}
        name={infoTypes.MESSAGE}
        chosenNav={filter}
      />
      <FilterItem
        onClick={() => chooseFilter(infoTypes.ERROR)}
        name={infoTypes.ERROR}
        chosenNav={filter}
      />
    </ul>
  )
}

type FilterItemProps = {
  onClick: () => void
  name: string
  chosenNav: string
}

const FilterItem = ({ onClick, name, chosenNav }: FilterItemProps) => {
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
