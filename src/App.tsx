import React, { useEffect, useState } from 'react'
import { TweetInput } from './components/TweetInput'
import { IUser } from './utils/types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { useMutation } from '@apollo/client'
import { ClassicSpinner } from 'react-spinners-kit'
import { Navbar } from './components/Navbar'
import { SIGN_IN, SIGN_UP } from './utils/queries'
import { TweetContainer } from './containers/TweetContainer'

function App() {
  const [user, setUser] = useState<IUser | null>(null)

  const [authenticateUser, loginResult] = useMutation(SIGN_IN)
  const [signUpUser] = useMutation(SIGN_UP)

  useEffect(() => {
    if (loginResult.data) {
      const result = loginResult.data.signIn
      localStorage.setItem(
        'user',
        JSON.stringify({ ...result, expires: Date.now() + 3600000 })
      )
      setUser(result)
    }
  }, [loginResult.data])

  useEffect(() => {
    const storageUser = localStorage.getItem('user')

    if (storageUser) {
      const parsedUser = JSON.parse(storageUser)
      if (parsedUser.expires > Date.now()) {
        setUser(parsedUser)
      } else {
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogin = (usertag: string, password: string) => {
    authenticateUser({ variables: { usertag, password } })
  }

  const handleSignUp = (
    usertag: string,
    username: string,
    password: string,
    avatar: string | null
  ) => {
    signUpUser({ variables: { usertag, username, password, avatar } })
  }

  return (
    <Router>
      <Navbar user={user} />
      {loginResult.loading ? (
        <div className="loader">
          <ClassicSpinner
            size={150}
            color="#00BFFF"
            loading={loginResult.loading}
          />
        </div>
      ) : (
        <Switch>
          <Route path="/login">
            <LoginPage
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              isSigningUp={false}
            />
          </Route>
          <Route path="/signup">
            <LoginPage
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              isSigningUp={true}
            />
          </Route>
          <Route path="/">
            <div className="container">
              {user ? <TweetInput user={user} /> : null}
              <TweetContainer />
            </div>
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export default App
