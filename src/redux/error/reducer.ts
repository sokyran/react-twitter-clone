import { ErrorState, ErrorActionTypes, SET_ERROR } from './types'

const initialState: ErrorState = ''

export const errorReducer = (
  state = initialState,
  action: ErrorActionTypes
): ErrorState => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return state
  }
}
