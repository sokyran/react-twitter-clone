import React from 'react'
import { useField } from 'formik'

interface InputProps {
  id: string
  name: string
  label: string
  type?: string
}

export const ProfileTextInput = ({
  id,
  name,
  label,
  type = 'text',
}: InputProps) => {
  const [field, { error, touched }] = useField({
    name,
    type,
  })
  return (
    <div className={'profile-page-field'}>
      <label className="profile-page-label" htmlFor={id || name}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...field}
        className={
          'profile-page-input' +
          (field.value.length > 0 ? ' focused' : '') +
          (touched && error ? ' error-field' : '')
        }
      />
      {touched && error ? (
        <div className="profile-page-error">{error}</div>
      ) : null}
    </div>
  )
}
