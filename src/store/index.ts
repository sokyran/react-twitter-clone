import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { IUser } from '../utils/types'
import { userReducer } from './userReducer'

export const store = createStore(
  userReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export interface RootState {
  user: IUser | null
}
