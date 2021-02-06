import { IUser, AppThunk } from '../../utils/types'
import { SET_USER } from './types'

export const setUser = (user: IUser): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_USER, payload: { ...user, id: Number(user.id) } })
  }
}
