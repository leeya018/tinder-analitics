import { NavNames } from "@/pages/api/util"
import { autorun, makeAutoObservable } from "mobx"

class Nav {
  nav: string = NavNames.home
  constructor() {
    makeAutoObservable(this)
  }

  setNav = (n: string) => {
    this.nav = n
  }
}

const navStore = new Nav()
export default navStore

autorun(() => {
  console.log(navStore.nav)
})
