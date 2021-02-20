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

interface FormProps {
  usertag: string
  username: string
  avatar: string
}

export const Profile = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.user)
  const [updateUser, { error: graphError }] = useMutation(UPDATE_USER)

  if (!user) {
    return <Redirect to="/login" />
  }

  const onSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    try {
      const updatedUser = { id: user.id, ...values }
      await updateUser({ variables: updatedUser })
      dispatch(setUser(updatedUser))
      history.push('/')
    } catch (error) {
      dispatch(
        setError(
          graphError?.graphQLErrors[0].extensions?.exception.response.message[0]
        )
      )
    }
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
