import React from 'react'
import { IUser } from '../../utils/types'
import { DropdownMenu } from '../DropdownMenu'
import './navbar-styles.scss'

interface Props {
  user: IUser | null
}

export const Navbar = ({ user }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <p className="navbar-logo">Twottor</p>
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
        ) : null}
      </div>
    </div>
  )
}
