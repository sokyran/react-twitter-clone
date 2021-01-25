import React from 'react'
import { useHistory } from 'react-router-dom'
import './login-navbar-styles.scss'

export const LoginNavbar = () => {
  let history = useHistory()

  return (
    <div className="login-nav">
      <div className="login-nav-content container">
        <p>Get full experience right now!</p>
        <button
          className="login-nav-log"
          onClick={() => {
            history.push('/login')
          }}
        >
          Log In
        </button>
        <button
          className="login-nav-sign"
          onClick={() => {
            history.push('/signup')
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}
