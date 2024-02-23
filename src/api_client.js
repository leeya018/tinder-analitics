import axios from "axios"
export const startApi = async (customerXlsData) => {
  console.log("startApi", { customerXlsData })
  const res = await axios.post(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/start`,
    { customerXlsData }
  )
  return res.data
}

export const getDataFromGptApi = async (question) => {
  const res = await axios.post(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/gpt`,
    { question },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  console.log(res.data)
  return res.data
}

export const getDataFromGptLearnApi = async () => {
  const res = await axios.post(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/gptlaern`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  console.log(res.data)
  return res.data
}

export const getDataFromGptTrainApi = async () => {
  const res = await axios.post(
    `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/gpttrain`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  console.log(res.data)
  return res.data
}
