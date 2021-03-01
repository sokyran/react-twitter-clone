import React from 'react'
import { ITweet } from '../../utils/types'
import { useLikeTweet } from '../../hooks/useLikeTweet'
import { RootState } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/error/actions'
import moment from 'moment'
import { openCommentModal } from '../../redux/comment/actions'
import { useHistory } from 'react-router-dom'

interface Props {
  tweet: ITweet
}

export const BigTweet = ({ tweet }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state: RootState) => state)
  const likedTweets = user ? user.likedTweets : []

  const touched =
    likedTweets && likedTweets.length > 0
      ? likedTweets.includes(Number(tweet.id))
      : false

  const { likes, likeTweet, unlikeTweet } = useLikeTweet(tweet.likes, tweet.id)
  return (
    <div className="tweet-details">
      <img
        src={tweet.user.avatar}
        alt=""
        className="tweet-details-avatar"
        onClick={() => history.push(`/user/${tweet.user.id}`)}
      ></img>
      <div className="tweet-details-user">
        <div className="tweet-details-user-username">{tweet.user.username}</div>
        <div className="tweet-details-user-usertag">@{tweet.user.usertag}</div>
      </div>
      <div className="tweet-details-content">{tweet.text}</div>
      <div className="tweet-details-date">
        <span>{moment(tweet.date).format('HH:mm')}</span>
        <span>{moment(tweet.date).format('MMMM DD YYYY')}</span>
      </div>
      <div className="tweet-details-stats">
        <span className="tweet-details-stats-item">{likes}</span>
        <span>{tweet.likes === 1 ? 'like' : 'likes'}</span>
        <span className="tweet-details-stats-item">{tweet.commentCount}</span>
        <span>{tweet.likes === 1 ? 'comment' : 'comments'}</span>
      </div>
      <div className="tweet-details-buttons">
        <div className="tweet-details-buttons-item">
          <button
            onClick={() => {
              if (user) {
                dispatch(openCommentModal(tweet))
              } else {
                dispatch(setError('Must be authorized to comment tweets!'))
              }
            }}
          >
            <i className="far fa-comment fa-2x"></i>
          </button>
        </div>
        <div className="tweet-details-buttons-item">
          <button
            onClick={async () => {
              if (user) {
                if (!touched) {
                  await likeTweet()
                } else {
                  await unlikeTweet()
                }
              } else {
                dispatch(setError('Must be authorized to like tweets!'))
              }
            }}
          >
            <i
              className={'fa-heart fa-2x ' + (touched ? 'fas touched' : 'far')}
            ></i>
          </button>
        </div>
      </div>
    </div>
  )
}
