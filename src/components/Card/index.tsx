import styles from './styles.module.css'

import React from 'react'

type Props = {
  name: string
}

export const Card: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.container}>
      <p>{name}</p>
    </div>
  )
}
