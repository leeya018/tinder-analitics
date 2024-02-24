import { Info } from "@/api/firestore/info/interfaces"
import React from "react"
import { InfoData } from "../infoData"

type DataListProps = {
  infos: Info[]
  filter: string
}

export default function DataList({ infos, filter }: DataListProps) {
  return (
    <ul>
      {infos.map((info: Info, key: number) => (
        <li key={key}>
          <InfoData info={info} filter={filter} />
        </li>
      ))}
    </ul>
  )
}
