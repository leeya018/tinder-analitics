import { autorun, makeAutoObservable, toJS } from "mobx"
import { makePersistable } from "mobx-persist-store"

export type Token = {
  key: string
  isProcess: boolean
  name: string
}

class Tokens {
  tokens: Token[] = []

  constructor() {
    makeAutoObservable(this)
    // if (typeof window !== "undefined") {
    //   makePersistable(this, {
    //     name: "TokenStore",
    //     properties: ["tokens"],
    //     storage: window.localStorage,
    //   })
    // }
  }

  setTokens = (newTokens: Token[]) => {
    this.tokens = newTokens
  }
  setToken = (ind: number, newToken: Token) => {
    this.tokens[ind] = newToken
  }
  addToken = (newToken: Token) => {
    this.tokens = [newToken, ...this.tokens]
  }
}

const tokensStore = new Tokens()
export default tokensStore

autorun(() => {
  if (tokensStore.tokens.length > 0) {
    console.log(toJS(tokensStore.tokens[0]))
  }
})
