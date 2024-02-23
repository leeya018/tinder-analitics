import { User } from "@/api/firestore/user/interfaces"
import { autorun, makeAutoObservable, toJS } from "mobx"
import { makePersistable } from "mobx-persist-store"

class UserS {
  user: any | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (newUser: any) => {
    if (!newUser) {
      this.user = null
      return
    }
    const { photoURL, uid, displayName, email } = newUser
    this.user = { photoURL, userId: uid, displayName, email }
  }
}

const userStore = new UserS()
export default userStore

autorun(() => {
  console.log(toJS(userStore.user))
})
