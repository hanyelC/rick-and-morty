import styles from './styles.module.css'
import markGithub from '../../assets/mark-github.svg'

import Image from 'next/image'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div>
        <span>
          {'\u276e'}
          {'\u276f'} by{' '}
          <a href="https://github.com/hanyelc" target="_blank" rel="noreferrer">
            Hanyel
          </a>
        </span>

        <span> {new Date().getFullYear()}</span>
      </div>
      <div>
        <a
          href="https://github.com/hanyelC/rick-and-morty"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={markGithub} alt="mark github" />
        </a>
      </div>
    </footer>
  )
}
