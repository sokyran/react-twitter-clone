import { ITweet } from './types'

export const constructTree = (tweet: ITweet) => {
  const { comments } = tweet
  delete tweet.comments
  let objs = [tweet, ...(comments || [])]

  let idMapping = objs.reduce((acc: any, el, i) => {
    acc[el.id] = i
    return acc
  }, {})

  let root
  objs.forEach((el) => {
    if (!el.inResponseTo) {
      root = el
      return
    }
    const parentEl = objs[idMapping[el.inResponseTo]]
    if (parentEl) {
      parentEl.comments = [...(parentEl.comments || []), el]
    }
  })

  return root
}
