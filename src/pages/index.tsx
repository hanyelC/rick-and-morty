import styles from '../styles/pages/home.module.css'
import { Card } from '@/components/Card'
import { FetchCharactersUseCase } from '@application/usecases'
import { Character } from '@domain/entities'
import { FakeCharacterGateway } from '@infra/gateways'

import { GetStaticProps, NextPage } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  characters: Character[]
}

const Home: NextPage<Props> = ({ characters }) => {
  return (
    <div className={`${styles.container} ${inter.className}`}>
      <main>
        <h1 className={inter.className}>Lorem ipsum</h1>
        <div>
          {characters.map((item) => (
            <Link key={item.id} href={`/character/${item.id}`}>
              <Card name={item.name} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const gateway = new FakeCharacterGateway()
  const useCase = new FetchCharactersUseCase(gateway)

  const { characters } = await useCase.fetch()

  return {
    props: { characters },
  }
}

export default Home
