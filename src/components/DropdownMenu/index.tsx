import React, { useEffect, useRef, useState, useCallback } from 'react'
import './dropdown-styles.scss'

interface Props {
  dropdownButton: React.ReactNode
  dropdownContent: React.ReactNode
}

export const DropdownMenu = ({ dropdownButton, dropdownContent }: Props) => {
  const [showMenu, setShowMenu] = useState(false)

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
    <div className={'dropdown' + (showMenu ? ' active' : '')}>
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
        {dropdownButton}
      </div>
      {showMenu ? (
        <div className="dropdown-content" ref={refContainer}>
          {dropdownContent}
        </div>
      ) : null}
    </div>
  )
}
