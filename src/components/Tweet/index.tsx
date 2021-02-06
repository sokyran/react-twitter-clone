import React, { useState } from 'react'
import './tweet-styles.scss'
import { ITweet, IUser } from '../../utils/types'
import { timeSince } from '../../utils/timeSince'
import { LIKE_TWEET, UNLIKE_TWEET } from '../../utils/queries'
import { useMutation } from '@apollo/client'
import { setError } from '../../store/error/actions'
import { useDispatch } from 'react-redux'

interface Props {
  tweet: ITweet
  user: IUser | null
  likedTweets: number[]
}

export const Tweet = ({ tweet, user, likedTweets }: Props) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(tweet.likes)
  const [touched, setTouched] = useState<Boolean>(
    likedTweets && likedTweets.length > 0
      ? likedTweets.includes(Number(tweet.id))
      : false
  )

  const [likeTweet] = useMutation(LIKE_TWEET)
  const [unlikeTweet] = useMutation(UNLIKE_TWEET)
  return (
    <div className="tweet">
      <div className="tweet-avatar-replies-container">
        <img className="tweet-avatar" src={tweet.user.avatar} alt="Profile" />
      </div>
      <div>
        <div className="tweet-user-info">
          <div className="tweet-author">{tweet.user.username}</div>
          <div className="tweet-usertag">@{tweet.user.usertag}</div>
          <div className="tweet-datetime">{timeSince(tweet.date)}</div>
        </div>
        <p className="tweet-content">{tweet.text}</p>
        {tweet.imageUrl ? (
          <div
            className="tweet-image"
            style={{
              backgroundImage: `url(${tweet.imageUrl})`,
            }}
          ></div>
        ) : null}

        <div className="tweet-buttons">
          <button className="tweet-buttons-comment">
            <i className="far fa-comment fa-lg"></i>
          </button>
          <button
            className={'tweet-buttons-like' + (touched ? ' like-touched' : '')}
            data-count={likes}
            onClick={async () => {
              if (user) {
                if (!touched) {
                  await likeTweet({ variables: { id: Number(tweet.id) } })
                  setLikes(likes + 1)
                  setTouched(true)
                } else {
                  await unlikeTweet({ variables: { id: Number(tweet.id) } })
                  setLikes(likes - 1 >= 0 ? likes - 1 : 0)
                  setTouched(false)
                }
              } else {
                dispatch(setError('Must be authorized to like tweets!'))
              }
            }}
          >
            <i className={'fa-heart fa-lg' + (touched ? ' fas' : ' far')}></i>
          </button>
        </div>
      </div>
    </div>
  )
}
