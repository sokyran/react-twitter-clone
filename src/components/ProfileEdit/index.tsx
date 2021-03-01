import React from 'react'
import { Formik, FormikErrors, FormikHelpers } from 'formik'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { ProfileTextInput } from './ProfileTextInput'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../utils/queries'
import { setUser } from '../../redux/user/actions'
import { setError } from '../../redux/error/actions'
import './profile-styles.scss'
import { MyLoader } from '../MyLoader'

interface FormProps {
  usertag: string
  username: string
  avatar: string
  backgroundImage: string
  biography: string
  location: string
}

export const ProfileEdit = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.user)
  const [updateUser] = useMutation(UPDATE_USER)

  if (!user) {
    return <Redirect to="/login" />
  }

  const onSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    try {
      const updatedUser = {
        id: user.id,
        likedTweets: user.likedTweets,
        registrationDate: user.registrationDate,
        ...values,
      }
      await updateUser({ variables: updatedUser })
      dispatch(setUser(updatedUser))
      history.push(`/user/${user.id}`)
    } catch (error) {
      dispatch(setError(JSON.stringify(error)))
    }
  }

  const initialValues: FormProps = {
    usertag: user.usertag,
    username: user.username,
    avatar: user.avatar,
    backgroundImage: user.backgroundImage || '',
    biography: user.biography || '',
    location: user.location || '',
  }

  const validate = (values: FormProps) => {
    const errors: FormikErrors<FormProps> = {}

    if (!values.usertag) {
      errors.usertag = 'Required'
    } else if (values.usertag.length < 4) {
      errors.usertag = 'Must be 4 characters or more'
    }

    if (!values.username) {
      errors.username = 'Required'
    } else if (values.username.length < 4) {
      errors.username = 'Must be 4 characters or more'
    }

    if (!values.avatar) {
      errors.avatar = 'Required'
    }

    return errors
  }

  if (!user.id) {
    return <MyLoader />
  }

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik) => (
          <form className="profile-page" onSubmit={formik.handleSubmit}>
            <h1 className="profile-page-header">Your profile</h1>
            <ProfileTextInput id="usertag" name="usertag" label="Usertag" />
            <ProfileTextInput id="username" name="username" label="Username" />
            <ProfileTextInput
              id="avatar"
              name="avatar"
              label="Avatar picture"
            />
            <ProfileTextInput
              id="backgroundImage"
              name="backgroundImage"
              label="Background Image"
            />
            <ProfileTextInput id="location" name="location" label="Location" />

            <ProfileTextInput
              id="biography"
              name="biography"
              label="Biography"
              resizable={true}
            />

            <input
              disabled={formik.isSubmitting}
              className="profile-page-submit"
              type="submit"
              value={'Submit'}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}
