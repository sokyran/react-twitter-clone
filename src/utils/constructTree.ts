import { ITweet } from './types'

export const constructTree = (tweet: ITweet) => {
  const { comments } = tweet
  delete tweet.comments
  let objs = [tweet, ...(comments || [])]

  let idMapping = objs.reduce((acc: any, elem, idx) => {
    acc[elem.id] = idx
    return acc
  }, {})

  let root
  objs.forEach((elem) => {
    if (!elem.inResponseTo) {
      root = elem
      return
    }
    const parentEl = objs[idMapping[elem.inResponseTo]]
    parentEl.comments = [...(parentEl.comments || []), elem]
  })

  return root
}
