import { makeAutoObservable } from "mobx"

class Message {
  message: string = ""
  status: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  setMessage = (msg: string, st: number) => {
    this.message = msg
    this.status = st
  }
}

export const messageStore = new Message()
