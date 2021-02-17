import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TweetContainer } from './containers/TweetContainer'
import { CommentModal } from './components/CommentModal'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorPopup } from './components/ErrorPopup'
import { TweetInput } from './components/TweetInput'
import { SIGN_IN, SIGN_UP } from './utils/queries'
import { LoginPage } from './components/LoginPage'
import { setUser } from './store/user/actions'
import { Navbar } from './components/Navbar'
import { useMutation } from '@apollo/client'
import { RootState } from './store'
import { TweetDetails } from './components/TweetDetails'
import { Profile } from './components/Profile'

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
    <>
      <CommentModal />
      <Router>
        <div id="forBlur">
          <ErrorPopup />
          <Navbar />
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
            <Route path="/tweet/:id">
              <TweetDetails />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <div className="container">
                {user ? <TweetInput /> : null}
                <TweetContainer />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
