import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { setError } from '../redux/error/actions'
import { LIKE_TWEET, SHOW_LIKES, UNLIKE_TWEET } from '../utils/queries'

interface ICache {
  showLikes: number[]
}

export const useLikeTweet = (
  initLikes: number,
  initTouched: boolean,
  tweetId: Number
) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state)

  const [likes, setLikes] = useState(initLikes)
  const [touched, setTouched] = useState<Boolean>(initTouched)

  const [likeTweetMutation] = useMutation(LIKE_TWEET, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
    update: (cache, { data }) => {
      const existingLikes: ICache | null = cache.readQuery({
        query: SHOW_LIKES,
        variables: { id: user?.id },
      })
      if (existingLikes) {
        cache.writeQuery({
          query: SHOW_LIKES,
          variables: { id: user?.id },
          data: {
            showLikes: [...existingLikes.showLikes, Number(data.likeTweet.id)],
          },
        })
      }
    },
  })

  const [unlikeTweetMutation] = useMutation(UNLIKE_TWEET, {
    onError: (err) => {
      console.log(err)
      dispatch(setError(err.message))
    },
    update: (cache, { data }) => {
      const existingLikes: ICache | null = cache.readQuery({
        query: SHOW_LIKES,
        variables: { id: user?.id },
      })
      if (existingLikes) {
        cache.writeQuery({
          query: SHOW_LIKES,
          variables: { id: user?.id },
          data: {
            showLikes: [
              ...existingLikes.showLikes.filter(
                (id) => id !== Number(data.unlikeTweet.id)
              ),
            ],
          },
        })
      }
    },
  })

  const likeTweet = async () => {
    setTouched(true)
    setLikes(likes + 1)
    await likeTweetMutation({ variables: { id: Number(tweetId) } })
  }

  const unlikeTweet = async () => {
    setTouched(false)
    setLikes(likes - 1 >= 0 ? likes - 1 : 0)
    await unlikeTweetMutation({ variables: { id: Number(tweetId) } })
  }

  return { likes, touched, likeTweet, unlikeTweet }
}
