import nc from "next-connect"
import fetch from "node-fetch"
import OpenAI from "openai"
import { corsMiddleware } from "./validate"
import type { NextApiRequest, NextApiResponse } from "next"
import FormData from "form-data"
import fs from "fs"
import axios from "axios"
// const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
})
const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url =
      "C://Users//user//Desktop//code//lee//tinder-analystics//data.jsonl"
    // create model
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    })
    console.log(completion.choices[0])
    console.log(1)
    // ===========================================================
    // create file
    const fileData = await openai.files.create({
      file: fs.createReadStream("data.jsonl"),
      purpose: "fine-tune",
    })
    // Read the file into a buffer
    // const buffer = fs.readFileSync(url)

    // // Prepare the file for upload
    // const formData = new FormData()
    // formData.append("file", buffer, {
    //   filename: "data.jsonl",
    //   contentType: "application/json",
    // })
    // formData.append("purpose", "fine-tune")

    // // Set up the headers for the request, including the OpenAI API key
    // const headers = {
    //   ...formData.getHeaders(),
    //   Authorization: `Bearer ${openai.apiKey}`,
    // }

    // // Make the request to upload the file
    // const fileResponse = await axios.post(
    //   "https://api.openai.com/v1/files",
    //   formData,
    //   { headers }
    // )

    console.log(fileData)

    console.log(2)
    // ==================================================================
    //fineTuning
    const fineTune = await openai.fineTuning.jobs.create({
      training_file: fileData.id,
      model: "gpt-3.5-turbo",
    })
    console.log(fineTune)
    console.log(3)

    res.status(200).json(fineTune)
  } catch (error: any) {
    console.log(error.message)
    console.log("error message")
    console.log(error.response.data.error)
    res.status(500).json(error)
  }
})

export default handler
// {
//   object: 'file',
//   id: 'file-U3HCJTz7QyU1BVTes8EhYqud',
//   purpose: 'fine-tune',
//   filename: 'data.jsonl',
//   bytes: 293,
//   created_at: 1708442963,
//   status: 'processed',
//   status_details: null
// }
