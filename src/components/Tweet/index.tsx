import React, { useState } from 'react'
import { openCommentModal } from '../../store/comment/actions'
import { LIKE_TWEET, SHOW_LIKES, UNLIKE_TWEET } from '../../utils/queries'
import { setError } from '../../store/error/actions'
import { ITweet } from '../../utils/types'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import './tweet-styles.scss'
import { RootState } from '../../store'

interface Props {
  tweet: ITweet
  likedTweets: number[] | null
}

interface ICache {
  showLikes: number[]
}

export const Tweet = ({ tweet, likedTweets }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state: RootState) => state)
  const [likes, setLikes] = useState(tweet.likes)
  const [touched, setTouched] = useState<Boolean>(
    likedTweets && likedTweets.length > 0
      ? likedTweets.includes(Number(tweet.id))
      : false
  )
  const [likeTweet] = useMutation(LIKE_TWEET, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
    update: (cache, { data }) => {
      const existingLikes: ICache | null = cache.readQuery({
        query: SHOW_LIKES,
        variables: { id: user?.id },
      })
      if (existingLikes) {
        cache.writeQuery({
          query: SHOW_LIKES,
          variables: { id: user?.id },
          data: {
            showLikes: [...existingLikes.showLikes, Number(data.likeTweet.id)],
          },
        })
      }
    },
  })
  const [unlikeTweet] = useMutation(UNLIKE_TWEET, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
    update: (cache, { data }) => {
      const existingLikes: ICache | null = cache.readQuery({
        query: SHOW_LIKES,
        variables: { id: user?.id },
      })
      if (existingLikes) {
        cache.writeQuery({
          query: SHOW_LIKES,
          variables: { id: user?.id },
          data: {
            showLikes: [
              ...existingLikes.showLikes.filter(
                (id) => id !== Number(data.unlikeTweet.id)
              ),
            ],
          },
        })
      }
    },
  })

  const { comments } = tweet

  return (
    <>
      <div className="tweet" onClick={() => history.push(`/tweet/${tweet.id}`)}>
        <div className="tweet-avatar-replies-container">
          <img className="tweet-avatar" src={tweet.user.avatar} alt="Profile" />
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
                      setTouched(true)
                      setLikes(likes + 1)
                      await likeTweet({ variables: { id: Number(tweet.id) } })
                    } else {
                      setTouched(false)
                      setLikes(likes - 1 >= 0 ? likes - 1 : 0)
                      await unlikeTweet({ variables: { id: Number(tweet.id) } })
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
