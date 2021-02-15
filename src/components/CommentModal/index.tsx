import { useMutation } from '@apollo/client/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { closeCommentModal } from '../../store/comment/actions'
import { setError } from '../../store/error/actions'
import { CREATE_COMMENT } from '../../utils/queries'
import { ResizableInput } from '../ResizableInput'
import './comment-modal-styles.scss'

export const CommentModal = () => {
  const dispatch = useDispatch()
  const [createComment] = useMutation(CREATE_COMMENT)

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
              // refContainer.current.classList.toggle('squeeze')
              // setTimeout(() => dispatch(closeCommentModal()), 1000)
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
            <span className="date">{originalTweet?.date}</span>
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
