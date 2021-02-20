import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import './error-styles.scss'

export const ErrorPopup = () => {
  const error = useSelector((state: RootState) => state.error)

  if (!error) {
    return null
  }

  return (
    <div className="error-popup">
      <p className="error-popup-content">{error}</p>
    </div>
  )
}
