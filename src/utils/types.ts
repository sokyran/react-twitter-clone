import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../redux'

export interface ITweet {
  id: number
  text: string
  date: string
  user: IUser
  likes: number
  imageUrl?: string
  commentCount?: number
  comments?: ITweet[]
}

export interface IUser {
  id: number
  username: string
  usertag: string
  avatar: string
  accessToken?: string
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
