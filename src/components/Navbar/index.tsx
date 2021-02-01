import React from 'react'
import { useHistory } from 'react-router-dom'
import { IUser } from '../../utils/types'
import { DropdownMenu } from '../DropdownMenu'
import './navbar-styles.scss'

interface Props {
  user: IUser | null
}

export const Navbar = ({ user }: Props) => {
  const history = useHistory()

  return (
    <div className="navbar">
      <div className="navbar-container">
        <p className="navbar-logo" onClick={() => history.push('/')}>
          Twottor
        </p>
        {user ? (
          <div className="navbar-dropdown">
            <DropdownMenu>
              <img
                className="navbar-dropdown-image"
                src={user.avatar}
                alt="Profile"
              />
            </DropdownMenu>
            <p className="navbar-dropdown-username">{user.username}</p>
          </div>
        ) : (
          <div className="navbar-buttons">
            <button
              className="navbar-buttons-log"
              onClick={() => {
                history.push('/login')
              }}
            >
              Log In
            </button>
            <button
              className="navbar-buttons-sign"
              onClick={() => {
                history.push('/signup')
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
