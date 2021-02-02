import { Formik, FormikErrors, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ErrorMessage } from './ErrorMessage'
import './login-page-styles.scss'
import { MyTextInput } from './MyTextInput'

interface Props {
  handleLogin: (usertag: string, password: string) => void
  handleSignUp: (
    usertag: string,
    username: string,
    password: string,
    avatar: string | null
  ) => void
  isSigningUp: boolean
}

interface FormProps {
  usertag: string
  username: string
  password: string
  repeatPass: string
}

export const LoginPage = ({
  handleLogin,
  handleSignUp,
  isSigningUp,
}: Props) => {
  const initialValues: FormProps = {
    usertag: '',
    username: '',
    password: '',
    repeatPass: '',
  }
  const history = useHistory()
  const [error, setError] = useState('')

  const onSubmit = async (
    values: FormProps,
    actions: FormikHelpers<FormProps>
  ) => {
    const { usertag, username, password } = values
    console.log(values)
    try {
      isSigningUp
        ? await handleSignUp(usertag, username, password, null)
        : await handleLogin(usertag, password)
      history.push('/')
    } catch (error) {
      actions.setSubmitting(false)
      actions.setFieldValue('password', '', false)
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const validate = (values: FormProps) => {
    const errors: FormikErrors<FormProps> = {}

    if (!values.usertag) {
      errors.usertag = 'Required'
    } else if (values.usertag.length < 4) {
      errors.usertag = 'Must be 4 characters or more'
    }

    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more'
    }

    if (isSigningUp) {
      if (!values.username) {
        errors.username = 'Required'
      } else if (values.username.length < 4) {
        errors.username = 'Must be 4 characters or more'
      }

      if (!values.repeatPass) {
        errors.repeatPass = 'Required'
      } else if (values.repeatPass !== values.password) {
        errors.repeatPass = 'Password must match'
      }
    }

    return errors
  }

  return (
    <div className="login-page container">
      {isSigningUp ? <p>Enter your credentials to sign up</p> : <p>Welcome!</p>}
      {error ? <ErrorMessage error={error} /> : null}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <MyTextInput id="usertag" name="usertag" label="Usertag" />

            {isSigningUp ? (
              <MyTextInput id="username" name="username" label="Username" />
            ) : null}

            <MyTextInput
              id="password"
              name="password"
              label="Password"
              type="password"
            />

            {isSigningUp ? (
              <MyTextInput
                id="repeatPass"
                name="repeatPass"
                label="Repeat password"
                type="password"
              />
            ) : null}
            <input
              disabled={formik.isSubmitting ? true : false}
              className="login-page-submit"
              type="submit"
              value={isSigningUp ? 'Sign Up' : 'Log In'}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}
