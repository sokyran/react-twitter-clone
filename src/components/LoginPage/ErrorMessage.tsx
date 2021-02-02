import React from 'react'
import './login-page-styles.scss'

interface Props {
  error: string
}

export const ErrorMessage = ({ error }: Props) => {
  return (
    <div className="error-message">
      <p>{error}</p>
    </div>
  )
}
