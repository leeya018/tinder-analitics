import { useState, useEffect } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import moment from "moment"

import { observer } from "mobx-react-lite"

type CalenderProps = {
  chosenDate: moment.Moment
  setChosenDate: (date: moment.Moment) => void
}

const Calender = observer<CalenderProps>(({ chosenDate, setChosenDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        onChange={(value: any) => {
          console.log("moment", moment(value.toDate()))
          setChosenDate(moment(value.toDate()))
        }}
      />
    </LocalizationProvider>
  )
})
export default Calender
