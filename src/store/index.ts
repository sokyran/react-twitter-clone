import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { commentModalReducer } from './comment/reducer'
import { tweetsReducer } from './tweets/reducer'
import { CommentState } from './comment/types'
import { errorReducer } from './error/reducer'
import { TweetsState } from './tweets/types'
import { userReducer } from './user/reducer'
import { ErrorState } from './error/types'
import thunkMiddleware from 'redux-thunk'
import { UserState } from './user/types'

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
  error: errorReducer,
  commentModal: commentModalReducer,
})

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export interface RootState {
  user: UserState
  tweets: TweetsState
  error: ErrorState
  commentModal: CommentState
}
