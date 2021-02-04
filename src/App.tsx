import React, { useEffect } from 'react'
import { TweetInput } from './components/TweetInput'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { useMutation } from '@apollo/client'
import { Navbar } from './components/Navbar'
import { SIGN_IN, SIGN_UP } from './utils/queries'
import { TweetContainer } from './containers/TweetContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './store/userReducer'
import { RootState } from './store'

function App() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const [authenticateUser, loginResult] = useMutation(SIGN_IN)
  const [signUpUser] = useMutation(SIGN_UP)

  useEffect(() => {
    if (loginResult.data) {
      const result = loginResult.data.signIn
      localStorage.setItem(
        'user',
        JSON.stringify({ ...result, expires: Date.now() + 3600000 }) // 60m
      )
      dispatch(setUser(result))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult.data])

  useEffect(() => {
    const storageUser = localStorage.getItem('user')

    if (storageUser) {
      const parsedUser = JSON.parse(storageUser)
      if (parsedUser.expires > Date.now()) {
        dispatch(setUser(parsedUser))
      } else {
        localStorage.removeItem('user')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <TweetContainer user={user} />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
