import { UserState, UserActionTypes, SET_USER } from './types'

const storageUser = localStorage.getItem('user')
let initialUser = null

if (storageUser) {
  const parsedUser = JSON.parse(storageUser)
  if (parsedUser.expires > Date.now()) {
    initialUser = { ...parsedUser, id: Number(parsedUser.id) }
  } else {
    localStorage.removeItem('user')
  }
}

const initialState = initialUser

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
