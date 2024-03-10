'use client'

import { useState, useEffect } from 'react'

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>()

  function handleResize() {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const isMobile: boolean | undefined = windowWidth ? windowWidth < 600 : false

  return {
    isMobile,
    width: windowWidth,
  }
}
