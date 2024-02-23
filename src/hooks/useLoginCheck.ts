// import { UserAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useLoginCheck = () => {
  // const { user } = UserAuth()
  // const router = useRouter()

  useEffect(() => {
    // if (!user) {
    //   router.push("/login")
    // }
  }, [])
}

export default useLoginCheck
