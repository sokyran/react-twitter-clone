import { useDispatch, useSelector } from 'react-redux'
import { setTweets } from '../store/tweets/actions'
import { ClassicSpinner } from 'react-spinners-kit'
import { ITweet } from '../utils/types'
import { GET_TWEETS } from '../utils/queries'
import { Tweet } from '../components/Tweet'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import './tweet-container-styles.scss'
import { RootState } from '../store'

export const TweetContainer = () => {
  const { tweets, user } = useSelector((state: RootState) => state)
  const { loading, data } = useQuery(GET_TWEETS, { pollInterval: 5000 })
  const dispatch = useDispatch()

  useEffect(() => {
    if (data && data.tweets) {
      dispatch(setTweets(data.tweets))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return (
      <div className="tweet-loader">
        <p className="tweet-loader-text">Tweets are loading...</p>
        <ClassicSpinner size={50} color="#00BFFF" loading={true} />
      </div>
    )
  }
  return (
    <div className="tweet-container">
      {tweets.map((tweet: ITweet) => (
        <Tweet tweet={tweet} user={user} key={tweet.id} />
      ))}
    </div>
  )
}
