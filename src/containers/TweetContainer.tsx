import { GET_TWEETS } from '../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { setTweets } from '../redux/tweets/actions'
import { setError } from '../redux/error/actions'
import { useHistory } from 'react-router-dom'
import { Tweet } from '../components/Tweet'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ITweet } from '../utils/types'
import { RootState } from '../redux'
import './tweet-container-styles.scss'
import { MyLoader } from '../components/MyLoader'

export const TweetContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { tweets } = useSelector((state: RootState) => state)
  const { loading: tweetsLoading, data: tweetsData } = useQuery(GET_TWEETS, {
    onError: (err) => {
      dispatch(setError(JSON.stringify(err)))
    },
  })

  useEffect(() => {
    if (tweetsData && tweetsData.tweets) {
      dispatch(setTweets(tweetsData.tweets))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetsData])

  if (tweetsLoading) {
    return <MyLoader />
  }

  return (
    <div className="tweet-container">
      {tweets.map((tweet: ITweet) => (
        <div
          key={tweet.id}
          className="tweet-wrapper"
          onClick={() => history.push(`/tweet/${tweet.id}`)}
        >
          <Tweet tweet={tweet} />
        </div>
      ))}
    </div>
  )
}
