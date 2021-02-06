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
