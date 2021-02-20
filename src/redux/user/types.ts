import { IUser } from '../../utils/types'

export type UserState = IUser | null

export const SET_USER = 'SET_USER'

export interface SetUserAction {
  type: typeof SET_USER
  payload: IUser
}

export type UserActionTypes = SetUserAction
