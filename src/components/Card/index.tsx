import styles from './styles.module.css'

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
  status: string
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
  return (
    <div className={styles.container}>
      <figure>
        <Image
          alt=""
          src={image}
          width={300}
          height={300}
          data-testid="image"
        />
      </figure>
      <div className={styles['card-body']}>
        <h2 data-testid="name">name: {name}</h2>
        <p data-testid="gender">gender: {gender}</p>
        <p data-testid="origin">origin: {origin}</p>
        <p data-testid="species">species: {species}</p>
        <p data-testid="status">status: {status}</p>
        <Link
          href={redirectUrl}
          className={styles['more-details']}
          data-testid="more-details-link"
        >
          More details
        </Link>
      </div>
    </div>
  )
}
