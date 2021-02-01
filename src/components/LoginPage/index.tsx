import { Formik, FormikErrors, useField } from 'formik'
import React from 'react'
// import { useHistory } from 'react-router-dom'
import './login-page-styles.scss'

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

interface TextInputProps {
  id: string
  name: string
  label: string
  type?: string
}

const MyTextInput = ({ id, name, label, type = 'text' }: TextInputProps) => {
  const [field, { error, touched }] = useField({
    name,
    type,
  })
  return (
    <div className={'login-page-field'}>
      <input
        id={id}
        type={type}
        {...field}
        className={
          'login-page-input' +
          (field.value.length > 0 ? ' focused' : '') +
          (touched && error ? ' error-field' : '')
        }
      />
      <label htmlFor={id || name}>{label}</label>
      {touched && error ? (
        <div className="login-page-error">{error}</div>
      ) : null}
    </div>
  )
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

  // const history = useHistory()

  return (
    <div className="login-page container">
      {isSigningUp ? <p>Enter your credentials to sign up</p> : <p>Welcome!</p>}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, actions) => {
          console.log(values)
          setTimeout(() => actions.setSubmitting(false), 3000)
        }}
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
