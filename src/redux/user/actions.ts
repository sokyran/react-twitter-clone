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
      try {
        const res = await axios.get('http://192.168.0.104:3001/user', config)
        const { profile } = res.data
        delete res.data.profile
        dispatch({ type: SET_USER, payload: { ...res.data, ...profile } })
      } catch (err) {
        console.log(err)
        dispatch({ type: SET_USER, payload: null })
        localStorage.removeItem('accessToken')
      }
    }
  }
}

export const setUser = (user: IUser | null): AppThunk => {
  return async (dispatch, getState) => {
    if (user) {
      const userToSave = { ...user, id: Number(user.id) }
      return dispatch({ type: SET_USER, payload: userToSave })
    }
    dispatch({ type: SET_USER, payload: null })
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
