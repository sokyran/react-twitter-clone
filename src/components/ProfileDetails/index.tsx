import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setError } from '../../redux/error/actions'
import { GET_PROFILE, GET_TWEETS_FOR_PROFILE } from '../../utils/queries'
import { ITweet } from '../../utils/types'
import { MyLoader } from '../MyLoader'
import { Tweet } from '../Tweet'
import './profile-details-styles.scss'

interface ParamTypes {
  profile: string
}

export const ProfileDetails = () => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState<
    'Tweets' | 'Tweets and replies' | 'Likes'
  >('Tweets')
  const { profile } = useParams<ParamTypes>()
  const { data: profileData } = useQuery(GET_PROFILE, {
    variables: { usertag: profile },
  })

  const { data: initData } = useQuery(GET_TWEETS_FOR_PROFILE, {
    onError: (err) => {
      dispatch(setError(err.message))
    },
    variables: { usertag: profile },
    fetchPolicy: 'no-cache',
  })

  const [getTweetsAndReplies, { data: repliesData }] = useLazyQuery(
    GET_TWEETS_FOR_PROFILE,
    {
      variables: { usertag: profile, withComments: true },
      fetchPolicy: 'no-cache',
    }
  )

  const [getLikedTweets, { data: likedData }] = useLazyQuery(
    GET_TWEETS_FOR_PROFILE,
    {
      variables: { usertag: profile, loadLikes: true },
      fetchPolicy: 'no-cache',
    }
  )

  const renderTweets = (someData: { tweetsByUser: ITweet[] }) => {
    return someData && someData.tweetsByUser ? (
      someData.tweetsByUser.map((tweet: ITweet) => (
        <div className="tweet-wrapper" key={tweet.id}>
          <Tweet tweet={tweet} />
        </div>
      ))
    ) : (
      <MyLoader />
    )
  }

  const renderSwitch = () => {
    switch (isActive) {
      case 'Tweets':
        return renderTweets(initData)
      case 'Tweets and replies':
        return renderTweets(repliesData)
      case 'Likes':
        return renderTweets(likedData)
      default:
        return <MyLoader />
    }
  }

  const bg = 'https://bureau.ru/var/files/img1532613761'
  if (!profileData) {
    return <MyLoader />
  }

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-bg" style={{ backgroundImage: `url(${bg})` }}>
          <div
            className="profile-avatar"
            style={{ backgroundImage: `url(${profileData.profile.avatar})` }}
          ></div>
        </div>

        <div className="profile-username">{profileData.profile.username}</div>
        <div className="profile-usertag">@{profileData.profile.username}</div>
        <div className="profile-biography">
          🚀 4X Gen-Z Strategist 📈 Working on the intersection of Fitness and
          Plant Medicines 🤩 Locked eyes with Mike Tyson in Downtown LA once 🗣
          Reddit/Billie Eilish/Silent Mediation 💪 Constructing purposeful
          kindred spirits that drive people insane 📚 Currently reading - A
          Beginner's Guide to Big Data 🔸 here is no saint without a past, no
          sinner without a future. 🙏
        </div>
        <span className="profile-location"> 🌎 where</span>
        <span className="profile-regdate"> 📅 02.12.132</span>
      </div>

      <div className="profile-buttons">
        <button
          className={isActive === 'Tweets' ? 'active' : ''}
          onClick={() => setIsActive('Tweets')}
        >
          Tweets
        </button>
        <button
          className={isActive === 'Tweets and replies' ? 'active' : ''}
          onClick={() => {
            getTweetsAndReplies()
            setIsActive('Tweets and replies')
          }}
        >
          Tweets and replies
        </button>
        <button
          className={isActive === 'Likes' ? 'active' : ''}
          onClick={() => {
            getLikedTweets()
            setIsActive('Likes')
          }}
        >
          Likes
        </button>
      </div>
      <div>{renderSwitch()}</div>
    </div>
  )
}
