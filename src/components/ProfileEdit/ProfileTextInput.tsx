import React from 'react'
import { useField } from 'formik'
import { ResizableInput } from '../ResizableInput'

interface InputProps {
  id: string
  name: string
  label: string
  type?: string
  resizable?: boolean
}

export const ProfileTextInput = ({
  id,
  name,
  label,
  type = 'text',
  resizable = false,
}: InputProps) => {
  const [field, { error, touched }, { setValue }] = useField({
    name,
    type,
  })

  let inputClass =
    'profile-page-input' +
    (field.value && field.value.length > 0 ? ' focused' : '') +
    (touched && error ? ' error-field' : '')
  return (
    <div className="profile-page-field">
      <label className="profile-page-label" htmlFor={id || name}>
        {label}
      </label>

      {resizable ? (
        <ResizableInput
          textValue={field.value}
          setTextValue={setValue}
          className={inputClass}
        />
      ) : (
        <input id={id} type={type} {...field} className={inputClass} />
      )}

      {touched && error ? (
        <div className="profile-page-error">{error}</div>
      ) : null}
    </div>
  )
}
