import React from "react"

type FilterOptionsProps = {
  chooseNav: (name: string) => void
  nav: string
}

export default function FilterOptions({ chooseNav, nav }: FilterOptionsProps) {
  return (
    <ul className="flex items-center py-3 gap-2 justify-center">
      <NavItem
        onClick={() => chooseNav("images")}
        name={"images"}
        chosenNav={nav}
      />
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
