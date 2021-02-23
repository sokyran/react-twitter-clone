import { IUser } from '../../utils/types'
import {
  UserState,
  UserActionTypes,
  SET_USER,
  LIKE_TWEET,
  UNLIKE_TWEET,
} from './types'

const initialState: UserState = {} as IUser

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case LIKE_TWEET:
      return { ...state, likedTweets: [...state.likedTweets, action.payload] }
    case UNLIKE_TWEET:
      return {
        ...state,
        likedTweets: state.likedTweets.filter(
          (elem) => elem !== action.payload
        ),
      }
    default:
      return state
  }
}
