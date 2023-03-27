import styles from './styles.module.css'

import Link from 'next/link'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link href="/">Rick and Morty</Link>
      </div>
    </header>
  )
}
