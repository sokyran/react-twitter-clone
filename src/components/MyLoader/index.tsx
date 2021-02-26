import React from 'react'
import { ClassicSpinner } from 'react-spinners-kit'

export const MyLoader = () => {
  return (
    <div className="tweet-loader">
      <ClassicSpinner size={50} color="#00BFFF" loading={true} />
    </div>
  )
}
