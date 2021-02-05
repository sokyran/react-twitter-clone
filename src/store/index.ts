import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { tweetsReducer } from './tweets/reducer'
import { ITweet, IUser } from '../utils/types'
import { userReducer } from './user/reducer'
import thunkMiddleware from 'redux-thunk'
import { errorReducer } from './error/reducer'

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
  error: errorReducer,
})

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export interface RootState {
  user: IUser | null
  tweets: ITweet[]
  error: string
}
