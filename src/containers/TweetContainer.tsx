import React from 'react'
import { useQuery } from '@apollo/client'
import { ClassicSpinner } from 'react-spinners-kit'
import { Tweet } from '../components/Tweet'
import { GET_TWEETS } from '../utils/queries'
import { ITweet } from '../utils/types'
import './tweet-container-styles.scss'

export const TweetContainer = () => {
  const { loading, data } = useQuery(GET_TWEETS, { pollInterval: 5000 })
  return (
    <div className="tweet-container">
      {!loading && data && data.tweets ? (
        data.tweets.map((tweet: ITweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))
      ) : (
        <div className="tweet-loader">
          <p className="tweet-loader-text">Tweets are loading...</p>
          <ClassicSpinner size={50} color="#00BFFF" loading={true} />
        </div>
      )}
    </div>
  )
}
