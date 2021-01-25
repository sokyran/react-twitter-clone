import React, { useEffect, useState } from 'react'
import { LoginNavbar } from './components/LoginNavbar'
import { Tweet } from './components/Tweet'
import { TweetInput } from './components/TweetInput'
import { ITweet, IUser } from './utils/types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { gql, useMutation } from '@apollo/client'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

function App() {
  const [token, setToken] = useState<string | null>(null)

  const authenticateUser = gql`
    mutation signIn($username: String!, $password: String!) {
      signIn(userInfoInput: { username: $username, password: $password }) {
        access_token
      }
    }
  `
  const [authenticate, result] = useMutation(authenticateUser)

  useEffect(() => {
    if (result.data) {
      console.log(result.data)
      const token = result.data.signIn.access_token
      setToken(token)
    }
  }, [result.data])

  const handleLogin = (username: string, password: string) => {
    authenticate({ variables: { username, password } })
  }

  const user: IUser = {
    username: 'Avgust',
    usertag: 'avgust',
    avatar: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  }

  const tweet: ITweet = {
    id: 1,
    text: `>пишешь что-то спорное и резкое о политоте
    >тебя выносит во внешний твиттер
    >разномастные немедленно начинают Пелевина
    >Виктора`,
    date: 1231232,
    user,
    imageUrl:
      'https://habrastorage.org/getpro/tmtm/megapost/cd2/bdd/6e8/cd2bdd6e8b3a9866ff7d5ebc0b4fc99a.png',
  }

  return (
    <Router>
      {result.loading ? (
        <div className="loader">
          <Loader type="TailSpin" color="#00BFFF" height={160} width={160} />
        </div>
      ) : (
        <>
          <Switch>
            <Route path="/login">
              <LoginPage handleLogin={handleLogin} />
            </Route>
            <Route path="/">
              <div className="container">
                <TweetInput />
                <Tweet tweet={tweet} />
                <Tweet tweet={tweet} />
              </div>
              {!token ? <LoginNavbar /> : null}
            </Route>
          </Switch>
        </>
      )}
    </Router>
  )
}

export default App
