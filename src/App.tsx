import React, { useEffect, useState } from 'react'
import { TweetInput } from './components/TweetInput'
import { IUser } from './utils/types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { useMutation } from '@apollo/client'
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

  const handleLogin = async (
    usertag: string,
    password: string
  ): Promise<void> => {
    await authenticateUser({ variables: { usertag, password } })
  }

  const handleSignUp = async (
    usertag: string,
    username: string,
    password: string,
    avatar: string | null
  ): Promise<void> => {
    await signUpUser({ variables: { usertag, username, password, avatar } })
  }

  return (
    <Router>
      <Navbar user={user} />
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
    </Router>
  )
}

export default App
