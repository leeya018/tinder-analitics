import nc from "next-connect"
import fetch from "node-fetch"
import OpenAI from "openai"
import { corsMiddleware } from "./validate"
import type { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"
import fs from "fs"
import axios from "axios"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
})

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fineTune = await openai.fineTuning.jobs.create({
      model: "gpt-3.5-turbo",
      training_file: "file-U3HCJTz7QyU1BVTes8EhYqud",
    })

    console.log(fineTune)
    res.status(200).json(fineTune)
  } catch (error: any) {
    console.log(error.message)
    console.log(error.response.data.error)
    res.status(500).json(error)
  }
})

export default handler
