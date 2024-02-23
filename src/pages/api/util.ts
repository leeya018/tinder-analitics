import { Timestamp } from "firebase/firestore"
import moment from "moment"
// import fs from "fs"
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
  view: "/view",
  about: "/about",
}

export const sleep = async (time: number) => {
  const smallRand = Math.random() / 10
  const waitTime = (smallRand + 1) * time
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      return resolve("done")
    }, waitTime)
  })
}

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}

export const isDev = () => process.env.NODE_ENV === "development"

export const intervalForever = async (callback: Function, rate: number) => {
  let intervalNum = 0
  while (true) {
    intervalNum++
    console.log(`interval ${callback.name}: ${intervalNum}  ${getDate()}`)
    await callback()

    await sleep(rate)
  }
}

export const modals = {
  message: "message",
  images: "images",
}

export const instructions = [
  "more matches",
  "more likes",
  "send first messages",
  "send first messages according the your search location",
  "can select girls in your taste",
  "choose according to preference of love between : trans , sex and relationship",
]

export const fromTimestampToMoment = (date: Timestamp) => {
  const jsDate = date.toDate()
  const dateStr = moment(jsDate).format("YYYY-MM-DD")
  const momentDate = moment(dateStr, "YYYY-MM-DD")
  return momentDate
}

export const lookForOptions: any = {
  TRANS: "trans",
  RELATIONSHIP: "relationship",
  SEX: "sex",
}

export const transWords = [
  "not a girl",
  "not a real women",
  "trans",
  "transgender",
  "ladyboy",
  "טרנס",
  "טראנס",
  "shemale",
]

export const relationshipWords = [
  "Long-term partner",
  "Long-term, open to short",
  //  "New friends"
]
export const sexWords = [
  "Still figuring it out",
  "Long-term, open to short",
  "Short-term, open to long",
  "Short-term fun",
]

interface FileStarterNames {
  english: string
  hebrew: string
  spanish: string
  [key: string]: string // Optional: Allows access with any string key
}

export const fileStarterNames: FileStarterNames = {
  english: "english",
  hebrew: "hebrew",
  spanish: "spanish",
}

export const formatDateTs = (timestamp: Timestamp) => {
  const date = timestamp.toDate()
  return moment(date).format("DD-MM-YYYY")
}
//  fix that
export const getRandomMessage = (fileName: string) => {
  try {
    const urlPath = path.join(starterFolder, fileName)
    console.log({ urlPath })
    const data = fs.readFileSync(urlPath, "utf8")
    const lines = data.split("\n").filter((line: string) => line.trim() !== "")
    const chosenLine = Math.floor(Math.random() * (lines.length - 1))
    console.log({ chosenLine })
    if (chosenLine < lines.length && chosenLine >= 0) {
      return lines[chosenLine]
    }

    console.log("Line is out of range" + chosenLine)
    throw new Error("Line is out of range" + chosenLine)
  } catch (err: any) {
    console.log(err.message)
    throw err.message
  }
}

export const getDate = () => {
  // add 3 hours for the isreal time zone
  const miliseconds = new Date().getTime() + +3 * 60 * 60 * 1000
  return new Date(miliseconds).toISOString()
}

export const getToken = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile("auth_token.json", "utf-8", (err: any, jsonString: string) => {
      if (err) {
        console.error(err)
        return reject(err.message)
      }
      const data = JSON.parse(jsonString)
      console.log("data", data)
      return resolve(data.auth_token)
    })
  })
}
export const convertPrediction = (prediction: any) => {
  const result = prediction.reduce((acc: any, item: any) => {
    acc[item.class] = item.score
    return acc
  }, {})
  return result
}

export const payloadLike = (s_number: string) => ({
  s_number,
  user_traveling: 1,
  liked_content_type: "photo",
  liked_content_id: uuidv4(),
})

export interface TinderUser {
  bio: string
  relationship_intent?: {
    body_text: string
  }
}

export const starterFolder =
  "C:/Users/user/Desktop/code/lee/tinder-customers/src/node/starters"
export const tensorFolderUrl =
  "C:/Users/user/Desktop/code/lee/tinder-customers/src/node/tensorFolder"

export const swipesFolder = path.join(tensorFolderUrl, "swipes")
export const errorsFolder = path.join(tensorFolderUrl, "errors")
export const messagesFolder = path.join(tensorFolderUrl, "message")
export const actionsFolder = path.join(tensorFolderUrl, "actions")

export const likeRatioBarrier = 0.4

const createFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
    console.log("Directory created:", folderPath)
  } else {
    console.log("Directory already exists:", folderPath)
  }
}

export const readImagesFromTxt = (url: string) => {
  const content = fs.readFileSync(url, "utf8")

  // Split the content by newline character to get an array
  const lines = content.split("\n").filter(Boolean) // filter(Boolean) removes any empty lines

  return lines
}

export const addDataToTxt = (
  folderPath: string,
  fileName: string,
  txt: string
) => {
  createFolder(folderPath)
  const filePath = path.join(folderPath, fileName)

  fs.appendFile(
    filePath,
    `${getFullStrTime()} ---  ${txt}` + "\n",
    (err: any) => {
      if (err) {
        console.error("Error appending data to the file:", err)
      } else {
        console.log("Data successfully appended to the file!")
      }
    }
  )
}
export const fromUrlToImage = async (url: string, pathFileName: string) => {
  const response = await axios.get(url, {
    responseType: "stream",
  })

  const writer = fs.createWriteStream(pathFileName)

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

export const getFullStrTime = () => {
  const dateTimeFormat = "DD-MM-YYYY HH:mm:ss"
  return moment().format(dateTimeFormat)
}

export const getHeaders = (token: string) => {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    "x-auth-token": token,
  }

  return headers
}

export const tinderBaseUrl = "https://api.gotinder.com"

//   "long-term",
//   "no hookups",
//   "for serious",
//   "family-oriented",
//   "קשר אמיתי",
//   "קשר רציני",
//   "משפחה",
// ]
// export const sex = [
//   "friends with benefits",
//   "Nothing serious",
//   "looking to meet new people",
//   "not looking for anything serious",
//   "קשר לא מחייב",
//   "משהו קליל",
// ]
export const second = 1000
export const minute = second * 60
export const hour = minute * 60
export const day = hour * 24
export const week = day * 7

export const timeBetween = {
  ENGAGEMENT: 5 * second,
  GET_RECS: 20 * second,
  LIKE_LOOP: 10 * second,
  SESSION_USERS: hour,
}
export const swipesLim = 20
