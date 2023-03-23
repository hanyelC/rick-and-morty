import styles from './styles.module.css'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
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
        <Image alt="" src={image} width={300} height={300} />
      </figure>
      <div className={styles['card-body']}>
        <h2>name: {name}</h2>
        <p>gender: {gender}</p>
        <p>origin: {origin}</p>
        <p>species: {species}</p>
        <p>status: {status}</p>
        <Link href={redirectUrl} className={styles['more-details']}>
          More details
        </Link>
      </div>
    </div>
  )
}
