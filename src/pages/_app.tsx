import '../styles/globals.css'
import styles from '../styles/pages/app.module.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <header>Rick and Morty</header>
      <Component {...pageProps} />
    </div>
  )
}
