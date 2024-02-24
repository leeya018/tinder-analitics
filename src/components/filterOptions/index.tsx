import { infoTypes } from "@/pages/api/util"
import React from "react"

type FilterOptionsProps = {
  chooseFilter: (name: string) => void
  filter: string
  items: string[]
}

export default function FilterOptions({
  chooseFilter,
  filter,
  items,
}: FilterOptionsProps) {
  return (
    <ul className="flex items-center py-3 gap-2 justify-center">
      {items.map((item: string, key: number) => (
        <FilterItem
          key={key}
          onClick={() => chooseFilter(item)}
          name={item}
          filterName={filter}
        />
      ))}
    </ul>
  )
}

type FilterItemProps = {
  onClick: () => void
  name: string
  filterName: string
}

const FilterItem = ({ onClick, name, filterName }: FilterItemProps) => {
  return (
    <li
      onClick={onClick}
      className={`p-2  rounded-full hover:bg-blue-400 hover:border-none hover:text-white cursor-pointer w-28 text-center ${
        filterName === name
          ? "text-white bg-blue-500 border-none"
          : "text-blue-500 border-blue-500 border-2 "
      }`}
    >
      {name}
    </li>
  )
}
