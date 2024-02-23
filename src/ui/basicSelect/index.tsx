import React, { FC } from "react"

import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

type BasicSelectProps = {
  handleChange: any
  value: string
  name: string
  options: string[]
  className: string
}

const BasicSelect: FC<BasicSelectProps> = ({
  handleChange,
  value,
  name,
  options,
  className,
}) => {
  console.log({ handleChange, value, name, options })
  return (
    <FormControl className={className}>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((value, key) => (
          <MenuItem key={key} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default BasicSelect
