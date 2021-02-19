import { AppThunk, ITweet } from '../../utils/types'
import { CLOSE_COMMENT_MODAL, SHOW_COMMENT_MODAL } from './types'

export const openCommentModal = (originalTweet: ITweet): AppThunk => {
  return async (dispatch, getState) => {
    const { user } = getState()
    dispatch({
      type: SHOW_COMMENT_MODAL,
      payload: { originalTweet, respondent: user },
    })
  }
}

export const closeCommentModal = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: CLOSE_COMMENT_MODAL })
  }
}
