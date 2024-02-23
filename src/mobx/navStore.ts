import { NavNames } from "@/pages/api/util"
import { autorun, makeAutoObservable } from "mobx"
import { makePersistable } from "mobx-persist-store"

class Nav {
  nav: string = NavNames.home
  constructor() {
    makeAutoObservable(this)
    if (typeof window !== "undefined") {
      makePersistable(this, {
        name: "navStore",
        properties: ["nav"],
        storage: window.localStorage,
      })
    }
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
