import React from 'react'
import { useParams } from 'react-router-dom'

import './profile-details-styles.scss'

interface ParamTypes {
  profile: string
}

export const ProfileDetails = () => {
  const { profile } = useParams<ParamTypes>()

  return <div className="container">{profile}</div>
}
