import React from 'react'
import { GET_TWEET_BY_ID, SHOW_LIKES } from '../../utils/queries'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/error/actions'
import { ClassicSpinner } from 'react-spinners-kit'
import { useParams } from 'react-router-dom'
import { ITweet } from '../../utils/types'
import { useQuery } from '@apollo/client'
import { RootState } from '../../redux'
import { Tweet } from '../Tweet'
import './tweet-details-styles.scss'
import { BigTweet } from './BigTweet'
import { constructTree } from '../../utils/constructTree'

interface ParamTypes {
  id: string
}

export const TweetDetails = () => {
  const { user } = useSelector((state: RootState) => state)
  const { id } = useParams<ParamTypes>()
  const dispatch = useDispatch()

  const { data, error } = useQuery(GET_TWEET_BY_ID, {
    variables: { id: Number(id) },
    fetchPolicy: 'no-cache',
  })

  const { data: likedData } = useQuery(SHOW_LIKES, {
    variables: { id: user ? user.id : null },
    fetchPolicy: 'no-cache',
  })

  if (error) {
    dispatch(setError(error.message))
  }

  if (data && likedData) {
    const { tweet } = data
    const { comments } = tweet
    if (comments) {
      // It changes original object,
      // so i dont need to save it as variable
      constructTree(tweet)
    }

    if (!tweet.comments) {
      tweet.comments = []
    }

    return (
      <div className="container">
        <div className="tweet-details-wrapper">
          <BigTweet tweet={tweet} />
        </div>
        <h1 className="tweet-details-header">Comments</h1>
        {tweet.comments.map((comment: ITweet) => (
          <div className="tweet-wrapper" key={comment.id}>
            <Tweet tweet={comment} likedTweets={likedData.showLikes} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="tweet-loader">
      <ClassicSpinner size={50} color="#00BFFF" loading={true} />
    </div>
  )
}
