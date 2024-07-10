import { useEffect, useRef } from 'react'

type ClickAwayCallback = () => void

const useClickAway = (onClickAway: ClickAwayCallback) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClickAway])

  return ref
}

export default useClickAway
