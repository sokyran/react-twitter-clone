import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './login-page-styles.scss'

interface Props {
  handleLogin: (username: string, password: string) => void
}

export const LoginPage = ({ handleLogin }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
    history.push('/')
  }

  return (
    <div className="login-page container">
      <p>Welcome!</p>
      <form onSubmit={handleSubmit}>
        <div className="login-page-field">
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsername(e.currentTarget.value)
            }}
            className={
              'login-page-input' + (username.length > 0 ? ' focused' : '')
            }
            type="text"
            id="username"
            value={username}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="login-page-field">
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value)
            }}
            className={
              'login-page-input' + (password.length > 0 ? ' focused' : '')
            }
            type="password"
            id="password"
            value={password}
          />
          <label htmlFor="password">Password</label>
        </div>
        <input className="login-page-submit" type="submit" value="Log in" />
      </form>
    </div>
  )
}
