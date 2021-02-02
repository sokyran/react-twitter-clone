import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { useHistory } from 'react-router-dom'
import './dropdown-styles.scss'

export const DropdownMenu = ({ children }: PropsWithChildren<{}>) => {
  const [showMenu, setShowMenu] = useState(false)
  const history = useHistory()

  const refContainer = useRef<HTMLDivElement>({} as HTMLDivElement)

  const handleClose = useCallback((e: Event) => {
    const elem = e.target as HTMLDivElement
    if (refContainer.current && !refContainer.current.contains(elem)) {
      setShowMenu(false)
      document.removeEventListener('click', handleClose)
    }
  }, [])

  useEffect(() => {
    if (showMenu) {
      document.addEventListener('click', handleClose)
    }
  }, [handleClose, showMenu])

  const handleOpen = (e: any) => {
    e.preventDefault()
    setShowMenu(true)
  }

  return (
    <div className="dropdown">
      <div
        style={{
          border: 0,
          padding: 0,
          background: 0,
          fontSize: '0px',
          color: 'white',
          outline: 'none',
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        {children}
      </div>
      {showMenu ? (
        <div className="dropdown-content" ref={refContainer}>
          <button
            onClick={() => {
              localStorage.removeItem('user')
              window.location.reload()
              setShowMenu(false)
            }}
          >
            SignOut
          </button>
        </div>
      ) : null}
    </div>
  )
}
