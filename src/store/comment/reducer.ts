import {
  CLOSE_COMMENT_MODAL,
  CommentModalActionTypes,
  CommentState,
  SHOW_COMMENT_MODAL,
} from './types'

const initialState: CommentState = {
  isOpen: false,
  originalTweet: null,
  respondent: null,
}

export const commentModalReducer = (
  state = initialState,
  action: CommentModalActionTypes
): CommentState => {
  switch (action.type) {
    case SHOW_COMMENT_MODAL:
      return {
        isOpen: true,
        ...action.payload,
      }
    case CLOSE_COMMENT_MODAL:
      return {
        isOpen: false,
        originalTweet: null,
        respondent: null,
      }
    default:
      return state
  }
}
