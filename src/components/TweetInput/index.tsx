import React, { useState } from 'react'
import './input-styles.scss'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { ResizableInput } from '../ResizableInput'
import { IUser } from '../../utils/types'
import { CREATE_TWEET } from '../../utils/queries'
import { useMutation } from '@apollo/client'

interface Props {
  user: IUser
}

export const TweetInput = ({ user }: Props) => {
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
        <div className="text-input-tools-circle">
          <CircularProgressbar value={tweetText.length / 2} strokeWidth={15} />
        </div>
        <button className="text-input-tools-btn" onClick={handlePost}>
          Tweet
        </button>
      </div>
    </div>
  )
}
