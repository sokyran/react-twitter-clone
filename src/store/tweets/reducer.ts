import { SET_TWEETS, TweetsActionTypes, TweetsState } from './types'

const initialState: TweetsState = []

export const tweetsReducer = (
  state = initialState,
  action: TweetsActionTypes
): TweetsState => {
  switch (action.type) {
    case SET_TWEETS:
      return action.payload
    default:
      return state
  }
}
