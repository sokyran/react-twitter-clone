import { IUser, AppThunk } from '../../utils/types'
import { SET_USER } from './types'

export const setUser = (user: IUser): AppThunk => {
  return async (dispatch, getState) => {
    let userToSave = null
    if (!user.accessToken) {
      const storageUser = localStorage.getItem('user')
      const token = storageUser ? JSON.parse(storageUser).accessToken : null
      userToSave = { ...user, id: Number(user.id), accessToken: token }
    } else {
      userToSave = { ...user, id: Number(user.id) }
    }
    localStorage.setItem(
      'user',
      JSON.stringify({ ...userToSave, expires: Date.now() + 3600000 }) // 60m
    )
    dispatch({ type: SET_USER, payload: userToSave })
  }
}
