import React from 'react'
import { GET_TWEET_BY_ID } from '../../utils/queries'
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
  const dispatch = useDispatch()

  const { id } = useParams<ParamTypes>()
  const { user } = useSelector((state: RootState) => state)

  const { data } = useQuery(GET_TWEET_BY_ID, {
    onError: (err) => {
      dispatch(setError(err.message))
    },
    variables: { id: Number(id) },
    // fetchPolicy: 'no-cache',
  })

  let likedTweets = user ? user.likedTweets : []

  if (data) {
    const { tweet } = data
    const { comments } = tweet
    let newTweets: any
    if (comments) {
      newTweets = constructTree(JSON.parse(JSON.stringify(tweet)))
    }

    return (
      <div className="container">
        <div className="tweet-details-wrapper">
          <BigTweet tweet={tweet} />
        </div>
        <h1 className="tweet-details-header">Comments</h1>
        {newTweets && newTweets.comments
          ? newTweets.comments.map((comment: ITweet) => (
              <div className="tweet-wrapper comments" key={comment.id}>
                <Tweet tweet={comment} likedTweets={likedTweets} />
              </div>
            ))
          : null}
      </div>
    )
  }

  return (
    <div className="tweet-loader">
      <ClassicSpinner size={50} color="#00BFFF" loading={true} />
    </div>
  )
}
