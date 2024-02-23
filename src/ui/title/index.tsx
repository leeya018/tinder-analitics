import React, { FC } from "react"
import { observer } from "mobx-react-lite"

type TitleProps = {
  children: React.ReactNode
}
const Title: FC<TitleProps> = observer(({ children }) => {
  return <div className="font-bold text-xl">{children}</div>
})
export default Title
