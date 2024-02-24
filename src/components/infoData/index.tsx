import { Info } from "@/api/firestore/info/interfaces"
import { fromTimestampToStrTime, linksItems } from "@/pages/api/util"

type InfoDataProps = {
  info: Info
  filter: string
}
export function InfoData({ info, filter }: InfoDataProps) {
  const { data, createdDate } = info
  if (!createdDate) throw new Error("createdDate is not valid ")
  return (
    <div className=" flex items-center gap-4">
      <div>{fromTimestampToStrTime(createdDate)}</div>
      {linksItems.includes(filter) ? (
        <a
          className="line-clamp-3"
          target="_blank"
          href={data}
          rel="noreferrer"
        >
          {data}
        </a>
      ) : (
        <div>{data}</div>
      )}
      <br />
      <br />
    </div>
  )
}
