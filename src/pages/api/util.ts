import { Timestamp } from "firebase/firestore"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import path from "path"

export const NavNames = {
  login: "/login",
  home: "/",
  data: "/data",
}

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const isDev = () => process.env.NODE_ENV === "development"

export const modals = {
  message: "message",
  images: "images",
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

export const infoUrl =
  "C:/Users/user/Desktop/code/lee/tinder-customers/src/node/info"
