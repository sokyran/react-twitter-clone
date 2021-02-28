import React, { useState } from 'react'

interface Props {
  className?: string
  textValue: string
  setTextValue: React.Dispatch<React.SetStateAction<any>>
}

export const ResizableInput = ({
  textValue,
  setTextValue,
  className,
}: Props) => {
  const [rows, setRows] = useState(3)
  const minRows = 3
  const maxRows = 100

  const lineHeight = 20

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const prevRows = e.target.rows
    e.target.rows = minRows
    const currRows = ~~(e.target.scrollHeight / lineHeight) - 1

    if (currRows === prevRows) {
      e.target.rows = currRows
    }

    if (currRows >= maxRows) {
      e.target.rows = maxRows
      e.target.scrollTop = e.target.scrollHeight
    }

    setTextValue(e.target.value)
    setRows(currRows < maxRows ? currRows : maxRows)
  }

  return (
    <textarea
      rows={rows}
      value={textValue}
      placeholder={'Enter your text here...'}
      className={className}
      onChange={handleChange}
    />
  )
}
