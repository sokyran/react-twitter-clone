export type ErrorState = string

export const SET_ERROR = 'SET_ERROR'

export interface SetErrorAction {
  type: typeof SET_ERROR
  payload: string
}

export type ErrorActionTypes = SetErrorAction
