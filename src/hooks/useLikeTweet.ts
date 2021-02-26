import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setError } from '../redux/error/actions'
import { LikeTweet, UnlikeTweet } from '../redux/user/actions'
import { LIKE_TWEET_QUERY, UNLIKE_TWEET_QUERY } from '../utils/queries'

export const useLikeTweet = (initLikes: number, tweetId: number) => {
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(initLikes)

  const [likeTweetMutation] = useMutation(LIKE_TWEET_QUERY, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
  })

  const [unlikeTweetMutation] = useMutation(UNLIKE_TWEET_QUERY, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
  })

  const likeTweet = async () => {
    setLikes(likes + 1)
    dispatch(LikeTweet(tweetId))
    await likeTweetMutation({ variables: { id: Number(tweetId) } })
  }

  const unlikeTweet = async () => {
    setLikes(likes - 1 >= 0 ? likes - 1 : 0)
    dispatch(UnlikeTweet(tweetId))
    await unlikeTweetMutation({ variables: { id: Number(tweetId) } })
  }

  return { likes, likeTweet, unlikeTweet }
}
