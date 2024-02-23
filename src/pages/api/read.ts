import nc from "next-connect"
import { corsMiddleware } from "./validate"
import type { NextApiRequest, NextApiResponse } from "next"
import { readFromFile } from "./util"

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const txt = readFromFile(req.body.path)
    res.status(200).json(txt)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

export default handler
