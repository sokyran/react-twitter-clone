import React from 'react'
import { ITweet } from '../../utils/types'
import moment from 'moment'

interface Props {
  tweet: ITweet
}

export const BigTweet = ({ tweet }: Props) => {
  return (
    <div className="tweet-details">
      <img
        src={tweet.user.avatar}
        alt=""
        className="tweet-details-avatar"
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
        <span className="tweet-details-stats-likes" data-count={tweet.likes}>
          likes
        </span>
      </div>
      <div className="tweet-details-buttons"></div>
    </div>
  )
}
