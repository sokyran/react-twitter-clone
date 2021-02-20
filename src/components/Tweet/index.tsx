import React from 'react'
import { openCommentModal } from '../../redux/comment/actions'
import { useLikeTweet } from '../../hooks/useLikeTweet'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../redux/error/actions'
import { useHistory } from 'react-router-dom'
import { ITweet } from '../../utils/types'
import { RootState } from '../../redux'
import moment from 'moment'
import './tweet-styles.scss'

interface Props {
  tweet: ITweet
  likedTweets: number[] | null
}

export const Tweet = ({ tweet, likedTweets }: Props) => {
  const { user } = useSelector((state: RootState) => state)
  const { comments } = tweet

  const dispatch = useDispatch()
  const history = useHistory()

  const initTouched =
    likedTweets && likedTweets.length > 0
      ? likedTweets.includes(Number(tweet.id))
      : false

  const { likes, touched, likeTweet, unlikeTweet } = useLikeTweet(
    tweet.likes,
    initTouched,
    tweet.id
  )

  return (
    <>
      <div className="tweet" onClick={() => history.push(`/tweet/${tweet.id}`)}>
        <div className="tweet-avatar-replies-container">
          <div
            className="tweet-avatar"
            style={{ backgroundImage: `url(${tweet.user.avatar})` }}
          />
          <span className="tweet-line"></span>
        </div>
        <div>
          <div className="tweet-user-info">
            <div className="tweet-author">{tweet.user.username}</div>
            <div className="tweet-usertag">@{tweet.user.usertag}</div>
            <div className="tweet-datetime">{moment(tweet.date).fromNow()}</div>
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
            <div className="tweet-buttons-item">
              <button
                className="tweet-buttons-comment"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  if (user) {
                    dispatch(openCommentModal(tweet))
                  } else {
                    dispatch(setError('Must be authorized to comment tweets!'))
                  }
                }}
              >
                <i className="far fa-comment fa-lg"></i>
              </button>
              <span className="tweet-buttons-count">
                {tweet.commentCount ? tweet.commentCount : ''}
              </span>
            </div>
            <div className="tweet-buttons-item">
              <button
                className={
                  'tweet-buttons-like' + (touched ? ' like-touched' : '')
                }
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
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
                  className={'fa-heart fa-lg' + (touched ? ' fas' : ' far')}
                ></i>
              </button>
              <span className="tweet-buttons-count">{likes ? likes : 0}</span>
            </div>
          </div>
        </div>
      </div>
      {comments && comments.length > 0
        ? comments
            .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
            .map((comment) => (
              <Tweet
                tweet={comment}
                likedTweets={likedTweets}
                key={comment.id}
              />
            ))
        : null}
    </>
  )
}
