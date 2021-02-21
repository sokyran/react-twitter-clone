import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { closeCommentModal } from '../../redux/comment/actions'
import { setError } from '../../redux/error/actions'
import { CREATE_COMMENT, GET_TWEET_BY_ID } from '../../utils/queries'
import { ResizableInput } from '../ResizableInput'
import { ITweet } from '../../utils/types'
import moment from 'moment'
import './comment-modal-styles.scss'

interface ICache {
  tweet: ITweet
}

export const CommentModal = () => {
  const dispatch = useDispatch()
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (cache, { data }) => {
      const tweetAndComments: ICache | null = cache.readQuery({
        query: GET_TWEET_BY_ID,
        variables: { id: Number(data.createComment.conversationId) },
      })
      if (tweetAndComments) {
        cache.writeQuery({
          query: GET_TWEET_BY_ID,
          variables: { id: Number(data.createComment.conversationId) },
          data: {
            tweet: {
              ...tweetAndComments.tweet,
              comments: [
                ...(tweetAndComments.tweet.comments || []),
                data.createComment,
              ],
            },
          },
        })
      }
    },
  })

  const [commentText, setCommentText] = useState('')
  const refContainer = useRef<HTMLDivElement>({} as HTMLDivElement)
  const { isOpen: showModal, originalTweet, respondent } = useSelector(
    (state: RootState) => state.commentModal
  )

  useEffect(() => {
    let root = document.getElementById('forBlur')
    if (root && showModal) {
      root.style.filter = 'blur(2px)'
      root.style.background = 'rgba(0,0,0, 0.9)'
    } else if (root) {
      root.style.filter = 'blur(0px)'
      root.style.background = 'none'
    }
  }, [showModal])

  if (!showModal) {
    return null
  }

  return (
    <div className="comment-modal">
      <div className="comment-modal-window" ref={refContainer}>
        <div className="comment-modal-buttons">
          <i
            className="fas fa-lg fa-times back-button"
            onClick={() => {
              dispatch(closeCommentModal())
            }}
          ></i>
          <button
            disabled={commentText.length <= 0}
            className="submit-button"
            onClick={() => {
              try {
                createComment({
                  variables: {
                    text: commentText,
                    parentTweetId: Number(originalTweet?.id),
                  },
                })
                setCommentText('')
                dispatch(closeCommentModal())
              } catch (error) {
                dispatch(setError(error.message))
              }
            }}
          >
            Send
          </button>
        </div>
        <div className="comment-modal-avatar">
          <img src={originalTweet?.user.avatar} alt="alt" />
          <span className="line"></span>
        </div>
        <div className="comment-modal-content">
          <div className="comment-modal-info">
            <span className="username">{originalTweet?.user.username}</span>
            <span className="usertag">{originalTweet?.user.usertag}</span>
            <span className="date">
              {moment(originalTweet?.date).format('HH:mm MMMM DD YYYY')}
            </span>
            <div className="text">{originalTweet?.text}</div>
          </div>
        </div>
        <div className="comment-modal-avatar">
          <img src={respondent?.avatar} alt="alt" />
        </div>
        <div className="">
          <ResizableInput
            className="resizable"
            textValue={commentText}
            setTextValue={setCommentText}
          />
        </div>
      </div>
    </div>
  )
}
