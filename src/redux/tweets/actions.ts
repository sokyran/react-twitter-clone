import { ITweet, AppThunk } from '../../utils/types'
import { SET_TWEETS } from './types'

export const setTweets = (tweets: ITweet[]): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_TWEETS, payload: tweets })
  }
}
