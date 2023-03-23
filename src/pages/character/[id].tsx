import styles from '../../styles/pages/character.module.css'
import { GetCharacterUseCase } from '@application/usecases'
import { Character as CharacterEntity } from '@domain/entities'
import { FakeCharacterGateway } from '@infra/gateways'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

type Props = {
  character: CharacterEntity
}

const Character: NextPage<Props> = ({ character }) => {
  return (
    <>
      <main className={styles.container}>
        <div>
          <h1>{character.name}</h1>
          <ul>
            <li>origin: {character.origin}</li>
            <li>status: {character.status}</li>
            <li>species: {character.species}</li>
            <li>gender: {character.gender}</li>
          </ul>
        </div>
        <div>
          <h3>Episodes</h3>
          <ul>
            {character.episodes.map((item) => (
              <li key={item}>item</li>
            ))}
          </ul>
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

  const gateway = new FakeCharacterGateway()
  const useCase = new GetCharacterUseCase(gateway)

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
