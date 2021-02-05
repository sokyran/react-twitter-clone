import { debounce } from '../../utils/debounce'
import { AppThunk } from '../../utils/types'
import { SET_ERROR } from './types'

export const setError = (message: string): AppThunk => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_ERROR, payload: message })
    const clearTimeout = debounce(() => {
      dispatch({ type: SET_ERROR, payload: '' })
    })
    setTimeout(clearTimeout, 5000)
  }
}
