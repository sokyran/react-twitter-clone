import { ITweet } from '../../utils/types'

export type TweetsState = ITweet[]

export const SET_TWEETS = 'SET_TWEETS'

export const LIKE_TWEET = 'LIKE_TWEET'

export interface LikeTweetAction {
  type: typeof LIKE_TWEET
  payload: number
}

export interface SetTweetsAction {
  type: typeof SET_TWEETS
  payload: ITweet[]
}

export type TweetsActionTypes = SetTweetsAction | LikeTweetAction
