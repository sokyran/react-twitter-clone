import React from 'react'
import { DropdownMenu } from '../DropdownMenu'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux'
import './navbar-styles.scss'
import { setUser } from '../../redux/user/actions'

export const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.user)

  const dropdownContent = (
    <>
      <button
        className="navbar-dropdown-item"
        onClick={() => {
          history.push('/profile')
        }}
      >
        Profile
      </button>
      <button
        className="navbar-dropdown-item"
        onClick={() => {
          localStorage.removeItem('accessToken')
          dispatch(setUser(null))
        }}
      >
        Sign out
      </button>
    </>
  )

  const dropdownButton =
    user && user.id ? (
      <div
        className="navbar-dropdown-image"
        style={{ backgroundImage: `url(${user.avatar}` }}
      ></div>
    ) : null

  return (
    <div className="navbar">
      <div className="navbar-container">
        <p className="navbar-logo" onClick={() => history.push('/')}>
          Twottor
        </p>
        {user && user.id ? (
          <div className="navbar-dropdown">
            <DropdownMenu
              dropdownContent={dropdownContent}
              dropdownButton={dropdownButton}
            />
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
