import { UserState, UserActionTypes, SET_USER } from './types'

const initialState = null

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    default:
      return state
  }
}
