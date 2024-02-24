import { Timestamp } from "firebase/firestore"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import path from "path"

let fs: any
if (typeof window === "undefined") {
  fs = require("fs")
}

export const NavNames = {
  login: "/login",
  home: "/",
  info: "/info",
}

export const getUrl = () => {
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BASIC_URL
      : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
  console.log({ url })
  return url
}

export const isDev = () => process.env.NODE_ENV === "development"

export const modals = {
  userInfo: "userInfo",
}

export const fromTimestampToMoment = (date: Timestamp) => {
  const jsDate = date.toDate()
  const dateStr = moment(jsDate).format("YYYY-MM-DD")
  const momentDate = moment(dateStr, "YYYY-MM-DD")
  return momentDate
}

export const formatDateTs = (timestamp: Timestamp) => {
  const date = timestamp.toDate()
  return moment(date).format("DD-MM-YYYY")
}

export const getDate = () => {
  // add 3 hours for the isreal time zone
  const miliseconds = new Date().getTime() + +3 * 60 * 60 * 1000
  return new Date(miliseconds).toISOString()
}

export const getFullStrTime = () => {
  const dateTimeFormat = "DD-MM-YYYY HH:mm:ss"
  return moment().format(dateTimeFormat)
}
export const fromTimestampToStrTime = (date: Timestamp) => {
  const jsDate = date.toDate()
  const momentDate = moment(jsDate)
  const dateTimeFormat = "DD-MM-YYYY HH:mm:ss"
  return moment(momentDate).format(dateTimeFormat)
}

export const readFromFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" })
    const lines = data.split("\n").filter((line: string) => line.trim() !== "")
    return lines
  } catch (error: any) {
    console.log(error.message)
  }
}

export const infoUrl =
  "C:/Users/user/Desktop/code/lee/tinder-customers/src/node/info"
export const getLikeFilePath = (name: string) =>
  path.join(infoUrl, "swipes", name, "like.txt")
export const getPassFilePath = (name: string) =>
  path.join(infoUrl, "swipes", name, "pass.txt")
export const imagesFilePath = path.join(infoUrl, "other", "images.txt")
export const swipesFolder = path.join(infoUrl, "swipes")
export const errorsFolder = path.join(infoUrl, "errors", "errors.txt")
export const messagesFolder = path.join(infoUrl, "message", "messages.txt")
export const actionsFolder = path.join(infoUrl, "actions", "functions.txt")

export const filePaths: any = {
  images: imagesFilePath,
  errors: errorsFolder,
  messages: messagesFolder,
  actions: actionsFolder,
}

export const infoTypes = {
  LIKE: "like",
  PASS: "pass",
  ERROR: "error",
  FUNCTION: "function",
  MESSAGE: "message",
}
