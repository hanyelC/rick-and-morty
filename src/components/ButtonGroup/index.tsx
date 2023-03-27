import styles from './styles.module.css'

import React from 'react'

type Props = React.PropsWithChildren

export const ButtonGroup: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}
