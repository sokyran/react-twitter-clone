import {
  AppThunk,
  IUser,
  SET_USER,
  UserActionTypes,
  UserState,
} from '../utils/types'

const initialState: UserState = {
  user: null,
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      }
    default:
      return state
  }
}

export const setUser = (user: IUser): AppThunk => {
  return async (dispatch, getState) => {
    console.log(getState().user)
    dispatch({ type: SET_USER, payload: user })
  }
}
