import { useField } from 'formik'
import React from 'react'

interface TextInputProps {
  id: string
  name: string
  label: string
  type?: string
}

export const MyTextInput = ({
  id,
  name,
  label,
  type = 'text',
}: TextInputProps) => {
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
