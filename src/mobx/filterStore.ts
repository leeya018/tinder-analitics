import { autorun, makeAutoObservable } from "mobx"

class Filter {
  search: string = ""

  constructor() {
    makeAutoObservable(this)
  }

  setFilter = (search: string) => {
    this.search = search
  }
}

const filterStore = new Filter()
autorun(() => {
  console.log("search changed:", filterStore.search)
})
export default filterStore
