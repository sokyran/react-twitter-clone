import React from 'react'
import './input-styles.scss'

export const TweetInput = () => {
  return (
    <div className="text-input">
      <div className="text-input-avatar">
        <img
          className="user-avatar"
          src="https://www.meme-arsenal.com/memes/f829154b6247042d8821a19015eb2f7c.jpg"
          alt="Profile"
        />
      </div>
      <div className="text-input-textfield">
        <span role="textbox" contentEditable></span>
        <button>Tweet</button>
      </div>
    </div>
  )
}
