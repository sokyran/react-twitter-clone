import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface ITweet {
  id: number
  text: string
  date: number
  user: IUser
  likes: number
  imageUrl?: string
}

export interface IUser {
  username: string
  usertag: string
  avatar: string
  likedTweets: number[]
  accessToken?: string
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
