import axios from 'axios'
import { IUser, AppThunk } from '../../utils/types'
import { LIKE_TWEET, SET_USER, UNLIKE_TWEET } from './types'

export const initUser = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const res = await axios.get('http://192.168.0.104:3001/user', config)
      dispatch({ type: SET_USER, payload: res.data })
    }
  }
}

export const setUser = (user: IUser): AppThunk => {
  return async (dispatch, getState) => {
    const userToSave = { ...user, id: Number(user.id) }
    dispatch({ type: SET_USER, payload: userToSave })
  }
}

export const LikeTweet = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: LIKE_TWEET, payload: Number(id) })
  }
}

export const UnlikeTweet = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: UNLIKE_TWEET, payload: Number(id) })
  }
}
