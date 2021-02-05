import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { ResizableInput } from '../ResizableInput'
import { CREATE_TWEET } from '../../utils/queries'
import { useMutation } from '@apollo/client'
import './input-styles.scss'

export const TweetInput = () => {
  const [tweetText, setTweetText] = useState('')
  const [createTweet] = useMutation(CREATE_TWEET)

  const handlePost = () => {
    createTweet({ variables: { text: tweetText } })
    setTweetText('')
  }

  return (
    <div className="text-input">
      <div className="text-input-textfield">
        <ResizableInput
          className={'text-input-textfield-resizable'}
          textValue={tweetText}
          setTextValue={setTweetText}
        />
      </div>
      <div className="text-input-tools">
        <div className="text-input-tools-length-and-circle">
          <div className="text-input-tools-circle">
            <CircularProgressbar
              value={tweetText.length / 2}
              strokeWidth={15}
              styles={
                tweetText.length > 200
                  ? {
                      path: {
                        stroke: '#ff3b3b',
                      },
                    }
                  : {}
              }
            />
          </div>
          <span className="text-input-tools-length">
            {tweetText.length} / 200
          </span>
        </div>
        <span
          className={
            'text-input-tools-error' + (tweetText.length > 200 ? ' shown' : '')
          }
        >
          Your tweet is too long!
        </span>
        <button
          disabled={
            tweetText.length === 0 || tweetText.length > 200 ? true : false
          }
          className="text-input-tools-btn"
          onClick={handlePost}
        >
          Tweet
        </button>
      </div>
    </div>
  )
}
