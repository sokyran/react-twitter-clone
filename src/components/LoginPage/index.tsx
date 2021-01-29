import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './login-page-styles.scss'

interface Props {
  handleLogin: (usertag: string, password: string) => void
  handleSignUp: (
    usertag: string,
    username: string,
    password: string,
    avatar: string | null
  ) => void
  isSigningUp: boolean
}

export const LoginPage = ({
  handleLogin,
  handleSignUp,
  isSigningUp,
}: Props) => {
  const [usertag, setUsertag] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [repeatPass, setRepeatPass] = useState('')

  const [error, setError] = useState('')
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSigningUp) {
      handleLogin(usertag, password)
    } else if (isSigningUp) {
      if (password !== repeatPass) {
        setError('Passwords do not match.')
        setPassword('')
        setRepeatPass('')
        return
      } else {
        handleSignUp(username, password, usertag, null)
        setUsername('')
        setRepeatPass('')
      }
    }
    setUsertag('')
    setPassword('')
    history.push('/')
  }

  return (
    <div className="login-page container">
      {isSigningUp ? <p>Enter your credentials to sign up</p> : <p>Welcome!</p>}
      {error ? (
        <div className="login-page-error">
          <p>{error}</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="login-page-field">
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setUsertag(e.currentTarget.value)
            }}
            className={
              'login-page-input' + (usertag.length > 0 ? ' focused' : '')
            }
            type="text"
            id="usertag"
            value={usertag}
          />
          <label htmlFor="usertag">Usertag</label>
        </div>
        {isSigningUp ? (
          <>
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
          </>
        ) : null}
        <div className="login-page-field">
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setPassword(e.currentTarget.value)
              setError('')
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
        {isSigningUp ? (
          <>
            <div className="login-page-field">
              <input
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setRepeatPass(e.currentTarget.value)
                  setError('')
                }}
                className={
                  'login-page-input' + (repeatPass.length > 0 ? ' focused' : '')
                }
                type="password"
                id="repeat-pass"
                value={repeatPass}
              />
              <label htmlFor="repeat-pass">Repeat Password</label>
            </div>
          </>
        ) : null}
        <input
          className="login-page-submit"
          type="submit"
          value={isSigningUp ? 'Sign Up' : 'Log In'}
        />
      </form>
    </div>
  )
}
