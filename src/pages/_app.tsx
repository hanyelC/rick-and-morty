import '../styles/globals.css'
import styles from '../styles/pages/app.module.css'
import { Footer } from '@/components/Footer'

import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container} style={inter.style}>
      <header className={styles.header}>
        <div>
          <Link href="/">Rick and Morty</Link>
        </div>
      </header>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
