import { GET_TWEETS, SHOW_LIKES } from '../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { setTweets } from '../redux/tweets/actions'
import { ClassicSpinner } from 'react-spinners-kit'
import { setError } from '../redux/error/actions'
import { useHistory } from 'react-router-dom'
import { Tweet } from '../components/Tweet'
import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ITweet } from '../utils/types'
import { RootState } from '../redux'
import './tweet-container-styles.scss'

export const TweetContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { tweets, user } = useSelector((state: RootState) => state)
  const { loading: tweetsLoading, data: tweetsData } = useQuery(GET_TWEETS, {
    onError: (err) => {
      dispatch(setError(JSON.stringify(err)))
    },
  })

  const { loading: likedLoading, data: likedData } = useQuery(SHOW_LIKES, {
    variables: { id: user ? user.id : null },
  })

  useEffect(() => {
    if (tweetsData && tweetsData.tweets) {
      dispatch(setTweets(tweetsData.tweets))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweetsData])

  if (tweetsLoading || likedLoading) {
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
        <div
          key={tweet.id}
          className="tweet-wrapper"
          onClick={() => history.push(`/tweet/${tweet.id}`)}
        >
          <Tweet tweet={tweet} likedTweets={likedData.showLikes} />
        </div>
      ))}
    </div>
  )
}
