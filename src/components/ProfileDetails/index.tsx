import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootState } from '../../redux'
import { setError } from '../../redux/error/actions'
import { GET_PROFILE, GET_TWEETS_FOR_PROFILE } from '../../utils/queries'
import { ITweet, IUser } from '../../utils/types'
import { MyLoader } from '../MyLoader'
import { Tweet } from '../Tweet'
import './profile-details-styles.scss'

interface ParamTypes {
  profile: string
}

interface IProfile {
  id: number
  avatar: string
  usertag: string
  username: string
  backgroundImage: string | null
  biography: string | null
  location: string | null
  registrationDate: string
}

export const ProfileDetails = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state: RootState) => state)
  const [profile, setProfile] = useState<IProfile | IUser>()
  const [isActive, setIsActive] = useState<
    'Tweets' | 'Tweets and replies' | 'Likes'
  >('Tweets')

  const { profile: profileString } = useParams<ParamTypes>()
  const profileId = Number(profileString)

  useQuery(GET_PROFILE, {
    onCompleted: (data) => {
      const { avatar, id, username, usertag } = data.getProfile
      if (user && user.id === profileId) {
        return setProfile({ ...user })
      }
      const profileStuff = { ...data.getProfile.profile }
      setProfile({
        avatar,
        id,
        usertag,
        username,
        ...profileStuff,
      })
    },
    variables: { id: profileId },
  })

  const { data: initData } = useQuery(GET_TWEETS_FOR_PROFILE, {
    onError: (err) => {
      dispatch(setError(err.message))
    },
    variables: { id: profileId },
    fetchPolicy: 'no-cache',
  })

  const [getTweetsAndReplies, { data: repliesData }] = useLazyQuery(
    GET_TWEETS_FOR_PROFILE,
    {
      variables: { id: profileId, withComments: true },
      fetchPolicy: 'no-cache',
    }
  )

  const [getLikedTweets, { data: likedData }] = useLazyQuery(
    GET_TWEETS_FOR_PROFILE,
    {
      variables: { id: profileId, loadLikes: true },
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

  const bgPlaceholder = 'https://bureau.ru/var/files/img1532613761'
  if (!profile) {
    return <MyLoader />
  }

  return (
    <div className="container">
      <div className="profile">
        <div
          className="profile-bg"
          style={{
            backgroundImage: `url(${profile.backgroundImage || bgPlaceholder})`,
          }}
        >
          <div
            className="profile-avatar"
            style={{ backgroundImage: `url(${profile.avatar})` }}
          ></div>
        </div>
        <div
          className={
            'profile-edit' + (user && user.id === profileId ? '' : ' unvisible')
          }
        >
          <button onClick={() => history.push('/profile')}>Edit profile</button>
        </div>
        <div className="profile-text-wrapper">
          <div className="profile-username">{profile.username}</div>
          <div className="profile-usertag">@{profile.usertag}</div>
          <div className="profile-biography">
            {profile.biography ? (
              profile.biography
            ) : (
              <span className="profile-placeholder">Who is this person?..</span>
            )}
          </div>
          🌎
          {profile.location ? (
            <span className="profile-location">{profile.location}</span>
          ) : (
            <span className="profile-location profile-placeholder">
              No location for now...
            </span>
          )}
          <span className="profile-regdate">📅 {profile.registrationDate}</span>
        </div>
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
