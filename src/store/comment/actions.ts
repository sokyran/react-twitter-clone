import { AppThunk } from '../../utils/types'
import {
  CLOSE_COMMENT_MODAL,
  CommentPayload,
  SHOW_COMMENT_MODAL,
} from './types'

export const openCommentModal = (payload: CommentPayload): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: SHOW_COMMENT_MODAL, payload })
  }
}

export const closeCommentModal = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: CLOSE_COMMENT_MODAL })
  }
}
