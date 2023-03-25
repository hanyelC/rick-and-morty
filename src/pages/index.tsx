import styles from '../styles/pages/home.module.css'
import { Card } from '@/components/Card'
import { ApiPatination, Character } from '@domain/entities'
import { FetchCharactersUseCase } from '@domain/usecases'
import { Registry, container } from '@infra/container-registry'

import Pagination from '@mui/material/Pagination'
import { GetStaticProps, NextPage } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  characters: Character[]
  pagination: ApiPatination
}

const Home: NextPage<Props> = ({
  characters,
  pagination: initialPaginationInfo,
}) => {
  const [name, setName] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState<
    Character[] | null
  >(null)
  const [paginationInfo, setPaginationInfo] = useState<ApiPatination | null>(
    null,
  )

  const genderFilter = useRef<Character.Gender | null>(null)
  const statusFilter = useRef<Character.Status | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchCharactersUseCase = container.get<FetchCharactersUseCase>(
    Registry.FetchCharactersUseCase,
  )

  const handleChangePage = (_: unknown, page: number) => {
    setCurrentPage(page)
    fetchCharacters(page)
  }

  const handleClearFilters = async () => {
    genderFilter.current = null
    statusFilter.current = null
    setName('')
    setCurrentPage(1)
    setFilteredCharacters(null)
    setPaginationInfo(null)
  }

  const fetchCharacters = async (page?: number) => {
    const { characters, pagination } = await fetchCharactersUseCase.fetch({
      page,
      filter: {
        gender: genderFilter.current ?? undefined,
        name,
        status: statusFilter.current ?? undefined,
      },
    })

    setFilteredCharacters(characters)
    setPaginationInfo(pagination)
  }

  const handleSearchByName = () => {
    fetchCharacters()
    setCurrentPage(1)
  }

  const handleSetGender = (gender: Character.Gender) => {
    genderFilter.current = gender === genderFilter.current ? null : gender
    fetchCharacters()
    setCurrentPage(1)
  }

  const handleSetStatus = (status: Character.Status) => {
    statusFilter.current = status === statusFilter.current ? null : status
    fetchCharacters()
    setCurrentPage(1)
  }

  const charactersToRender =
    filteredCharacters === null ? characters : filteredCharacters

  const paginationInfoToRender =
    paginationInfo === null ? initialPaginationInfo : paginationInfo

  const genders: Character.Gender[] = [
    'Female',
    'Genderless',
    'Male',
    'unknown',
  ]

  const statusList: Character.Status[] = ['Alive', 'Dead', 'unknown']

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <div className={`${styles.container} ${inter.className}`}>
        <div className={styles['filters-container']}>
          <div className={styles.search}>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Find a character..."
            />
            <button onClick={handleSearchByName}>Search</button>
          </div>
          <div>
            <span>Gender: </span>
            <div className={styles['button-group']}>
              {genders.map((gender) => (
                <button
                  key={gender}
                  className={
                    genderFilter.current === gender
                      ? styles['button-selected']
                      : styles.button
                  }
                  onClick={() => handleSetGender(gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span>Status: </span>
            <div className={styles['button-group']}>
              {statusList.map((status) => (
                <button
                  key={status}
                  className={
                    statusFilter.current === status
                      ? styles['button-selected']
                      : styles.button
                  }
                  onClick={() => handleSetStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className={styles['divider-sm']} />
          <div>
            <button className={styles.button} onClick={handleClearFilters}>
              Clear filters
            </button>
          </div>
        </div>
        <div className={styles.divider} />
        <main>
          <div className={styles['characters-list']}>
            {charactersToRender.length > 0 ? (
              charactersToRender.map((item) => (
                <Card
                  key={item.id}
                  {...item}
                  redirectUrl={`/character/${item.id}`}
                />
              ))
            ) : (
              <p>We couldn{"'"}t find any character matching the filters</p>
            )}
          </div>
          <div className={styles['pagination-container']}>
            <Pagination
              count={paginationInfoToRender.pages}
              onChange={handleChangePage}
              variant="outlined"
              hideNextButton={paginationInfoToRender?.next === null}
              hidePrevButton={paginationInfoToRender?.prev === null}
              page={currentPage}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const useCase = container.get<FetchCharactersUseCase>(
    Registry.FetchCharactersUseCase,
  )

  const { characters, pagination } = await useCase.fetch()

  return {
    props: { characters, pagination },
  }
}

export default Home
