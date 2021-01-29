import React, { useEffect, useState } from 'react'
import { LoginFooter } from './components/LoginFooter'
import { TweetInput } from './components/TweetInput'
import { ITweet, IUser } from './utils/types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { useMutation, useQuery } from '@apollo/client'
import { ClassicSpinner } from 'react-spinners-kit'
import { Navbar } from './components/Navbar'
import { GET_TWEETS, SIGN_IN, SIGN_UP } from './utils/queries'
import { Tweet } from './components/Tweet'

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | null>(null)
  const [tweets, setTweets] = useState<ITweet[]>([])

  const [authenticateUser, loginResult] = useMutation(SIGN_IN)
  const [signUpUser] = useMutation(SIGN_UP)
  const {
    loading: tweetsLoading,
    error: tweetsError,
    data: tweetsQuery,
  } = useQuery(GET_TWEETS, { pollInterval: 5000 })

  useEffect(() => {
    if (loginResult.data) {
      const userToken = loginResult.data.signIn.access_token
      const { avatar, username, usertag } = loginResult.data.signIn
      setUser({ avatar, username, usertag })
      setToken(userToken)
      localStorage.setItem('token', userToken)
      localStorage.setItem('user', JSON.stringify(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult.data])

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageUser = localStorage.getItem('user')
    if (storageToken && storageUser) {
      setToken(storageToken)
      setUser(JSON.parse(storageUser))
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
              {!tweetsLoading &&
              Object.values(tweetsQuery.tweets).length > 0 ? (
                tweetsQuery.tweets.map((tweet: ITweet) => (
                  <Tweet tweet={tweet} key={tweet.id} />
                ))
              ) : (
                <div className="loader">
                  <ClassicSpinner
                    size={50}
                    color="#00BFFF"
                    loading={tweetsLoading}
                  />
                </div>
              )}
            </div>
            {!token ? <LoginFooter /> : null}
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export default App
