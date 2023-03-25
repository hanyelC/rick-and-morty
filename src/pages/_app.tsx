import '../styles/globals.css'
import styles from '../styles/pages/app.module.css'

import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/">Rick and Morty</Link>
        </div>
      </header>
      <Component {...pageProps} />
    </div>
  )
}
