import React from 'react'
import { Formik, FormikErrors, FormikHelpers } from 'formik'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import './profile-styles.scss'
import { ProfileTextInput } from './ProfileTextInput'

interface FormProps {
  usertag: string
  username: string
  avatar: string
}

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user)

  const onSubmit = (values: FormProps, actions: FormikHelpers<FormProps>) => {
    console.log(values)
  }

  if (!user) {
    return <Redirect to="/login" />
  }

  const initialValues: FormProps = {
    usertag: user.usertag,
    username: user.username,
    avatar: user.avatar,
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
            <ProfileTextInput id="username" name="username" label="Usertag" />
            <ProfileTextInput
              id="avatar"
              name="avatar"
              label="Avatar picture"
            />

            <input
              disabled={formik.isSubmitting ? true : false}
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
