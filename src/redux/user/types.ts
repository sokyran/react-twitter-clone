import { IUser } from '../../utils/types'

export type UserState = IUser | null

export const SET_USER = 'SET_USER'

export const LIKE_TWEET = 'LIKE_TWEET'

export const UNLIKE_TWEET = 'UNLIKE_TWEET'

export interface SetUserAction {
  type: typeof SET_USER
  payload: IUser
}

export interface LikeTweetAction {
  type: typeof LIKE_TWEET
  payload: number
}

export interface UnlikeTweetAction {
  type: typeof UNLIKE_TWEET
  payload: number
}

export type UserActionTypes =
  | SetUserAction
  | LikeTweetAction
  | UnlikeTweetAction
