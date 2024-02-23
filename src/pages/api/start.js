import { main, test } from "../../node"

export default async function handler(req, res) {
  try {
    // main()
    const { customerXlsData } = req.body
    console.log("start the main function")
    const name = await main(customerXlsData)

    return res.status(200).send(name)
  } catch (error) {
    return res.status(450).json(error)
  }
}
// import { main, test } from "../../node"

// export default async function handler(req, res) {
//   try {
//     // main()
//     const { customerXlsData } = req.body
//     console.log("start the main function")
//     const name = await main(customerXlsData)
//     // const question = `what is the speaking language in {lat: 6.248, lon: -75.566} in 1 word only`
//     // const lang = await getDataFromGptApi(question)
//     // console.log({ lang })
//     // const name = await test(token)

//     // console.log("servr" + name)
//     // for (let i = 0; i < 100; i++) {
//     //   console.log(token + " " + i)
//     //   await sleep(1000)
//     // }
//     return res.status(200).send(name)
//   } catch (error) {
//     return res.status(450).json(error)
//   }
// }
