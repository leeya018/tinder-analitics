import { Info } from "@/api/firestore/info/interfaces"
import { fromTimestampToStrTime, infoTypes } from "@/pages/api/util"
import React from "react"

type DataListProps = {
  infos: Info[]
  filter: string
}

const linksItems = [infoTypes.LIKE, infoTypes.PASS]
export default function DataList({ infos, filter }: DataListProps) {
  return (
    <ul>
      {infos.map((info: Info, key: number) => (
        <li key={key}>
          <InfoData info={info} />
        </li>
      ))}
    </ul>
  )
}

function InfoData({ info }) {
  const { data, createdDate } = info
  return (
    <div className=" flex items-center gap-4">
      <div>{fromTimestampToStrTime(createdDate)}</div>
      <div>{data}</div>
      <br />
    </div>
  )
}
