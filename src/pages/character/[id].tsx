import styles from '../../styles/pages/character.module.css'
import { Character as CharacterEntity } from '@domain/entities'
import { GetCharacterUseCase } from '@domain/usecases'
import { Registry, container } from '@infra/container-registry'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React from 'react'

type Props = {
  character: CharacterEntity
}

const Character: NextPage<Props> = ({ character }) => {
  return (
    <>
      <main className={styles.container}>
        <div>
          <div className={styles['character-info']}>
            <Image src={character.image} width={300} height={300} alt="" />
            <div>
              <h1>{character.name}</h1>
              <ul>
                <li>origin: {character.origin}</li>
                <li>status: {character.status}</li>
                <li>species: {character.species}</li>
                <li>gender: {character.gender}</li>
              </ul>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.episodes}>
            <h3>Episodes</h3>
            <ul>
              {character.episodes.map((item) => (
                <React.Fragment key={item}>
                  <li> {item}</li>
                  <div className={styles.divider} />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [
      {
        params: { id: '1' },
      },
    ],
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const useCase = container.get<GetCharacterUseCase>(
    Registry.GetCharacterUseCase,
  )

  const { character } = await useCase.get({ id: params.id })

  if (!character) {
    return { notFound: true }
  }

  return {
    props: {
      character,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export default Character
