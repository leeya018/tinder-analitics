import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import filterStore from "@/mobx/filterStore"

type QuestionListItem = {
  question: string
  answer: string
}
type QuestionListProps = {
  questionList: QuestionListItem[]
}
const QuestionList = observer<QuestionListProps>(({ questionList }) => {
  const getFilter = () => {
    const search = filterStore.search
    return questionList.filter((questionListItem) =>
      questionListItem.question.includes(search)
    )
  }

  const getData = (dataStr: string) => {
    return (
      <div>
        {dataStr.split("\n").map((str) => {
          return (
            <>
              <div>{str} </div> <br />
            </>
          )
        })}
      </div>
    )
  }
  return (
    <ul className="h-full overflow-auto">
      {getFilter().map((questionListItem: QuestionListItem, key: number) => (
        <li key={key}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography className="border-b-2">
                {questionListItem.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{getData(questionListItem.answer)}</Typography>
            </AccordionDetails>
          </Accordion>
        </li>
      ))}
    </ul>
  )
})

export default QuestionList
