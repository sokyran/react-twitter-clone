import { ITweet } from '../../utils/types'

export type TweetsState = ITweet[]

export const SET_TWEETS = 'SET_TWEETS'

export interface SetTweetsAction {
  type: typeof SET_TWEETS
  payload: ITweet[]
}

export type TweetsActionTypes = SetTweetsAction
