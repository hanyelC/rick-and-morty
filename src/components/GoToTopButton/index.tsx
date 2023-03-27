import ChevronUpIcon from '../../assets/chevron-up.svg'
import styles from './styles.module.css'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export const GoToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const header = document.querySelector('#header')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setShowButton(!entry.isIntersecting)
      })
    })

    header && observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return showButton ? (
    <button className={styles.container} onClick={handleScrollToTop}>
      <Image src={ChevronUpIcon} width={16} height={16} alt="Chevron up icon" />
    </button>
  ) : null
}
