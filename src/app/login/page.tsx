"use client"
import React, { useEffect, useRef, useState } from "react"

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth"
import { auth } from "@/firebase"

import Image from "next/image"

import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { NavNames } from "@/pages/api/util"
import { addUserFirestore } from "@/api/firestore"
import { User } from "@/api/firestore/user/interfaces"
import Alerts from "@/ui/Alerts"

function login() {
  const router = useRouter()
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (UserCredentialImp) => {
        const { email, displayName, uid } = UserCredentialImp.user
        const newUser: User = { email, displayName, userId: uid }
        await addUserFirestore(newUser)
        router.push(NavNames.home)
      })
      .catch((err) => {
        console.log(err.message)
        throw err
      })
  }

  return (
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <div className="w-[80%] h-[80vh]  bg-white flex items-center  justify-between  rounded-xl shadow-xl p-3">
        <div className="relative flex flex-col  items-center justify-center h-full w-[90%] md:w-[50%] lg:w-[30%] ">
          {/* title */}
          <div className="absolute top-1 left-1 text-lg font-bold text-left w-full p-2">
            TINDER ANALYTICS
          </div>
          {/* signin */}
          <div className="w-[80%] flex flex-col gap-4">
            <div className="text-4xl font-bold mb-2">Sign in</div>
            <div className=" font-bold mb-2">
              This site will help you to remember things on much better by
              activate your learning
            </div>

            {/* login button */}
            <button
              onClick={googleSignIn}
              className="bg-[##4284F3]
              mb-2  border-2 border-black  rounded-xl
              w-full py-2 text-white
              font-semibold flex justify-center items-center gap-2 hover:bg-slate-100"
            >
              <Image
                alt="google image"
                width={32}
                height={32}
                className="rounded-lg "
                src={"/images/google.png"}
              />
              <div className="text-black">Sign in with Google</div>
            </button>

            <Alerts />
          </div>
        </div>

        <div
          className="hidden bg-login_image h-full w-[60%] rounded-xl
         shadow-lg  items-center justify-center  sm:flex  "
        >
          <div className="text-white font-bold text-5xl rotate-12">
            TINDER ANALYTICS
          </div>
        </div>
      </div>
    </div>
  )
}
export default observer(login)
