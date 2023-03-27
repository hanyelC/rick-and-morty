import '../styles/globals.css'
import styles from '../styles/pages/app.module.css'
import { Footer } from '@/components/Footer'
import { GoToTopButton } from '@/components/GoToTopButton'
import { Header } from '@/components/Header'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container} style={inter.style}>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: 'var(--base-size-16)',
        }}
      >
        <GoToTopButton />
      </div>
    </div>
  )
}
