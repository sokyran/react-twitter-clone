import React from 'react'
import './tweet-styles.scss'
import { ITweet } from '../../utils/types'
import { timeSince } from '../../utils/timeSince'

interface Props {
  tweet: ITweet
}

export const Tweet = ({ tweet }: Props) => {
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
          <button className="tweet-buttons-like" data-count="45">
            <i className="far fa-heart fa-lg"></i>
          </button>
          <button className="tweet-buttons-comment" data-count="12">
            <i className="far fa-comment fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
