import { IUser, AppThunk } from '../../utils/types'
import { SET_USER } from './types'

export const setUser = (user: IUser): AppThunk => {
  return async (dispatch, getState) => {
    const storageUser = localStorage.getItem('user')
    const token = storageUser ? JSON.parse(storageUser).accessToken : null
    const userToSave = { ...user, id: Number(user.id), accessToken: token }
    localStorage.setItem(
      'user',
      JSON.stringify({ ...userToSave, expires: Date.now() + 3600000 }) // 60m
    )
    dispatch({ type: SET_USER, payload: userToSave })
  }
}
