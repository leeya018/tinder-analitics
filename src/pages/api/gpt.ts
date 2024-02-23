import nc from "next-connect"
import OpenAI from "openai"
import { corsMiddleware } from "./validate"
import type { NextApiRequest, NextApiResponse } from "next"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
  dangerouslyAllowBrowser: true,
})
const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { question } = req.body
  console.log("req.body")
  console.log(req.body)
  try {
    console.log("I am in servr")

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${question}`,
        },
      ],

      temperature: 1,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const content = completion.choices[0].message.content
    // const data = choice.message.content
    console.log({ content })

    res.status(200).json(content)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

export default handler
