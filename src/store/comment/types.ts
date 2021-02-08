import { ITweet, IUser } from '../../utils/types'

export type CommentState = {
  isOpen: boolean
  originalTweet: ITweet | null
  respondent: IUser | null
}

export type CommentPayload = Omit<CommentState, 'isOpen'>

export const SHOW_COMMENT_MODAL = 'SHOW_COMMENT_MODAL'
export const CLOSE_COMMENT_MODAL = 'CLOSE_COMMENT_MODAL'

export interface ShowCommentModalAction {
  type: typeof SHOW_COMMENT_MODAL
  payload: CommentPayload
}

export interface CLoseCommentModalAction {
  type: typeof CLOSE_COMMENT_MODAL
}

export type CommentModalActionTypes =
  | ShowCommentModalAction
  | CLoseCommentModalAction
