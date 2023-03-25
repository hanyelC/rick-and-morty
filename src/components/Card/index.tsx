import styles from './styles.module.css'
import { Character } from '@domain/entities'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type Props = {
  gender: string
  image: string
  name: string
  origin: string
  redirectUrl: string
  species: string
  status: Character.Status
}

export const Card: React.FC<Props> = ({
  gender,
  image,
  name,
  origin,
  redirectUrl,
  species,
  status,
}) => {
  const availableStatusIconClassNames: Record<Character.Status, string> = {
    Alive: styles['status-icon-success'],
    Dead: styles['status-icon-danger'],
    unknown: styles['status-icon-neutral'],
  }

  const statusIconClassName = availableStatusIconClassNames[status]

  return (
    <div className={styles.container}>
      <figure>
        <Image
          alt=""
          src={image}
          width={200}
          height={200}
          data-testid="image"
        />
      </figure>
      <div className={styles['card-body']}>
        <div>
          <Link
            href={redirectUrl}
            className={styles['more-details']}
            data-testid="more-details-link"
          >
            <h2 data-testid="name">{name}</h2>
          </Link>
          <div data-testid="status" className={styles.status}>
            <div className={statusIconClassName} />
            <span>
              {status} - {species}
            </span>
          </div>
        </div>
        <p data-testid="gender">gender: {gender}</p>
        <p data-testid="origin">origin: {origin}</p>
      </div>
    </div>
  )
}
