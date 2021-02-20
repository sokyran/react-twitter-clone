import { ITweet, AppThunk } from '../../utils/types'
import { SET_TWEETS } from './types'

export const setTweets = (tweets: ITweet[]): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_TWEETS, payload: tweets })
  }
}

// export const likeTweet = (id: number): AppThunk => {
//   return async (dispatch, getState) => {
//     const user = getState().user
//     if (user) {
//       user.likedTweets = user.likedTweets.concat(id)
//       dispatch(setUser(user))
//     }

//   }
// }
