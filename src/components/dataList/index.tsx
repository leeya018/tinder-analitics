import React from "react"

type DataListProps = {
  strArr: string[]
  nav: string
}

const linksItems = ["images", "likes", "passes"]
export default function DataList({ strArr, nav }: DataListProps) {
  return (
    <ul>
      {strArr.map((line: string, key: number) => (
        <li key={key}>
          {" "}
          {linksItems.includes(nav) ? (
            <a href={line}> {line}</a>
          ) : (
            <div>{line}</div>
          )}
          <br />
          <br />
        </li>
      ))}
    </ul>
  )
}
