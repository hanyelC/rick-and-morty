import styles from './styles.module.css'

import React from 'react'

type Variants = 'standard' | 'accent'

type Props = {
  variant?: Variants
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({
  variant = 'standard',
  children,
  ...props
}) => {
  const variants: Record<Variants, string> = {
    standard: styles.container,
    accent: styles['button-accent'],
  }

  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  )
}
