import * as React from "react"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { NavNames } from "@/pages/api/util"
import navStore from "@/mobx/navStore"

const Navbar = observer(() => {
  const router = useRouter()

  const logout = async () => {
    try {
      await signOut(auth)

      console.log("user Logged out")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleNavItemClick = (name: string) => {
    navStore.setNav(name)
    router.push(name)
  }

  return (
    <nav className="px-8 py-3 bg-blue-500 text-white">
      {/*  nav */}
      <ul className="flex items-center gap-2">
        <li
          onClick={() => handleNavItemClick(NavNames.home)}
          className={`${
            navStore.nav === "home" && "underline"
          } p-2 hover:underline cursor-pointer`}
        >
          home
        </li>
        <li
          onClick={() => handleNavItemClick(NavNames.info)}
          className={`${
            navStore.nav === "info" && "underline"
          } p-2 hover:underline cursor-pointer`}
        >
          info
        </li>
      </ul>
    </nav>
  )
})
export default Navbar
